import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { TransactionContext } from "../context/TransactionContext";

const AddTransaction = () => {
  const { token, backendUrl } = useContext(AuthContext);
  const { fetchTransactions } = useContext(TransactionContext);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
    category: "other",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/transaction/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        alert("✅ Transaction added successfully!");
        setFormData({
          amount: "",
          type: "income",
          category: "other",
          description: "",
          date: "",
        });
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert(error.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add New Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. receive money, send to friends..."
            required
            className="border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
            className="border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="salary">Salary</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="transport">Transport</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-600 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "  bg-gradient-to-br from-blue-300 to-blue-500  bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2.5 rounded-lg md:col-span-2 font-semibold mt-2 transition`}
        >
          {loading ? "Adding..." : "➕ Add Transaction"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
