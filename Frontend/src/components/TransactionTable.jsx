import React, { useContext, useMemo, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionTable = () => {
  const { transactions } = useContext(TransactionContext);
  const [filter, setFilter] = useState("all");

  
  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions || [];
    return (transactions || []).filter((t) => t.category === filter);
  }, [transactions, filter]);

  const handleEdit = (id) => {
    alert(`✏️ Edit feature for transaction ID: ${id} (coming soon)`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      alert(`🗑️ Deleted transaction ID: ${id} (delete logic here)`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Transaction History
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="salary">Salary</option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="bills">Bills</option>
          <option value="transport">Transport</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Type</th>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t, index) => (
                <tr
                  key={t._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="p-3 border-b text-gray-600">{index + 1}</td>

                  <td
                    className={`p-3 border-b font-medium ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{t.amount}
                  </td>

                  <td className="p-3 border-b capitalize text-gray-700">
                    {t.type}
                  </td>

                  <td className="p-3 border-b capitalize text-gray-700">
                    {t.category}
                  </td>

                  <td className="p-3 border-b text-gray-600">
                    {t.description || "—"}
                  </td>

                  <td className="p-3 border-b text-gray-600">
                    {new Date(t.date).toLocaleDateString()}
                  </td>

                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleEdit(t._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md mr-2 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-5 text-center text-gray-500 italic"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
