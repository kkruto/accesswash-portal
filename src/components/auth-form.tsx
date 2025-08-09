// src/components/auth-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock, Key } from "lucide-react";
import {
  customerLogin,
  customerRegister,
  forgotPassword,
  resetPassword,
  changePassword,
} from "@/lib/api";

function AuthForm({ type = "login", tenant, token: initialToken }: { type?: "login" | "register" | "forgot" | "reset" | "change"; tenant: string; token?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState(initialToken || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email && type !== "change") {
      newErrors.email = "Email is required";
    } else if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password && (type === "login" || type === "register" || type === "reset" || type === "change")) {
      newErrors.password = "Password is required";
    } else if (password && password.length < 6 && (type === "register" || type === "reset")) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (type === "change" && !newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (type === "change" && newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
    }

    if (type === "reset" && !token) {
      newErrors.token = "Reset token is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      let result;
      switch (type) {
        case "login":
          result = await customerLogin(tenant, { email, password });
          toast.success("Welcome back!", { description: "Redirecting to dashboard..." });
          setTimeout(() => {
            window.location.href = `/portal/${tenant}/dashboard`;
          }, 1000);
          break;
        case "register":
          result = await customerRegister(tenant, { email, password });
          toast.success("Account created!", { description: "Check your email for confirmation." });
          break;
        case "forgot":
          result = await forgotPassword(tenant, email);
          toast.success("Reset email sent", { description: "Check your inbox for instructions." });
          break;
        case "reset":
          result = await resetPassword(tenant, { password, token });
          toast.success("Password reset successful", { description: "Redirecting to login..." });
          setTimeout(() => {
            window.location.href = `/portal/${tenant}/login`;
          }, 1000);
          break;
        case "change":
          result = await changePassword(tenant, { password, new_password: newPassword });
          toast.success("Password updated", { description: "Your password has been changed." });
          break;
      }
    } catch (error: any) {
      const message = error?.response?.data?.detail || error?.message || "An error occurred";
      toast.error("Error", { description: message });
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    switch (type) {
      case "login": return "Sign In";
      case "register": return "Create Account";
      case "forgot": return "Send Reset Email";
      case "reset": return "Reset Password";
      case "change": return "Update Password";
      default: return "Submit";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="card space-y-6 animate-scale-in">
        {/* Email field */}
        {type !== "change" && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                }}
                placeholder="Enter your email"
                className={`form-input ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                disabled={loading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
            )}
          </div>
        )}

        {/* Password field */}
        {(type === "login" || type === "register" || type === "reset" || type === "change") && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {type === "change" ? "Current Password" : "Password"}
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                }}
                placeholder={type === "change" ? "Enter current password" : "Enter your password"}
                className={`form-input pr-10 ${errors.password ? 'border-destructive focus:border-destructive' : ''}`}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>
            )}
          </div>
        )}

        {/* Reset token field */}
        {type === "reset" && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Key className="w-4 h-4" />
              Reset Token
            </label>
            <div className="relative">
              <Input
                type="text"
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  if (errors.token) setErrors(prev => ({ ...prev, token: "" }));
                }}
                placeholder="Enter the reset token from your email"
                className={`form-input ${errors.token ? 'border-destructive focus:border-destructive' : ''}`}
                disabled={loading}
              />
            </div>
            {errors.token && (
              <p className="text-sm text-destructive animate-fade-in">{errors.token}</p>
            )}
          </div>
        )}

        {/* New password field */}
        {type === "change" && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4" />
              New Password
            </label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: "" }));
                }}
                placeholder="Enter your new password"
                className={`form-input pr-10 ${errors.newPassword ? 'border-destructive focus:border-destructive' : ''}`}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-destructive animate-fade-in">{errors.newPassword}</p>
            )}
          </div>
        )}

        {/* Submit button */}
        <Button 
          type="submit" 
          className="w-full btn-primary" 
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            getButtonText()
          )}
        </Button>

        {/* Additional links */}
        {type === "login" && (
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href={`/portal/${tenant}/register`} className="text-primary hover:underline font-medium">
                Sign up
              </a>
            </p>
            <p className="text-sm">
              <a href={`/portal/${tenant}/forgot-password`} className="text-primary hover:underline">
                Forgot your password?
              </a>
            </p>
          </div>
        )}

        {type === "register" && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href={`/portal/${tenant}/login`} className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
export { AuthForm };