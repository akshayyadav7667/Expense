import React, { useContext, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TransactionContext } from "../context/TransactionContext";

const COLORS = ["#4CAF50", "#FF5733", "#FFC107", "#2196F3", "#9C27B0", "#E91E63"];

const CategoryPieChart = () => {
  const { summary } = useContext(TransactionContext);

  // convert categoryData object -> array for recharts
  const chartData = useMemo(() => {
    if (!summary?.categoryData) return [];

    return Object.entries(summary.categoryData).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));
  }, [summary]);

  if (!chartData.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-gray-500">No category data available</h2>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
        Expense Distribution by Category
      </h2>
      <div className="w-full h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;
