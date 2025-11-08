import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {
  const { token, backendUrl } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    categoryData: {},
  });

  // ✅ Fetch Summary Data
  const fetchTransactions = async () => {
    try {
      if (token) {
        const { data } = await axios.get(
          `${backendUrl}/api/transaction/summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //   console.log("Fetched data:", data);

        if (data.success && data.summary) {
          setSummary({
            balance: data.summary.balance || 0,
            totalIncome: data.summary.totalIncome || 0,
            totalExpenses: data.summary.totalExpenses || 0,
            categoryData: data.summary.categoryData || {},
          });
        }
      }
    } catch (error) {
      console.error(
        "Error fetching transactions:",
        error.response?.data || error.message
      );
    }
  };

  const fetchTransactionDetails = async () => {
    try {
      if (token) {
        const { data } = await axios.get(`${backendUrl}/api/transaction`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        //   console.log(data);

        if (data.success) {
          setTransactions(data.transactions || []); // ✅ Correct
        } else {
          setTransactions([]);
        }
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchTransactionDetails();
  }, [token, backendUrl]);

  const value = {
    summary, 
    fetchTransactions,
    transactions,
    setTransactions
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
