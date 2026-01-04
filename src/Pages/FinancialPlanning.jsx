import React from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiAlertTriangle,
  FiShield,
  FiTarget,
  FiClock,
  FiDollarSign,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";

const items = [
  {
    title: "Clear Financial Goals",
    desc: "Helps define short and long-term goals with a structured financial roadmap.",
    icon: <FiTarget />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Emergency Readiness",
    desc: "Prepares you for job loss, medical emergencies, or unexpected expenses.",
    icon: <FiAlertTriangle />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Smart Wealth Growth",
    desc: "Ensures disciplined saving and investing for long-term wealth building.",
    icon: <FiTrendingUp />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Expense Control",
    desc: "Keeps spending under control and avoids unnecessary financial leaks.",
    icon: <FiDollarSign />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Risk Protection",
    desc: "Protects your finances against risks through planning and safeguards.",
    icon: <FiShield />,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Time Optimization",
    desc: "Saves time by automating savings and budgeting decisions efficiently.",
    icon: <FiClock />,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Performance Tracking",
    desc: "Tracks income, expenses, and progress using financial indicators.",
    icon: <FiBarChart2 />,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Financial Confidence",
    desc: "Builds confidence and peace of mind through better money decisions.",
    icon: <FiCheckCircle />,
    color: "bg-emerald-100 text-emerald-600",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

const FinancialPlanning = () => {
  return (
    <section className="max-w-[1400px] mx-auto py-20 ">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Why Financial Planning Matters
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Financial planning helps you stay prepared, grow wealth, and make
          confident money decisions.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 text-2xl ${item.color}`}
            >
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2">
              {item.title}
            </h3>

            {/* Desc (2 lines only) */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FinancialPlanning;
