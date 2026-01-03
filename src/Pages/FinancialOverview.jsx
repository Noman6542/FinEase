import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaClock,
} from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const StatCard = ({
  title,
  amount,
  icon,
  color,
  trend,
  percentage,
  subtitle,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.4 }}
    className="bg-base-100 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
  >
    {/* Icon */}
    <div
      className={`mx-auto w-14 h-14 flex items-center justify-center rounded-full mb-4 ${color}`}
    >
      {icon}
    </div>

    {/* Title */}
    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
      {title}
    </h3>

    {/* Amount */}
    <p className="text-3xl font-bold mt-2">
      ৳ {amount.toLocaleString()}
    </p>

    {/* Trend */}
    <div className="flex items-center justify-center gap-2 mt-3">
      {trend === "up" ? (
        <FaArrowUp className="text-green-600 text-sm" />
      ) : (
        <FaArrowDown className="text-red-600 text-sm" />
      )}
      <span
        className={`text-sm font-semibold ${
          trend === "up" ? "text-green-600" : "text-red-600"
        }`}
      >
        {percentage}% this month
      </span>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-400">
      <FaClock />
      <span>{subtitle}</span>
    </div>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="bg-base-100 rounded-2xl shadow-md p-6 animate-pulse">
    <div className="w-14 h-14 bg-gray-300 rounded-full mx-auto mb-4" />
    <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-2" />
    <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-3" />
    <div className="h-3 bg-gray-300 rounded w-1/3 mx-auto" />
  </div>
);

const FinancialOverview = () => {
  const { user } = use(AuthContext);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("https://fin-ease-server-site.vercel.app/overview")
      .then(res => res.json())
      .then(data => setOverview(data))
      .catch(() => setOverview(null))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <section className="max-w-[1400px] mx-auto">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-4xl font-bold text-center mb-12 mt-5"
      >
        Financial Overview
      </motion.h2>

      {!user && (
        <p className="text-center text-gray-500">
          Please log in to view your financial summary.
        </p>
      )}

      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatCard
                title="Total Balance"
                amount={overview?.balance || 0}
                icon={<FaWallet className="text-green-700 text-xl" />}
                color="bg-green-100"
                trend="up"
                percentage={8.2}
                subtitle="Updated just now"
              />

              <StatCard
                title="Total Income"
                amount={overview?.income || 0}
                icon={<FaArrowUp className="text-blue-700 text-xl" />}
                color="bg-blue-100"
                trend="up"
                percentage={12.5}
                subtitle="Compared to last month"
              />

              <StatCard
                title="Total Expense"
                amount={overview?.expense || 0}
                icon={<FaArrowDown className="text-red-700 text-xl" />}
                color="bg-red-100"
                trend="down"
                percentage={5.1}
                subtitle="Spending decreased"
              />
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default FinancialOverview;
