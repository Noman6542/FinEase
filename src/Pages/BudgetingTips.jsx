import React from "react";
import { FaPiggyBank } from "react-icons/fa";
import { motion } from "framer-motion";

const tips = [
  {
    title: "Track Your Expenses",
    desc: "Track all your expenses for a month to understand where your money goes.",
    category: "Awareness",
    priority: "High",
    impact: "High Savings Impact",
  },
  {
    title: "Categorize Spending",
    desc: "Split your spending into Needs, Wants, and Savings for better control.",
    category: "Planning",
    priority: "High",
    impact: "Better Control",
  },
  {
    title: "50 / 30 / 20 Rule",
    desc: "Allocate 50% Needs, 30% Wants, and 20% Savings or Debt repayment.",
    category: "Strategy",
    priority: "Medium",
    impact: "Balanced Budget",
  },
  {
    title: "Set Monthly Limits",
    desc: "Define spending limits for each category and stick to them.",
    category: "Discipline",
    priority: "Medium",
    impact: "Spending Reduction",
  },
  {
    title: "Automate Savings",
    desc: "Automate savings so you pay yourself first every month.",
    category: "Automation",
    priority: "High",
    impact: "Long-term Growth",
  },
  {
    title: "Review Subscriptions",
    desc: "Regularly review and cancel unused subscriptions.",
    category: "Cost Cutting",
    priority: "Medium",
    impact: "Save Monthly",
  },
  {
    title: "Plan for Emergencies",
    desc: "Keep an emergency fund of at least 3–6 months of expenses.",
    category: "Safety",
    priority: "High",
    impact: "Financial Security",
  },
  {
    title: "Use Cashback & Rewards",
    desc: "Take advantage of cashback, discounts, and reward programs.",
    category: "Efficiency",
    priority: "Low",
    impact: "Extra Savings",
  },
  {
    title: "Invest Wisely",
    desc: "Invest surplus money in low-risk assets to grow wealth steadily.",
    category: "Growth",
    priority: "High",
    impact: "Wealth Building",
  },
  {
    title: "Avoid Impulse Buying",
    desc: "Wait 24 hours before making non-essential purchases.",
    category: "Behavior",
    priority: "Medium",
    impact: "Reduced Waste",
  },
  {
    title: "Track Financial Goals",
    desc: "Set clear short-term and long-term financial goals.",
    category: "Goal Setting",
    priority: "High",
    impact: "Focused Growth",
  },
  {
    title: "Review Budget Monthly",
    desc: "Review and adjust your budget every month for accuracy.",
    category: "Monitoring",
    priority: "Medium",
    impact: "Consistent Improvement",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

const BudgetingTips = () => {
  return (
    <section className="w-full py-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Budgeting Tips
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Practical budgeting tips to help you control spending and grow savings.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 "
      >
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between w-full"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
                  <FaPiggyBank className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{tip.title}</h3>
                  <span className="text-xs text-gray-400">
                    {tip.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-5">
                {tip.desc}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  tip.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : tip.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {tip.priority} Priority
              </span>

              <span className="text-xs text-green-600 font-medium">
                {tip.impact}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BudgetingTips;
