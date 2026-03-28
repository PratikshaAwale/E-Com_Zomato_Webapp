import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    fetchCart();
  }, []);

  //  FETCH CART
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE QUANTITY (correct way)
  const updateQuantity = async (item, type) => {
    try {
      const token = localStorage.getItem("token");

      if (type === "inc") {
        await axios.post(
          "http://localhost:5000/api/cart/add",
          {
            name: item.name,
            price: item.price,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (type === "dec") {
        if (item.quantity <= 1) return;

        await axios.post(
          "http://localhost:5000/api/cart/add",
          {
            name: item.name,
            price: item.price,
            quantity: -1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  //  REMOVE ITEM
  const removeItem = async (name) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/cart/remove/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-container">
      {/*FIXED HEADER */}
      <div className="cart-header">
        <h2>Delivery Cart</h2>
        <p className="cart-user">
          {user?.email ? user.email : "Guest User"}
        </p>
      </div>

      <div className="cart-layout">
        {/* LEFT SIDE */}
        <div className="cart-items">
          {cart.items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.items.map((item, index) => (
              <div key={index} className="cart-card">
                <img
                  src={
                    item.image
                      ? item.image
                      : "https://via.placeholder.com/120"
                  }
                  alt={item.name}
                  className="cart-image"
                />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="cart-price">
                    ₹{item.price}
                  </p>

                  <div className="quantity-box">
                    <button
                      onClick={() =>
                        updateQuantity(item, "dec")
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item, "inc")
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.name)
                    }
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="checkout-btn"
              onClick={() => navigate("/checkout")}
          >
              Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
