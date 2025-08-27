"use server";

import { auth } from "../auth";
import { db } from "../db";
import { guest } from "../db/schema/index";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function signIn(formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { ok: false };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    await mergeGuestCartWithUserCart();

    return { ok: true, userId: result.user?.id };
  } catch (error) {
    return { ok: false };
  }
}

export async function signUp(formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { ok: false };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    await mergeGuestCartWithUserCart();

    return { ok: true, userId: result.user?.id };
  } catch (error) {
    return { ok: false };
  }
}

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: new Headers(),
    });
    redirect("/");
  } catch (error) {
    throw new Error("Failed to sign out");
  }
}

export async function createGuestSession() {
  const cookieStore = await cookies();
  const existingGuestSession = cookieStore.get("guest_session");

  if (existingGuestSession) {
    const existingGuest = await db
      .select()
      .from(guest)
      .where(eq(guest.sessionToken, existingGuestSession.value))
      .limit(1);
    if (existingGuest.length > 0 && existingGuest[0].expiresAt > new Date()) {
      return existingGuest[0].sessionToken;
    }
  }

  const sessionToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  try {
    await db.insert(guest).values({
      sessionToken,
      expiresAt,
    });

    cookieStore.set("guest_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expiresAt,
    });

    return sessionToken;
  } catch (error) {
    throw new Error("Failed to create guest session");
  }
}

export async function getGuestSession() {
  const cookieStore = await cookies();
  const guestSessionCookie = cookieStore.get("guest_session");

  if (!guestSessionCookie) {
    return null;
  }

  try {
    const guestRecord = await db
      .select()
      .from(guest)
      .where(eq(guest.sessionToken, guestSessionCookie.value))
      .limit(1);

    if (guestRecord.length === 0 || guestRecord[0].expiresAt <= new Date()) {
      cookieStore.delete("guest_session");
      return null;
    }

    return guestRecord[0];
  } catch (error) {
    cookieStore.delete("guest_session");
    return null;
  }
}

export async function mergeGuestCartWithUserCart() {
  const cookieStore = await cookies();
  const guestSessionCookie = cookieStore.get("guest_session");

  if (!guestSessionCookie) {
    return;
  }

  try {
    await db
      .delete(guest)
      .where(eq(guest.sessionToken, guestSessionCookie.value));
    cookieStore.delete("guest_session");
  } catch (error) {
    console.error("Error cleaning up guest session:", error);
  }
}
