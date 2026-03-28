import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Checkout.css";

function Checkout() {
  const [cart, setCart] = useState({ items: [] });
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigate = useNavigate();

  const savedAddresses = [
    "Home - Hyderabad, 500001",
    "Work - Hyderabad, 500032",
  ];

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(res.data);
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

  const placeOrder = async () => {
  if (!selectedAddress) {
    toast.error("Please select address");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/orders/place",
      { address: selectedAddress },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Order placed successfully ✅", {
      duration: 6000,
      style: {
        background: "#1c1c1c",
        color: "#fff",
        borderRadius: "12px",
        padding: "12px 18px",
      },
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (error) {
    toast.error("Order failed. Try again.");
  }
};


  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-layout">

        {/* LEFT SIDE */}
        <div className="checkout-left">

          {/* Saved Address Card */}
          <div className="card-box">
            <h3 className="section-title">Saved Addresses</h3>

            {savedAddresses.map((addr, index) => (
              <div key={index} className="address-option">
                <input
                  type="radio"
                  name="address"
                  value={addr}
                  onChange={(e) =>
                    setSelectedAddress(e.target.value)
                  }
                />
                <label>{addr}</label>
              </div>
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="card-box">
            <h3 className="section-title">Order Summary</h3>

            {cart.items.map((item, index) => (
              <div key={index} className="order-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-image"
                />

                <div className="order-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <div className="card-box">

            <h3 className="section-title">Payment</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <div className="divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="payment-option">
              <input type="radio" checked readOnly />
              <label>Cash on Delivery</label>
            </div>

            <button
              className="place-order-btn"
              onClick={placeOrder}
            >
              Place Order
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;
