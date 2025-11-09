import React from "react";
import BudgetingTips from "./BudgetingTips";
import FinancialPlanning from "./FinancialPlanning";

const StaticSections = () => {
  return (
    <div className="max-w-5xl mx-auto my-12 px-4">
      <section>
        <BudgetingTips></BudgetingTips>
        <FinancialPlanning></FinancialPlanning>
      </section>
    </div>
  );
};

export default StaticSections;
