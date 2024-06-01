import AuthLogin from "@/app/components/authForms/AuthLogin";
export const metadata = {
  title: "Login",
};
export default function Login() {
  return <AuthLogin title="Login" />;
}

Login.layout = "Blank";
