import React, { useContext, useMemo, useState } from "react";
import axios from "axios";
import { TransactionContext } from "../context/TransactionContext";
import { AuthContext } from "../context/AuthContext";

const TransactionTable = () => {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const { token, backendUrl } = useContext(AuthContext);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    description: "",
    type: "",
    category: "",
    date: "",
  });

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions || [];
    return (transactions || []).filter((t) => t.category === filter);
  }, [transactions, filter]);

  // Start editing
  const handleEdit = (t) => {
    setEditId(t._id);
    setEditData({
      amount: Math.abs(t.amount),
      description: t.description,
      type: t.type,
      category: t.category,
      date: new Date(t.date).toISOString().split("T")[0], // format yyyy-mm-dd
    });
  };

  // Save updated data
  const handleSave = async (id) => {
    console.log(editData);
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/transaction/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions((prev) =>
        prev.map((t) => (t._id === id ? data.transaction : t))
      );
      setEditId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`${backendUrl}/api/transaction/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditId(null);
    setEditData({
      amount: "",
      description: "",
      type: "",
      category: "",
      date: "",
    });
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

                  {/* Amount */}
                  <td
                    className={`p-3 border-b font-medium ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {editId === t._id ? (
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) =>
                          setEditData({ ...editData, amount: e.target.value })
                        }
                        className="border px-2 py-1 rounded-md w-20"
                      />
                    ) : (
                      `₹${Math.abs(t.amount)}`
                    )}
                  </td>

                  {/* Type */}
                  <td className="p-3 border-b capitalize text-gray-700">
                    {editId === t._id ? (
                      <select
                        value={editData.type}
                        onChange={(e) =>
                          setEditData({ ...editData, type: e.target.value })
                        }
                        className="border px-2 py-1 rounded-md"
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    ) : (
                      t.type
                    )}
                  </td>

                  {/* Category */}
                  <td className="p-3 border-b capitalize text-gray-700">
                    {editId === t._id ? (
                      <select
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="border px-2 py-1 rounded-md"
                      >
                        <option value="salary">Salary</option>
                        <option value="food">Food</option>
                        <option value="shopping">Shopping</option>
                        <option value="bills">Bills</option>
                        <option value="transport">Transport</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      t.category
                    )}
                  </td>

                  {/* Description */}
                  <td className="p-3 border-b text-gray-600">
                    {editId === t._id ? (
                      <input
                        type="text"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        className="border px-2 py-1 rounded-md w-full"
                      />
                    ) : (
                      t.description || "—"
                    )}
                  </td>

                  {/* Date */}
                  <td className="p-3 border-b text-gray-600">
                    {editId === t._id ? (
                      <input
                        type="date"
                        value={editData.date}
                        onChange={(e) =>
                          setEditData({ ...editData, date: e.target.value })
                        }
                        className="border px-2 py-1 rounded-md"
                      />
                    ) : (
                      new Date(t.date).toLocaleDateString()
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3 border-b text-center">
                    {editId === t._id ? (
                      <>
                        <button
                          onClick={() => handleSave(t._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(t)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </>
                    )}
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
