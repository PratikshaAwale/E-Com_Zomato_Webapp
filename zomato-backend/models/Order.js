const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      rating: String,
    },
  ],
  address: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: "Cash on Delivery",
  },
  orderStatus: {
    type: String,
    default: "Placed",
  },
  date: {
    type: Date,
    default: Date.now,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
