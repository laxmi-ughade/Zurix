import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

import {
  useLazyLoginQuery,
  useLazyGetUsersQuery,
  useLazyGetUserByEmailQuery,
  useRegisterMutation,
} from "../services/authApi";

function LoginModal({ isOpen, onClose }) {
  const [login, { isFetching: isLoggingIn }] = useLazyLoginQuery();
  const [getUsers] = useLazyGetUsersQuery();
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const navigate = useNavigate();

  // LOGIN / REGISTER MODE
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // MESSAGES
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // PASSWORD VISIBILITY
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccessMessage("");
  };

  // RESET FORM
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccessMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // SWITCH MODE
  const switchMode = (mode) => {
    setIsRegisterMode(mode);
    resetForm();
  };

  // CLOSE MODAL
  const handleClose = () => {
    resetForm();
    setIsRegisterMode(false);
    onClose();
  };

  // AUTO FILL DEMO USER
  const handleFillDemo = () => {
    setFormData({
      name: "Laxmi",
      email: "laxmi@gmail.com",
      password: "123456",
      confirmPassword: "123456",
    });
    setError("");
  };

  // Save authenticated user & trigger session update
  const persistSession = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("auth-changed"));
  };

  // ================================
  // LOGIN LOGIC (PURE RTK QUERY)
  // ================================
  const handleLogin = async () => {
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanPassword = formData.password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      let matchedUser = null;

      // 1. Try RTK Query lazy login
      try {
        const queryRes = await login({
          email: cleanEmail,
          password: cleanPassword,
        }).unwrap();

        if (Array.isArray(queryRes) && queryRes.length > 0) {
          matchedUser = queryRes[0];
        } else if (queryRes && !Array.isArray(queryRes) && queryRes.email) {
          matchedUser = queryRes;
        }
      } catch (err) {
        console.warn("Direct query failed, checking users list fallback:", err);
      }

      // 2. Resilient fallback: RTK Query lazy users query
      if (!matchedUser) {
        const allUsersRes = await getUsers().unwrap();
        if (Array.isArray(allUsersRes)) {
          matchedUser = allUsersRes.find(
            (u) =>
              u.email?.toLowerCase().trim() === cleanEmail &&
              String(u.password).trim() === cleanPassword
          );
        }
      }

      if (!matchedUser) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      // Save user session
      persistSession(matchedUser);

      setSuccessMessage(`Welcome back, ${matchedUser.name || "User"}!`);

      setTimeout(() => {
        handleClose();
        navigate("/profile");
      }, 800);
    } catch (err) {
      console.error("Login exception:", err);
      setError("Unable to connect to login server. Please ensure server is running.");
    }
  };

  // ================================
  // REGISTER LOGIC (PURE RTK QUERY)
  // ================================
  const handleRegister = async () => {
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanPassword = formData.password.trim();

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    if (cleanPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (cleanPassword !== formData.confirmPassword.trim()) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Check if user already exists with RTK Query
      let existingUsers = [];
      try {
        existingUsers = await getUserByEmail(cleanEmail).unwrap();
      } catch {
        const allUsers = await getUsers().unwrap();
        if (Array.isArray(allUsers)) {
          existingUsers = allUsers.filter(
            (u) => u.email?.toLowerCase().trim() === cleanEmail
          );
        }
      }

      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        setError("An account with this email already exists.");
        return;
      }

      // Create new user in db.json using RTK Query mutation
      const newUserPayload = {
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
        phone: "",
        address: "",
        createdAt: new Date().toISOString(),
      };

      const createdUser = await register(newUserPayload).unwrap();

      // Log in automatically
      persistSession(createdUser);

      setSuccessMessage(`Account created successfully! Welcome, ${cleanName}.`);

      setTimeout(() => {
        handleClose();
        navigate("/profile");
      }, 900);
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    }
  };

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (isRegisterMode) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  if (!isOpen) return null;

  const isLoading = isLoggingIn || isRegistering;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm overflow-y-auto">
      {/* MODAL CARD */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl transition-all my-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close modal"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-black hover:text-white"
        >
          <FiX size={18} />
        </button>

        {/* TAB SWITCHER */}
        <div className="flex rounded-2xl bg-gray-100 p-1 mb-6">
          <button
            type="button"
            onClick={() => switchMode(false)}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
              !isRegisterMode
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode(true)}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
              isRegisterMode
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Register
          </button>
        </div>

        {/* HEADER */}
        <div className="mb-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
            {isRegisterMode ? "Join Zurix Club" : "Welcome Back"}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
            {isRegisterMode ? "Create Account" : "Sign In to Zurix"}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
            {isRegisterMode
              ? "Fill in your details to start shopping with exclusive perks."
              : "Access your wishlist, order tracking, and profile details."}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME - REGISTER ONLY */}
          {isRegisterMode && (
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Laxmi Sharma"
                  autoComplete="name"
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Password
            </label>
            <div className="relative">
              <FiLock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min 6 chars)"
                autoComplete={isRegisterMode ? "new-password" : "current-password"}
                required
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-11 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD - REGISTER ONLY */}
          {isRegisterMode && (
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-11 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer p-1"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
          )}

          {/* ERROR ALERT */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs sm:text-sm font-semibold text-red-600 flex items-center gap-2">
              <span className="shrink-0">•</span> {error}
            </div>
          )}

          {/* SUCCESS ALERT */}
          {successMessage && (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-xs sm:text-sm font-semibold text-green-700 flex items-center gap-2">
              <FiCheckCircle className="shrink-0 text-green-600" size={16} />
              {successMessage}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm text-white"></span>
            ) : (
              <>
                {isRegisterMode ? "Create Account" : "Sign In"}
                <FiArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* DEMO LOGIN SHORTCUT */}
        {!isRegisterMode && (
          <div className="mt-5 rounded-2xl bg-orange-50/80 border border-orange-200/80 p-3.5 text-xs text-orange-950 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <p className="font-bold text-orange-900">Demo User</p>
              <p className="text-[11px] text-orange-800">
                Email: <span className="font-mono font-medium">laxmi@gmail.com</span> | Pass: <span className="font-mono font-medium">123456</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="shrink-0 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-orange-700 transition cursor-pointer"
            >
              Fill Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;