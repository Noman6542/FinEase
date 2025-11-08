import React from "react";
import { FaChartBar, FaPlus } from "react-icons/fa";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTrendingUp } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-indigo-600 shadow-md sticky">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
          >
            <MdOutlineTrendingUp className="w-7 h-7" />
            <span>FinEase</span>
          </button>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-10">
          <NavLink to={'/'} className={"flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"}>
            <IoHomeOutline className="w-7 h-7" />
            <span> Home</span>
          </NavLink>
          
            <NavLink to={"/add-transaction"} className={"flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"}>
            <FaPlus className="w-7 h-7"/>
            <span>Add Transaction</span>
            </NavLink>
          
          
            <NavLink to={"/my-transaction"} className={"flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"}>
            <HiOutlineQueueList className="w-7 h-7"/>
            <span>My Transactions</span>
            </NavLink>
          <NavLink to={'/reports'}  className={"flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"}>
            <FaChartBar className="w-7 h-7"/>
            <span>Reports</span>
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-full bg-indigo-500 ring-2 ring-white hover:ring-indigo-300 transition-shadow"
              >
                <img
                  src={
                    user.photoURL ||
                    `https://placehold.co/32x32/6366F1/ffffff?text=${
                      user.displayName ? user.displayName.charAt(0) : "U"
                    }`
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/32x32/6366F1/ffffff?text=${
                      user.displayName ? user.displayName.charAt(0) : "U"
                    }`;
                  }}
                />
                <span className="hidden sm:inline text-white font-medium">
                  {user.displayName || "User"}
                </span>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="block px-4 py-2 text-sm text-gray-700 truncate border-b">
                      <p className="font-semibold">
                        {user.displayName || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email || "No email"}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("MyProfile");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 mr-2" /> My Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // For FinEase, we assume authentication is handled by the canvas (signInWithCustomToken/Anonymously).
            // We won't add separate login/signup buttons, but show the user ID for debugging/identification.
            <div className="text-white text-sm bg-indigo-500 px-3 py-1 rounded-full">
              {user
                ? `User ID: ${user.uid.substring(0, 8)}...`
                : "Connecting..."}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
