import React from "react";
import { FaChartBar, FaPlus } from "react-icons/fa";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineTrendingUp } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";

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
            className="menu menu-sm dropdown-content bg-[#0a3d62] rounded-box z-1 mt-3 w-52 p-2 shadow space-y-5"
          >
            <NavLink
              to={"/"}
              className={
                "flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
              }
            >
              <IoHomeOutline className="w-3 h-3" />
              <span className="text-sm sm:text-base"> Home</span>
            </NavLink>

            <NavLink
              to={"/add-transaction"}
              className={
                "flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
              }
            >
              <FaPlus className="w-3 h-3" />
              <span className="text-sm sm:text-base">Add Transaction</span>
            </NavLink>

            <NavLink
              to={"/my-transaction"}
              className={
                "flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
              }
            >
              <HiOutlineQueueList className="w-3 h-3" />
              <span className="text-sm sm:text-base">My Transactions</span>
            </NavLink>
            <NavLink
              to={"/reports"}
              className={
                "flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
              }
            >
              <FaChartBar className="w-3 h-3" />
              <span className="text-sm sm:text-base">Reports</span>
            </NavLink>
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
          <NavLink
            to={"/"}
            className={
              "flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
            }
          >
            <IoHomeOutline className="w-7 h-7" />
            <span> Home</span>
          </NavLink>

          <NavLink
            to={"/add-transaction"}
            className={
              "flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
            }
          >
            <FaPlus className="w-7 h-7" />
            <span>Add Transaction</span>
          </NavLink>

          <NavLink
            to={"/my-transaction"}
            className={
              "flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
            }
          >
            <HiOutlineQueueList className="w-7 h-7" />
            <span>My Transactions</span>
          </NavLink>
          <NavLink
            to={"/reports"}
            className={
              "flex items-center space-x-2 text-white text-2xl font-bold tracking-tight"
            }
          >
            <FaChartBar className="w-7 h-7" />
            <span>Reports</span>
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          to="/login"
          className="btn btn-primary hidden md:flex items-center justify-center hover:bg-white hover:font-semibold hover:text-black "
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
