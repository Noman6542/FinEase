import React from "react";
import BudgetingTips from "./BudgetingTips";
import FinancialPlanning from "./FinancialPlanning";

const StaticSections = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <section>
        <BudgetingTips></BudgetingTips>
        <FinancialPlanning></FinancialPlanning>
      </section>
    </div>
  );
};

export default StaticSections;
