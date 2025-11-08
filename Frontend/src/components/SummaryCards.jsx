import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const SummaryCards = () => {
  const { summary } = useContext(TransactionContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-100 p-6 rounded-lg">
        <h3 className="text-sm text-gray-700">Total Income</h3>
        <p className="text-2xl font-bold text-green-700">
          ₹{summary.totalIncome}
        </p>
      </div>

      <div className="bg-red-100 p-6 rounded-lg">
        <h3 className="text-sm text-gray-700">Total Expense</h3>
        <p className="text-2xl font-bold text-red-700">
          ₹{summary.totalExpenses}
        </p>
      </div>

      <div className="bg-blue-100 p-6 rounded-lg">
        <h3 className="text-sm text-gray-700">Balance</h3>
        <p className="text-2xl font-bold text-blue-700">
          ₹{summary.balance}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
