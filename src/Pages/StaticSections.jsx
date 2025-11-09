import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

const StaticSections = () => {
  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      {/* Section Title */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">
          Financial Insights
        </h2>

        {/* Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-md rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <FiAlertTriangle className="text-yellow-500 text-xl" />
                <h2 className="text-lg font-semibold">
                  Why Financial Planning Matters
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Financial planning provides a roadmap to your goals — whether
                it's buying a house or retiring early. It minimizes stress,
                prepares you for emergencies like job loss or health issues, and
                helps you grow wealth over time through disciplined investment.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-md rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <FaBookOpen className="text-blue-500 text-xl" />
                <h2 className="text-lg font-semibold">Budgeting Tips</h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Start by tracking every expense for a month. Categorize your
                spending to find areas for reduction. Follow the 50/30/20 rule:
                50% for needs, 30% for wants, and 20% for savings or debt
                payments. Automate your savings to make consistency easier.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StaticSections;
