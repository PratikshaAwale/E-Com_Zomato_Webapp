import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <span>Order ID: {order._id.slice(-6)}</span>
              <span className="status">{order.orderStatus}</span>
            </div>

            {order.items.map((item, i) => (
              <div key={i} className="order-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-img"
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}

            <div className="order-footer">
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p className="order-date">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
