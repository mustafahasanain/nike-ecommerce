import { AuthForm, SocialProviders } from "@/components/index";

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <SocialProviders mode="signup" />
      <AuthForm mode="signup" />
    </div>
  );
}
