const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Transaction = require("../models/Transaction");

const categoryController = {

  //! CREATE
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
      throw new Error("Name and type are required");
    }

    const normalizedName = name.toLowerCase();

    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type");
    }

    const exists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });

    if (exists) {
      throw new Error(`Category ${exists.name} already exists`);
    }

    const newCategory = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });

    res.status(201).json(newCategory);
  }),

  //! LIST
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),

  //! UPDATE
  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;

    const category = await Category.findById(id);

    if (!category || category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or unauthorized");
    }

    const oldName = category.name;

    if (name) category.name = name.toLowerCase();
    if (type) category.type = type;

    const updatedCategory = await category.save();

    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        { user: req.user, category: oldName },
        { $set: { category: updatedCategory.name } }
      );
    }

    res.json(updatedCategory);
  }),

  //! DELETE
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category || category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or unauthorized");
    }

    const defaultCategory = "Uncategorized";

    await Transaction.updateMany(
      { user: req.user, category: category.name },
      { $set: { category: defaultCategory } }
    );

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      message: "Category removed and transactions updated",
    });
  }),
};

module.exports = categoryController;