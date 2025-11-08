import Transaction from "../models/TransactionModel.js";

// transactionController.js - Improved version
export const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;
    const userId = req.user; // Consistent user ID

    if (!amount || !category || !type || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    const finalAmount = type === "income" ? amount : -amount;

    const transaction = new Transaction({
      userId,
      amount: finalAmount,
      type,
      category,
      description: description || "",
      date: new Date(date),
    });

    await transaction.save();
    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction
    });
  } catch (error) {
    console.error("Add transaction error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const userId = req.user;
    const { category, type, page = 1, limit = 10 } = req.query;

    let filter = { userId };

    if (category && category !== "all") {
      filter.category = category;
    }

    if (type && type !== "all") {
      filter.type = type;
    }

    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      success: true,
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};




export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { amount, description, date, category, type } = req.body;

    // console.log(description)

    const userId = req.user;

    console.log(userId);

    const transaction = await Transaction.findOne({ _id: id, userId });

    console.log(transaction);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.amount =
      type === "income" ? Math.abs(amount) : -Math.abs(amount);
    transaction.description = description;
    transaction.date = date;
    transaction.category = category;
    transaction.type = type;

    await transaction.save();

    res.json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTransactionSummary = async (req, res) => {
  try {
    const userId = req.user;

    const transactions = await Transaction.find({ userId });

    // Calculate totals
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const balance = totalIncome - totalExpenses;

    // Category-wise breakdown
    const categoryData = {};
    transactions.forEach((transaction) => {
      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = 0;
      }
      categoryData[transaction.category] += Math.abs(transaction.amount);
    });

    res.json({
      success: true,
      summary: {
        balance,
        totalIncome,
        totalExpenses,
        categoryData,
      },
    });
  } catch (error) {
    console.error("Get summary error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    // Find and delete only the user's transaction
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      deletedTransaction: transaction,
    });
  } catch (error) {
    console.error("Delete transaction error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};
