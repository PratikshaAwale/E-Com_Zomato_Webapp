import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  // 🔁 Load cart on login
  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setCart(res.data.items || []);
    });
  }, [token]);

  // ➕ Add to cart
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);

    axios.post(
      "http://localhost:5000/api/cart",
      { items: updatedCart },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
