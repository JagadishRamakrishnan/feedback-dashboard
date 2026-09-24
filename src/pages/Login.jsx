import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Eye, EyeOff, ClipboardList, ArrowRight } from "lucide-react";

import { loginUser } from "../services/userApi";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      login(data.user, remember);

      navigate("/admin/assignments", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[920px] grid lg:grid-cols-2 bg-white rounded-xl2 shadow-card border border-border overflow-hidden">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between bg-maroon-700 text-white p-10">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <ClipboardList size={18} />
            </span>

            <span className="font-semibold">Ascent Feedback</span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold leading-snug mb-3">
              Structured feedback, on time, every cycle.
            </h2>

            <p className="text-maroon-100 text-sm leading-relaxed">
              Assign reviews, track submissions, and keep every employee's
              feedback history in one clean dashboard.
            </p>
          </div>

          <p className="text-xs text-maroon-100/80">
            © 2026 Ascent Feedback. All rights reserved.
          </p>
        </div>

        {/* Login Section */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-ink">Welcome back</h1>

            <p className="text-sm text-ink-soft mt-1">
              Sign in to your Ascent Feedback account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm focus-ring focus:border-maroon-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border px-3.5 py-2.5 pr-10 text-sm focus-ring focus:border-maroon-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-danger bg-dangerBg rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-soft">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-border accent-maroon-700"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-maroon-700 font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-maroon-700 text-white text-sm font-medium py-2.5 hover:bg-maroon-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
