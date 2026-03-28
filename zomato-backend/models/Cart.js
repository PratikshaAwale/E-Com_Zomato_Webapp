const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
      rating: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
