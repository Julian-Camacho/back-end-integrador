const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            price: {
                type: Number,
                required: true,
                min: 1,
                max: 10000000,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                max: 1000,
            },
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Pendiente", "Confirmado", "Enviado", "Entregado"],
        default: "Pendiente",
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Order", orderSchema);