const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/add", auth, async (req, res) => {
  try {
    const { name, price, quantity, image, rating } = req.body;

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.userId,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.name === name
    );

    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;

    
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      
      if (quantity > 0) {
        cart.items.push({
          name,
          price,
          quantity,
          image,
          rating,
        });
      }
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart" });
  }
});



// GET CART
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});



// REMOVE SINGLE ITEM
router.delete("/remove/:name", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.json({ items: [] });
    }

    cart.items = cart.items.filter(
      (item) => item.name !== req.params.name
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item" });
  }
});

module.exports = router;
