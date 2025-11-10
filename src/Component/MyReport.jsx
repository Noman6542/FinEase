import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PacmanLoader } from "react-spinners";

const MyReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

  useEffect(() => {
    fetch("http://localhost:3000/report")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching report:", err));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#5e5feb" size={25} />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          My Expense Report
        </h2>

        {data.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Total Spent:{" "}
                <span className="font-semibold text-indigo-600">
                  TK {data.reduce((sum, item) => sum + item.value, 0)}
                </span>
              </p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default MyReport;
