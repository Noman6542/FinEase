import React, { use, useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { AuthContext } from "../Provider/AuthProvider";

const FinancialOverview = () => {
  const {user}=use(AuthContext);
  const [overview, setOverview] = useState(null); 
  const [loading, setLoading] = useState(true); 

   useEffect(() => {
    if (user) { 
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
    } else {
      setOverview(null);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return  <div className="flex justify-center items-center h-screen">
        <ClimbingBoxLoader color="#5e5feb" size={20} />
      </div>};

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Financial Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Balance */}
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold">Total Balance</h3>
          <p className="text-2xl font-bold text-green-600">
            TK. {user && overview ? overview.balance : 0}
          </p>
        </div>

        {/*  Income */}
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold">Total Income</h3>
          <p className="text-2xl font-bold text-blue-600">
            TK. {user && overview ? overview.income : 0}
          </p>
        </div>

        {/* Expense */}
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold">Total Expense</h3>
          <p className="text-2xl font-bold text-red-600">
            TK. {user && overview ? overview.expense : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;