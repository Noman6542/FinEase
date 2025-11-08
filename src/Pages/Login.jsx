import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";


const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const { login, googleWithSignin } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        toast.success(`Login Successfully, ${user.displayName}`);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => setError(error.message));
  };

  const handleWithGoogle = () => {
    googleWithSignin()
      .then((result) => {
        const user = result.user;
        toast.success(`Login Successfully, ${user.displayName}`);

        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => setError(error.message));
  };


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl text-center">
        <h2 className="font-semibold text-3xl p-4">Login your account</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              
            />

            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={show ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <span
                onClick={() => setShow(!show)}
                className=" absolute right-5 top-1/3 cursor-pointer z-50"
              >
                {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
              </span>
            </div>
            <div>
              <Link to='/forgot-password' className="link link-hover">Forgot password?</Link>
            </div>
            <p>
              Don't have an account?
              <Link
                to="/register"
                className=" font-semibold hover:underline hover:text-[#4338ca] ml-2"
              >
                Register
              </Link>
            </p>
            {error && <p className="text-red-400">{error}</p>}
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
          <div className="flex justify-center items-center">
            <p className="font-bold text-2xl">or</p>
          </div>
        </form>

        <div className="px-10 pb-5 mx-auto">
          <button
            onClick={handleWithGoogle}
            className="btn btn-soft btn-primary flex justify-center items-center gap-2"
          >
            <FcGoogle></FcGoogle> Login with Google{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
