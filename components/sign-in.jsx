import { Link, useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", 
    password: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validate = (f) => {
    const errs = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
    if (!emailOk) errs.email = "Enter a valid email address";
    if (!f.password || f.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    return errs;
  };

  const erros = useMemo(() => validate(form), [form]);
  const canSubmit = Object.keys(erros).length === 0;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    
    if (canSubmit) {
      // Form is valid - you can add your own logic here
      console.log("Logged in user:", form.email);
      
      // Simulate login processing delay
      setTimeout(() => {
        setLoginSuccess(true);
      }, 500);
    }
  };

  // Success Screen
  if (loginSuccess) {
    return (
      <div className="min-h-screen text-white relative" style={{ background: 'radial-gradient(ellipse at center, #525254 0%, #2B2B2D 70%)' }}>
        {/* Back Button - Top Left */}
        <button 
          onClick={() => setLoginSuccess(false)}
          className="absolute top-6 left-6 flex items-center hover:text-white transition-colors z-10" 
          style={{ color: '#9E9EA0' }}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
              <Check size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold">Welcome back!</h2>
            <p style={{ color: '#9E9EA0' }}>You have been signed in successfully.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4 relative" style={{ background: 'radial-gradient(ellipse at center, #525254 0%, #2B2B2D 70%)' }}>
      {/* Back Button - Top Left */}
      <button
      onClick={() => navigate("/")}
      className="absolute top-6 left-6 flex items-center hover:text-white transition-colors z-10" style={{ color: '#9E9EA0' }}>
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#525254' }}>
                <div className="w-8 h-8 border-2 rounded-full border-dashed animate-pulse" style={{ borderColor: '#9E9EA0' }}></div>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className="mb-2" style={{ color: '#9E9EA0' }}>
                Don't have an account?
                <Link to= "/sign-up"> <span className="text-white underline cursor-pointer">Sign up</span></Link>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-white transition-colors"
                style={{ 
                  backgroundColor: '#525254', 
                  borderColor: '#9E9EA0',
                  color: '#BABABA'
                }}
                onFocus={(e) => e.target.style.borderColor = '#BABABA'}
                onBlur={(e) => e.target.style.borderColor = '#9E9EA0'}
              />
              {submit && erros.email && (
                <p className="text-red-400 text-sm mt-2">{erros.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={onChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:border-white transition-colors"
                  style={{ 
                    backgroundColor: '#525254', 
                    borderColor: '#9E9EA0',
                    color: '#BABABA'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#BABABA'}
                  onBlur={(e) => e.target.style.borderColor = '#9E9EA0'}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-white transition-colors"
                  style={{ color: '#9E9EA0' }}
                >
                  {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {submit && erros.password && (
                <p className="text-red-400 text-sm mt-2">{erros.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <span className="text-sm text-white underline cursor-pointer hover:opacity-80">
                Forgot password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                canSubmit
                  ? 'text-black hover:opacity-90 active:scale-95'
                  : 'cursor-not-allowed'
              }`}
              style={{
                backgroundColor: canSubmit ? '#BABABA' : '#525254',
                color: canSubmit ? '#2B2B2D' : '#9E9EA0'
              }}
            >
              Sign in
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: '#9E9EA0' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-sm" style={{ 
                  background: 'radial-gradient(ellipse at center, #525254 0%, #2B2B2D 70%)',
                  color: '#9E9EA0'
                }}>or</span>
              </div>
            </div>

            {/* Social Sign-in Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full py-3 border rounded-lg font-medium transition-colors hover:opacity-80 flex items-center justify-center space-x-3"
                style={{ 
                  borderColor: '#9E9EA0',
                  backgroundColor: 'transparent',
                  color: '#BABABA'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>
              
              <button
                type="button"
                className="w-full py-3 border rounded-lg font-medium transition-colors hover:opacity-80 flex items-center justify-center space-x-3"
                style={{ 
                  borderColor: '#9E9EA0',
                  backgroundColor: 'transparent',
                  color: '#BABABA'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}