import { AuthForm, SocialProviders } from "@/components/index";
import { signUp } from "@/lib/auth/actions";

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <SocialProviders mode="signup" />
      <AuthForm mode="signup" onSubmit={signUp} />
    </div>
  );
}
