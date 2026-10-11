import { AuthComposition } from '../components/AuthComposition';
import { LoginForm } from '../components/forms/LoginForm';
import { loginHint } from '../components/hints/LoginHint';

const loginForm = <LoginForm />;

export function LoginPage() {
  return <AuthComposition subtitle="Вход" form={loginForm} hint={loginHint} />;
}
