import { AuthForm, SocialProviders } from "@/components/index";
import { signIn } from "@/lib/auth/actions";

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <SocialProviders mode="signin" />
      <AuthForm mode="signin" onSubmit={signIn} />
    </div>
  );
}
