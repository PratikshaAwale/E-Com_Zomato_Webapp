const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// PLACE ORDER
router.post("/place", auth, async (req, res) => {
  try {
    const { address } = req.body;

    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) + 40;

    const newOrder = new Order({
      userId: req.userId,
      items: cart.items,
      address,
      total,
      paymentMethod: "Cash on Delivery",
      orderStatus: "Placed",
    });

    await newOrder.save();



    // Clear cart after order
    await Cart.deleteOne({ userId: req.userId });

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order failed" });
  }
});

// GET USER ORDERS
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});


module.exports = router;
