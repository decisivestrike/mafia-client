import { AuthComposition } from '../components/AuthComposition';
import { RegisterForm } from '../components/forms/RegisterForm';
import { registerHint } from '../components/hints/RegisterHint';

const registerForm = <RegisterForm />;

export function RegisterPage() {
  return (
    <AuthComposition
      subtitle="Регистрация"
      form={registerForm}
      hint={registerHint}
    />
  );
}
