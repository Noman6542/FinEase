import React, { useEffect, useState, use } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PacmanLoader } from "react-spinners";
import { AuthContext } from "../Provider/AuthProvider";

const MyReport = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#4caf50", "#f44336"];

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/finease-data?userEmail=${user.email}`)
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#5e5feb" size={25} />
      </div>
    );

  if (transactions.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">My Expense Report</h2>
          <p className="text-gray-500">No transactions found</p>
        </div>
      </div>
    );

  const incomeTotal = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = [
    { name: "Income", value: incomeTotal },
    { name: "Expense", value: expenseTotal },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">My Expense Report</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>

        <div className="text-center mt-4 space-y-1">
          <p>
            Total Income: <span className="text-green-600 font-semibold">TK {incomeTotal}</span>
          </p>
          <p>
            Total Expense: <span className="text-red-600 font-semibold">TK {expenseTotal}</span>
          </p>
          <p>
            Balance: <span className="text-indigo-600 font-bold">{incomeTotal - expenseTotal}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyReport;
