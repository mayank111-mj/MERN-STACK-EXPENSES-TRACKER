const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Transaction = require("../models/Transaction");

const transactionController = {
  //! ADD
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    if (!amount || !type || !date) {
      res.status(400);
      throw new Error("Type, amount and date are required");
    }

    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      date,
      description,
    });

    res.status(201).json(transaction);
  }),

  //! LIST / FILTER
  getFilteredTransaction: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;

    let filters = { user: req.user };

    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }

    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }

    if (type) {
      filters.type = type;
    }

    if (category) {
      if (category === "All") {
        // no filter
      } else if (category === "uncategorized") {
        filters.category = "uncategorized";
      } else {
        filters.category = category;
      }
    }

    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),

  //! UPDATE
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (
      transaction &&
      transaction.user.toString() === req.user.toString()
    ) {
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description =
        req.body.description || transaction.description;

      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    } else {
      res.status(404);
      throw new Error("Transaction not found or unauthorized");
    }
  }),

  //! DELETE
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (
      transaction &&
      transaction.user.toString() === req.user.toString()
    ) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction removed" });
    } else {
      res.status(404);
      throw new Error("Transaction not found or unauthorized");
    }
  }),
};

module.exports = transactionController;