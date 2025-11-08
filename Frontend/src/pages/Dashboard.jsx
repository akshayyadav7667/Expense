import React from "react";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import CategoryPieChart from "../components/CategoryPieChart";
import AddTransaction from "../components/AddTransaction";
import TransactionTable from "../components/TransactionTable";

export default function Dashboard() {
  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <SummaryCards />

        {/* Add Transaction + Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AddTransaction />
          <CategoryPieChart />
        </div>

        {/* Transaction Table */}
        <TransactionTable />
      </div>

      {/* header components  for login user */}

      {/* components to showing the overall summary of transactions */}

      {/* components to form the income or expense  */}

      {/* in side pic charts for categroy , (food, salary, transports, biils, shopping, others ) */}

      {/* tables for showings all the records to show all the tranastion , appy filerring based on categroy  */}
    </div>
  );
}
