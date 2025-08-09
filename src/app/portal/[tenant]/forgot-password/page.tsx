// src/app/portal/[tenant]/forgot-password/page.tsx
import AuthForm from "@/components/auth-form";

export default async function ForgotPasswordPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm type="forgot" tenant={tenant} />
    </div>
  );
}