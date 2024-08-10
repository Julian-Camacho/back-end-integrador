const order = require("../models/order.model");

async function postOrders(req, res) {
  try {
    const ord = new order(req.body);
    const newOrder = await ord.save();
    res.status(201).send({
      ok: true,
      message: "Orden creada con éxito",
      newOrder,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudo crear la orden",
      error,
    });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await order.find();
    if (orders.length === 0) {
      return res.status(404).send({
        ok: false,
        message: "No hay órdenes para mostrar",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Órdenes obtenidas con éxito",
      orders,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "No se pudieron obtener las órdenes",
      error,
    });
  }
}

module.exports = {
  postOrders,
  getOrders,
};
