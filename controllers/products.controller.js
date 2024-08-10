const product = require("../models/products.model");

async function getProducts(req, res) {
  try {
    const products = await product.find();
    res.status(200).send({
      ok: true,
      message: "Productos obtenidos con éxito",
      products,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudieron obtener los productos",
      error,
    });
  }
}

async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await product.findById(id);
    if (!product) {
      return res.status(404).send({
        ok: false,
        message: "Producto no encontrado",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Producto obtenido con éxito",
      product,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudo obtener el producto",
      error,
    });
  }
}

async function createProduct(req, res) {
  try {
    const product = new product(req.body);
    if (req.file?.filename) {
      product.picture = req.file.filename;
    }
    const newProduct = await product.save();
    res.status(201).send({
      ok: true,
      message: "Producto creado con éxito",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudo crear el producto",
      error,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const newProduct = req.body;
    if (req.file?.filename) {
      newProduct.picture = req.file.filename;
    } else {
      delete newProduct.picture;
    }
    const updatedProduct = await product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).send({
        ok: false,
        message: "Producto no encontrado",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Producto actualizado con éxito",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudo actualizar el producto",
      error,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const deletedProduct = await product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send({
        ok: false,
        message: "Producto no encontrado",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Producto eliminado con éxito",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudo eliminar el producto",
      error,
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
