import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiLogOut,
  FiSave,
  FiX,
  FiShoppingBag,
  FiHeart,
  FiGift,
} from "react-icons/fi";
import {
  selectUser,
  selectIsAuthenticated,
  updateProfile,
  logoutUser,
} from "../features/authSlice";

function Profile() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // Get first letter of user name for avatar
  const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-orange-950 p-6 md:p-10 text-white shadow-xl">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-600/10 blur-3xl"></div>
          <div className="absolute left-1/3 bottom-0 h-32 w-32 rounded-full bg-neutral-500/10 blur-3xl"></div>

          <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-orange-600 text-4xl font-extrabold text-white shadow-lg ring-4 ring-neutral-700 md:h-28 md:w-28">
              {avatarLetter}
            </div>

            {/* Profile Brief */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block rounded-full bg-orange-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
                Premium Member
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-neutral-300">
                {user.email}
              </p>

              {/* Quick Info Grid */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-neutral-300 md:justify-start">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-800/80 px-3 py-1.5 backdrop-blur-sm">
                  <FiShoppingBag className="text-orange-500" /> 0 Orders
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-800/80 px-3 py-1.5 backdrop-blur-sm">
                  <FiHeart className="text-orange-500" /> 0 Favorites
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-800/80 px-3 py-1.5 backdrop-blur-sm">
                  <FiGift className="text-orange-500" /> 250 Points
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 rounded-full border border-neutral-600 bg-neutral-800/50 px-5 py-2.5 text-sm font-semibold transition hover:bg-neutral-800 hover:text-white"
              >
                {editMode ? (
                  <>
                    <FiX className="text-sm" /> Cancel
                  </>
                ) : (
                  <>
                    <FiEdit2 className="text-sm" /> Edit Profile
                  </>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 p-2.5 text-white transition shadow-lg"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Details Form Card */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:col-span-2">
            <h2 className="text-xl font-bold text-neutral-900">
              Account Details
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Manage your personal information and contact details.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Full Name
                  </label>
                  <div className="relative mt-2">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                      className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm text-neutral-800 outline-none transition ${
                        editMode
                          ? "border-orange-500 bg-white focus:ring-2 focus:ring-orange-100"
                          : "border-slate-200 bg-slate-50 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Email Address
                  </label>
                  <div className="relative mt-2">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      required
                      className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm text-neutral-800 outline-none transition ${
                        editMode
                          ? "border-orange-500 bg-white focus:ring-2 focus:ring-orange-100"
                          : "border-slate-200 bg-slate-50 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Phone Number
                  </label>
                  <div className="relative mt-2">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={editMode ? "+1 (555) 123-4567" : "Not set yet"}
                      disabled={!editMode}
                      className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm text-neutral-800 outline-none transition ${
                        editMode
                          ? "border-orange-500 bg-white focus:ring-2 focus:ring-orange-100"
                          : "border-slate-200 bg-slate-50 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Shipping Address
                  </label>
                  <div className="relative mt-2">
                    <FiMapPin className="absolute left-3 top-4 text-neutral-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder={editMode ? "123 Main St, New York, NY 10001" : "Not set yet"}
                      disabled={!editMode}
                      className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm text-neutral-800 outline-none transition ${
                        editMode
                          ? "border-orange-500 bg-white focus:ring-2 focus:ring-orange-100"
                          : "border-slate-200 bg-slate-50 cursor-not-allowed"
                      }`}
                    ></textarea>
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-orange-650 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 shadow-md hover:shadow-orange-200"
                  >
                    <FiSave /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Quick Stats sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h3 className="text-lg font-bold text-neutral-900">
                Offers & Rewards
              </h3>
              <div className="mt-4 rounded-2xl bg-orange-50/50 p-4 border border-orange-100">
                <p className="text-sm font-bold text-orange-950">
                  Welcome Reward!
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Use coupon code <span className="font-semibold text-orange-600">WELCOME10</span> to get 10% off on your next purchase.
                </p>
              </div>
              <div className="mt-4 rounded-2xl bg-indigo-50/50 p-4 border border-indigo-100">
                <p className="text-sm font-bold text-indigo-950">
                  Free Shipping
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Free standard shipping applies to all orders over $75.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h3 className="text-lg font-bold text-neutral-900">
                Need Help?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                Have questions about your order, tracking, or refunds? Our support team is here 24/7.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="mt-4 w-full rounded-full border border-slate-200 py-2.5 text-xs font-semibold text-neutral-700 transition hover:bg-slate-50"
              >
                Contact Support
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
