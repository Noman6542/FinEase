import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const FinancialPlanning = () => {
  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">
          Why Financial Planning Matters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FiAlertTriangle className="text-yellow-500 text-xl" />
              <h3 className="text-lg font-semibold">Roadmap to Goals</h3>
            </div>
            <p className="text-gray-600">
              Financial planning provides a roadmap to your goals, whether it’s
              buying a house or retiring early.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FiAlertTriangle className="text-yellow-500 text-xl" />
              <h3 className="text-lg font-semibold">Emergency Preparedness</h3>
            </div>
            <p className="text-gray-600">
              It prepares you for emergencies like job loss, health issues, or
              unexpected expenses.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FiAlertTriangle className="text-yellow-500 text-xl" />
              <h3 className="text-lg font-semibold">Maximize Wealth</h3>
            </div>
            <p className="text-gray-600">
              Proper planning helps you maximize wealth over time through
              disciplined saving and investment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialPlanning;
