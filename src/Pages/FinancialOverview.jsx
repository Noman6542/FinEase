import React, { useEffect, useState } from "react";

const FinancialOverview = () => {
  const [overview, setOverview] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
   
    fetch("http://localhost:3000/overview")
      .then(res => res.json())
      .then(data => {
        setOverview(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading overview...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Financial Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Balance */}
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold">Total Balance</h3>
          <p className="text-2xl font-bold text-green-600">
            TK. {overview?.balance}
          </p>
        </div>

        {/*  Income */}
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold">Total Income</h3>
          <p className="text-2xl font-bold text-blue-600">
            TK. {overview?.income}
          </p>
        </div>

        {/* Expense */}
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold">Total Expense</h3>
          <p className="text-2xl font-bold text-red-600">
            TK. {overview?.expense}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
