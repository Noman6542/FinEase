import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";

const Banner = () => {
  const { user } = use(AuthContext);
  const isAuthenticated = !!user && user.isAnonymous === false;

  return (
    <section className="max-w-[1400px] mx-auto py-2">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-14 rounded-3xl shadow-2xl text-center"
      >
        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
        >
          {isAuthenticated
            ? `Welcome back, ${user.displayName || "User"}`
            : "Take Control of Your Financial Future"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-indigo-100 font-medium max-w-3xl mx-auto mb-10"
        >
          Track expenses, manage budgets, and make smarter financial decisions —
          all in one secure platform.
        </motion.p>

       

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white"
        >
          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-indigo-200 text-sm">Active Users</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">99.9%</h3>
            <p className="text-indigo-200 text-sm">Secure Transactions</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="text-indigo-200 text-sm">Support Available</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
