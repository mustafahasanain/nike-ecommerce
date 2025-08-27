"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "signin" | "signup";
  onSubmit: (
    formData: FormData
  ) => Promise<{ ok: boolean; userId?: string } | void>;
}

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isSignUp = mode === "signup";

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const result = await onSubmit(formData);

      if (result?.ok) router.push("/");
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-black mb-2 text-center">
          {isSignUp ? "Join Nike Today!" : "Welcome Back!"}
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          {isSignUp
            ? "Create your account to start your fitness journey"
            : "Sign in to your Nike account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field - Only for Sign Up */}
        {isSignUp && (
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-black mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full px-4 py-4 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
            />
          </div>
        )}

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@example.com"
            className="w-full px-4 py-4 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-4 px-4 rounded-full font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{isSignUp ? "Creating Account..." : "Signing In..."}</span>
            </div>
          ) : isSignUp ? (
            "Sign Up"
          ) : (
            "Sign In"
          )}
        </button>

        {/* Sign In/Up Toggle - Centered and Above */}
        <div className="text-center mb-6">
          <span className="text-gray-500 text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          </span>
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="text-black font-medium hover:underline underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </div>

        {/* Terms and Privacy - Only for Sign Up */}
        {isSignUp && (
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-gray-500 hover:text-black underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-black underline"
            >
              Privacy Policy
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
