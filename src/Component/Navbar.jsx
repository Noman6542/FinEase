import React, { use, useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartBar,
  FaPlus,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTrendingUp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";
import { auth } from "../Firebase/Firebase.init";
import { AuthContext } from "../Provider/AuthProvider";

const navItems = [
  { to: "/", label: "Home", icon: <IoHomeOutline /> },
  { to: "/add-transaction", label: "Add Transaction", icon: <FaPlus /> },
  { to: "/my-transaction", label: "My Transactions", icon: <HiOutlineQueueList /> },
  { to: "/report", label: "Reports", icon: <FaChartBar /> },
];

const Navbar = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [open, setOpen] = useState(false);

  /* Theme handling */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* Outside click close */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    auth.signOut();
    Swal.fire("Logged out", "See you again", "success");
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
    >
      <div className="navbar max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className="navbar-start">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white text-xl font-extrabold"
          >
            <MdOutlineTrendingUp className="text-3xl" />
            FinEase
          </button>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 font-semibold transition ${
                    isActive
                      ? "text-white underline underline-offset-8"
                      : "text-indigo-200 hover:text-white"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-white text-xl"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {!user ? (
            <>
              <Link className="btn btn-sm btn-outline text-white" to="/login">
                Login
              </Link>
              <Link className="btn btn-sm btn-white" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <div ref={dropdownRef} className="relative">
              <img
                src={user.photoURL || "/default.png"}
                alt="profile"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              />

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl p-4"
                  >
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>

                    <Link
                      to="/my-profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 mt-3 text-indigo-600 hover:font-semibold"
                    >
                      <CgProfile />
                      My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
