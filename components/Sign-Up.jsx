import { Link, useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmpassword: "",
    terms: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [submit, setSubmit] = useState(false);

  const validate = (f) => {
    const errs = {};

    if (!f.fname.trim() || f.fname.trim().length < 2) {
      errs.fname = "Please enter a valid first name.";
    }
    if (!f.lname.trim() || f.lname.trim().length < 2) {
      errs.lname = "Please enter a valid last name.";
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
    if (!emailOk) errs.email = "Enter a valid email address";

    const pw = f.password;
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasNum = /\d/.test(pw);
    const hasSym = /[^A-Za-z0-9]/.test(pw);

    if (pw.length < 8 || !(hasLower && hasUpper && (hasNum || hasSym))) {
      errs.password =
        "Use 8+ chars with upper & lower case and a number or symbol";
    }

    if (f.confirmpassword !== pw)
      errs.confirmpassword = "Passwords do not match";

    if (!f.terms) errs.terms = "You must agree to continue";
    return errs;
  };

  const scorePassword = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 3);
  };

  const pwScore = scorePassword(form.password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
  const strengthLabel = strengthLabels[pwScore];
  const strengthColor = strengthColors[pwScore];
  
  const erros = useMemo(() => validate(form), [form]);
  const canSubmit = Object.keys(erros).length === 0;

  const onChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ... (rest of your component code)

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmit(true);

  const currentErrors = validate(form);
  const isFormValid = Object.keys(currentErrors).length === 0;

  if (isFormValid) {
    try {
      // Send data to the backend signup endpoint
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: form.fname,
          lname: form.lname,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration
        console.log("Registration successful:", data.message);
        // You can add a success toast notification here
        navigate("/sign-in");
      } else {
        // Handle registration failure from the backend
        console.error("Registration failed:", data.message);
        // You can display an error message on the page or a toast notification
      }
    } catch (error) {
      console.error("Network or server error:", error);
      // Display a generic error message
    }
  }
};

// ... (rest of your component code)

  const handleGoogleSignIn = () => {
  
    console.log("Google sign-in clicked");
  };

  const handleGitHubSignIn = () => {
  
    console.log("GitHub sign-in clicked");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen text-white p-4 relative" style={{ background: 'radial-gradient(ellipse at center, #4a4a4a 0%, #2B2B2D 70%, #1a1a1a 100%)' }}>
      {/* Back Button - Top Left */}
      <button 
        onClick={handleBackClick}
        className="absolute top-6 left-6 flex items-center hover:text-white transition-colors z-10" 
        style={{ color: '#9E9EA0' }}
      >
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
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="mb-2" style={{ color: '#9E9EA0' }}>
                Already have an account?{""} <Link to="/sign-in"><span className="text-white underline cursor-pointer">Sign in</span></Link>
              </p>
            </div>
          </div>

          {/* Form - ONLY contains input fields and Create Account button */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={form.fname}
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
                {submit && erros.fname && (
                  <p className="text-red-400 text-sm mt-2">{erros.fname}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={form.lname}
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
                {submit && erros.lname && (
                  <p className="text-red-400 text-sm mt-2">{erros.lname}</p>
                )}
              </div>
            </div>

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
              
              {/* Password Strength */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1 rounded-full h-2" style={{ backgroundColor: '#2B2B2D' }}>
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(pwScore + 1) * 25}%`,
                          backgroundColor: pwScore === 0 ? '#ef4444' : 
                                         pwScore === 1 ? '#eab308' : 
                                         pwScore === 2 ? '#3b82f6' : '#10b981'
                        }}
                      ></div>
                    </div>
                    <span className="text-sm" style={{ color: '#9E9EA0' }}>{strengthLabel}</span>
                  </div>
                </div>
              )}
              
              {submit && erros.password && (
                <p className="text-red-400 text-sm mt-2">{erros.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPw ? "text" : "password"}
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  value={form.confirmpassword}
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
                  onClick={() => setShowConfirmPw((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-white transition-colors"
                  style={{ color: '#9E9EA0' }}
                >
                  {showConfirmPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {submit && erros.confirmpassword && (
                <p className="text-red-400 text-sm mt-2">{erros.confirmpassword}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={onChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-colors ${
                    form.terms 
                      ? 'border-white' 
                      : ''
                  }`} style={{ 
                    backgroundColor: form.terms ? '#BABABA' : 'transparent',
                    borderColor: form.terms ? '#BABABA' : '#9E9EA0'
                  }}>
                    {form.terms && (
                      <Check size={12} className="absolute top-0.5 left-0.5" style={{ color: '#2B2B2D' }} />
                    )}
                  </div>
                </div>
                <span className="text-sm leading-5" style={{ color: '#BABABA' }}>
                  I acknowledge that I have read and agree to our{" "}
                  <span className="text-white underline">Terms of Service</span> and{" "}
                  <span className="text-white underline">Privacy Policy</span>
                </span>
              </label>
              {submit && erros.terms && (
                <p className="text-red-400 text-sm mt-2">{erros.terms}</p>
              )}
            </div>

            {/* Submit Button - ONLY form submission button inside form */}
            <button
              type="submit"
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
              Create Account
            </button>
          </form>
          {/* Form ends here - Social login buttons are OUTSIDE the form */}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: '#9E9EA0' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-sm" style={{ 
                background: 'radial-gradient(ellipse at center, #4a4a4a 0%, #2B2B2D 70%, #1a1a1a 100%)',
                color: '#9E9EA0'
              }}>or</span>
            </div>
          </div>

          {/* Social Sign-in Buttons - OUTSIDE form, with explicit type="button" and click handlers */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGitHubSignIn}
              className="w-full py-3 border rounded-lg font-medium transition-colors hover:opacity-80 flex items-center justify-center space-x-3"
              style={{ 
                borderColor: '#9E9EA0',
                backgroundColor: 'transparent',
                color: '#BABABA'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Continue with GitHub</span>
            </button>
            
            <button
              type="button"
              onClick={handleGoogleSignIn}
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
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}