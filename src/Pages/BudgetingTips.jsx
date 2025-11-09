import React from "react";
import { FaPiggyBank } from "react-icons/fa";

const BudgetingTips = () => {
  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">Budgeting Tips</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FaPiggyBank className="text-green-500 text-xl" />
              <h3 className="text-lg font-semibold">Tip 1</h3>
            </div>
            <p className="text-gray-600">
              Track all your expenses for a month to know where your money goes.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FaPiggyBank className="text-green-500 text-xl" />
              <h3 className="text-lg font-semibold">Tip 2</h3>
            </div>
            <p className="text-gray-600">
              Categorize your spending: Needs, Wants, and Savings.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FaPiggyBank className="text-green-500 text-xl" />
              <h3 className="text-lg font-semibold">Tip 3</h3>
            </div>
            <p className="text-gray-600">
              Follow the 50/30/20 rule: 50% Needs, 30% Wants, 20% Savings/Debt.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FaPiggyBank className="text-green-500 text-xl" />
              <h3 className="text-lg font-semibold">Tip 4</h3>
            </div>
            <p className="text-gray-600">
              Set monthly spending limits for each category.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FaPiggyBank className="text-green-500 text-xl" />
              <h3 className="text-lg font-semibold">Tip 5</h3>
            </div>
            <p className="text-gray-600">
              Automate your savings to pay yourself first every month.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BudgetingTips;
