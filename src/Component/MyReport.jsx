import React, { useEffect, useState, useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PacmanLoader } from "react-spinners";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";

const COLORS = ["#4caf50", "#f44336"]; // Income = green, Expense = red

const MyReport = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(
      `https://fin-ease-server-site.vercel.app/finease-data?userEmail=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <PacmanLoader color="#5e5feb" size={25} />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-3xl shadow-xl text-center w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">My Expense Report</h2>
          <p className="text-gray-500">No transactions found</p>
        </motion.div>
      </div>
    );
  }

  // Overall totals
  const incomeTotal = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = incomeTotal - expenseTotal;

  // Monthly breakdown
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyData = months.map((month, index) => {
    const monthIncome = transactions
      .filter(
        (t) => new Date(t.date).getMonth() === index && t.type === "Income"
      )
      .reduce((sum, t) => sum + t.amount, 0);
    const monthExpense = transactions
      .filter(
        (t) => new Date(t.date).getMonth() === index && t.type === "Expense"
      )
      .reduce((sum, t) => sum + t.amount, 0);
    return { month, Income: monthIncome, Expense: monthExpense };
  });

  // Top 5 expenses
  const topExpenses = transactions
    .filter((t) => t.type === "Expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 space-y-12">
      {/* Main Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-5xl p-6"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          My Financial Dashboard
        </h2>

        {/* Pie Chart */}
        <div className="w-full h-80 mb-8">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={[
                  { name: "Income", value: incomeTotal },
                  { name: "Expense", value: expenseTotal },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
                animationDuration={800}
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
              <Tooltip formatter={(value) => `TK ${value}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-green-100/60 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <p className="text-gray-600 text-sm">Total Income</p>
            <p className="text-green-700 font-bold text-2xl">TK {incomeTotal}</p>
          </div>
          <div className="bg-red-100/60 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <p className="text-gray-600 text-sm">Total Expense</p>
            <p className="text-red-700 font-bold text-2xl">TK {expenseTotal}</p>
          </div>
          <div className="bg-indigo-100/60 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <p className="text-gray-600 text-sm">Balance</p>
            <p className="text-indigo-700 font-bold text-2xl">TK {balance}</p>
          </div>
        </motion.div>

        {/* Monthly Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold mb-4 text-center">
            Monthly Income vs Expense
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `TK ${value}`} />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="Income"
                fill="#4caf50"
                radius={[8, 8, 0, 0]}
                barSize={18}
              />
              <Bar
                dataKey="Expense"
                fill="#f44336"
                radius={[8, 8, 0, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top 5 Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold mb-4 text-center">
            Top 5 Expenses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topExpenses.map((tx) => (
              <motion.div
                key={tx._id}
                whileHover={{ scale: 1.05 }}
                className="bg-red-50 p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <p className="font-semibold text-red-700">{tx.category}</p>
                <p className="text-red-600 font-bold">TK {tx.amount}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(tx.date).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyReport;
