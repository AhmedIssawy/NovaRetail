import Category from "../models/category.model.js";

const GetCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(400).json("Get Categories Failed");
  }
};

const AddCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json("POST Categories Failed");
  }
};

const EditCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findById(id);
    if (category) {
      category.name = name;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).json("Category not found");
    }
  } catch (err) {
    res.status(400).json("Edit Categories Failed");
  }
};

const DeleteCategory = async (req, res) => {U
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (category) {
      await category.deleteOne();
      res.status(200).json("Category deleted");
    } else {
      res.status(404).json("There is no category with this ID");
    }
  } catch {
    res.status(400).json("DELETE Categories Failed");
  }
};

export { GetCategories, AddCategory, EditCategory, DeleteCategory };
