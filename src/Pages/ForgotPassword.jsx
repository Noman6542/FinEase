// import React, { useRef } from "react";

// import { toast } from "react-toastify";
// import { Link } from "react-router";
// import { auth } from "../Firebase/Firebase.init";
// import { sendPasswordResetEmail } from "firebase/auth";

// const ForgotPassword = () => {
//   const emailRef = useRef();

//   const handleReset = (e) => {
//     e.preventDefault();
//     const email = emailRef.current.value;

//     if (!email) {
//       toast.warning("Please enter your email!");
//       return;
//     }

//     sendPasswordResetEmail(auth, email)
//       .then(() => {
//         toast.success("Password reset email sent!");
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <div className="card bg-base-100 p-8 shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
//         <form onSubmit={handleReset}>
//           <input
//             ref={emailRef}
//             type="email"
//             placeholder="Enter your email"
//             className="input input-bordered w-full mb-4"
//           />
//           <button type="submit" className="btn btn-neutral w-full">
//             Send Reset Link
//           </button>
//         </form>
//         <p className="text-center mt-4">
//           Back to{" "}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
