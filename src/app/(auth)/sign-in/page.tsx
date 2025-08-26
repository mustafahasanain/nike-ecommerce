import { AuthForm, SocialProviders } from "@/components/index";

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <SocialProviders mode="signin" />
      <AuthForm mode="signin" />
    </div>
  );
}
