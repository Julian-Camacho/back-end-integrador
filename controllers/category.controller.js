const category = require("../models/category.model");

async function getCategories(req, res) {
  try {
    const categories = await category.find();
    if (categories.length === 0) {
      return res.status(404).send({
        ok: false,
        message: "No hay categorías para mostrar",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Categorías obtenidas con éxito",
      categories,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudieron obtener las categorías",
      error,
    });
  }
}

async function createCategory(req, res) {
  try {
    const cat = new category(req.body);
    const newCategory = await cat.save();
    res.status(201).send({
      ok: true,
      message: "Categoría creada con éxito",
      newCategory,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudo crear la categoría",
      error,
    });
  }
}

module.exports = {
  getCategories,
  createCategory,
};
