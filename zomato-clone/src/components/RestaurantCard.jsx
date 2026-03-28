import { useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const addToCart = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userId: user._id,
          name: restaurant.name,
          price: restaurant.costPerPerson || 200,
          quantity: 1,
          image: restaurant.image,
          rating: restaurant.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="card">
        <img src={restaurant.image} alt={restaurant.name} />
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisine}</p>
        <span>⭐ {restaurant.rating}</span>

        {/*<button className="add-btn" onClick={addToCart}>
         // Add to Cart
        //</button>*/}
      </div>
    </div>
  );
};

export default RestaurantCard;
