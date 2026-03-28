import { useParams } from "react-router-dom";
import { useState } from "react";
import "./RestaurantDetails.css";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";


const restaurantData = [
  {
    id: "1",
    name: "Burger King",
    cuisine: "Burger, Fast Food, Beverages",
    address:
      "Unit F10, Plot 1-8-557 & 1-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "1,725",
    image:"https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: "2",
    name: "Dominos Pizza",
    cuisine: "Pizza, Fast Food, Beverages",
    address:
      "Unit F10, Plot 1-8-557 & 1-8-577/A, Relainace Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 845678923",
    diningRating: "4.5",
    deliveryRating: "4.6",
    reviews: "2,725",
    image: "https://www.bing.com/th/id/OIP.RshZ9O7tlxkAWPuF7jKJxwHaE9?w=240&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",

  },
  {
    id: "3",
    name: "Biryani House",
    cuisine: "Biryani, Indian Food, Beverages",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "1,725",
    image: "https://www.bing.com/th/id/OIP.AXoG2pc0iDUX9CCycGeM8QHaLH?w=160&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",

  },
  {
    id: "4",
    name: "Sushi World",
    cuisine: "Sushi, chinesse Food, Beverages",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.4",
    deliveryRating: "4.1",
    reviews: "1,725",
    image: "https://www.bing.com/th/id/OIP.Wb_0LjuGTil4n2-8Mzm9oQHaE7?w=263&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",

  },
  {
    id: "6",
    name: "Taco Piseta",
    cuisine: "Piseata, Maxican Food, Beverages",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "1,725",
    image: "https://www.bing.com/th/id/OIP.VvpfJGlnFWwa6ht_piH5AAHaHa?w=226&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",

  },
  {
    id: "7",
    name: "Green Salad Bar",
    cuisine: "Green salad, Healthy Food, Beverages",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "4,725",
    image: "https://www.bing.com/th/id/OIP.mZ-pvucNg94qtCcjcLz7ywHaE9?w=344&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
,
  },
  {
    id: "101",
    name: "TOS Club",
    cuisine: "TOS Pub, Bar, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "3.5",
    deliveryRating: "4.1",
    reviews: "1,725",
    image: "https://www.bing.com/th/id/OIP.joXDRDhTKKXnAGGuBEMZRQHaE8?w=220&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
,
  },
  {
    id: "102",
    name: "Aviz Kitchen and Bar",
    cuisine: "Pub, Bar, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "3.5",
    deliveryRating: "4.1",
    reviews: "1,725",
    image: "https://www.bing.com/th/id/OIP.EyRCSk1MGCtTJvfxaLZRWgHaE8?w=284&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
,
  },
  {
    id: "103",
    name: "AnTeRa Kitchen and Bar",
    cuisine: "Pub, Bar, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "3.5",
    deliveryRating: "4.1",
    reviews: "1,725",
    image: "https://www.bing.com/th/id/OIP.e3JjNZ_GXKZc7yW8bq60aAHaHa?w=200&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
,
  },
  {
    id: "201",
    name: "Chineese House",
    cuisine: "Chineese,Fast Food, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.7",
    deliveryRating: "4.1",
    reviews: "5,725",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
,
  },
  {
    id: "202",
    name: "Pakka Local",
    cuisine: "Pakka Local,Fast Food, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "3.5",
    deliveryRating: "4.1",
    reviews: "1,725",
    image: "https://www.bing.com/th/id/OIP.dvWcxyhPWEdz9oiDzsgaIAHaFs?w=256&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
,
  },
  {
    id: "203",
    name: "Habitat Cafe",
    cuisine: "Coffee/icecream/tea/Burger/Pizza,Cafe, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "8,725",
    image: "https://www.bing.com/th/id/OIP.e3JjNZ_GXKZc7yW8bq60aAHaHa?w=200&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
,
  },
  {
    id: "204",
    name: "7 Sisters",
    cuisine: "Chinese,Biryani,Momos, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "8,725",
    image:"https://th.bing.com/th/id/OIP.znXT1g73WtYrRh4si5W97QHaE5?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
,
  },
  {
    id: "205",
    name: "Kinara Grand",
    cuisine: "Sea Food, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "8,725",
    image: "https://th.bing.com/th/id/OIP.fXw5LIgRfzSkexSi3B3d8wHaE7?w=246&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
,
  },
  {
    id: "206",
    name: "Telanagana Spicy Kitchen",
    cuisine: "Biryani,Fast Food, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "8,725",
    image: " https://th.bing.com/th/id/OIP.h4fnlqwbTKjo7ut9D-1scQHaEe?w=284&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
,
  },
    {
    id: "104",
    name: "7 Sisters",
    cuisine: "Chinese,Biryani,Momos, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "8,725",
    image:"https://th.bing.com/th/id/OIP.znXT1g73WtYrRh4si5W97QHaE5?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
,
  },
  {
    id: "105",
    name: "Kinara Grand",
    cuisine: "Sea Food, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "8,725",
    image: "https://th.bing.com/th/id/OIP.fXw5LIgRfzSkexSi3B3d8wHaE7?w=246&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
,
  },
  {
    id: "106",
    name: "Telanagana Spicy Kitchen",
    cuisine: "Biryani,Fast Food, Hydrabad",
    address:
      "Unit F11, Plot 2-8-557 & 2-8-577/A, Odeon Mall, Hyderabad",
    open: "Open now · 10am – 12midnight",
    phone: "+91 8657981342",
    diningRating: "4.5",
    deliveryRating: "4.1",
    reviews: "8,725",
    image: " https://th.bing.com/th/id/OIP.h4fnlqwbTKjo7ut9D-1scQHaEe?w=284&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
,
  },
];

const RestaurantDetails = () => {

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const restaurant = restaurantData.find(r => r.id === id);

// ✅ ADD THIS FUNCTION HERE (before return)
const addToCart = async () => {
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
    name: restaurant.name,
    price: restaurant.costPerPerson || 200,
    quantity: 1,
    image: restaurant.image,
    rating: restaurant.diningRating,
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



  if (!restaurant) return <h2>Restaurant not found</h2>;

  return (
    <div className="restaurant-details">

      <div className="details-header">
        <div>
          <h1>{restaurant.name}</h1>
          <p className="cuisine">{restaurant.cuisine}</p>
          <p className="address">{restaurant.address}</p>
          <p className="open">{restaurant.open}</p>
          <p className="phone">📞 {restaurant.phone}</p>
        </div>

        <div className="ratings">
          <div className="rating-box">
            <span>{restaurant.diningRating}★</span>
            <p>Dining Ratings</p>
          </div>
          <div className="rating-box green">
            <span>{restaurant.deliveryRating}★</span>
            <p>{restaurant.reviews} Delivery Ratings</p>
          </div>
        </div>
      </div>



  {/* RESTAURANT IMAGE GALLERY */}
<div className="restaurant-gallery">
  <div className="gallery-left">
    <img
  src={restaurant.image}
  alt={restaurant.name}
/>

  </div>
</div>

{/* ZOMATO STYLE NAV TABS */}
<div className="restaurant-tabs">
  <span
    className={`tab ${activeTab === "Overview" ? "active" : ""}`}
    onClick={() => setActiveTab("Overview")}
  >
    Overview
  </span>

  <span
    className={`tab ${activeTab === "Direction" ? "active" : ""}`}
    onClick={() => setActiveTab("Direction")}
  >
    Direction
  </span>

  <span
    className={`tab ${activeTab === "Reviews" ? "active" : ""}`}
    onClick={() => setActiveTab("Reviews")}
  >
    Reviews
  </span>
</div>


{activeTab === "Reviews" && (
  <div className="reviews-section">
    <h4>Related to Burger King, Musheerabad </h4>
    <p className="reviews-links">
      Restaurants in Hyderabad, Hyderabad Restaurants, Musheerabad restaurants,
      Best Musheerabad restaurants, Hyderabad City restaurants, Quick Bites in
      Hyderabad, Quick Bites near me, Quick Bites in Hyderabad City
    </p>

    <h4>RESTAURANTS AROUND MUSHEERABAD</h4>
    <p className="reviews-links">
      Padmarao Nagar restaurants, Boiguda restaurants,
      Adikmet restaurants, Rani Gunj restaurants
    </p>

    <h4>FREQUENT SEARCHES LEADING TO THIS PAGE</h4>
    <p className="reviews-links">
      {restaurant.name.toLowerCase()} menu, {restaurant.name.toLowerCase()}{" "}
      hyderabad, {restaurant.name.toLowerCase()} reviews
    </p>

    <h4>TOP STORES</h4>
    <p className="reviews-links">
      L B Nagar, Chanda Nagar, Malakpet, Tolichowki,
      Attapur, Habsiguda, Medchal Road
    </p>

  </div>
)}



{activeTab === "Direction" && (
  <div className="direction-section">
    <h2>Direction</h2>
    <p>{restaurant.address}</p>

    <div className="map-container">
      <iframe
        title="map"
        src="https://www.google.com/maps?q=Odeon Mall Hyderabad&output=embed"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  </div>
)}
      <div className="action-buttons">
  <button className="order-btn">Place Order</button>

  <button
    className="cart-btn"
    onClick={async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      try {
        await axios.post(
          "http://localhost:5000/api/cart/add",
          {
            name: restaurant.name,
            price: restaurant.costPerPerson || 200,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Added to cart");
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Failed to add to cart");
      }
    }}
  >
    Add to Cart
  </button>
</div>


    </div>
  );
};

export default RestaurantDetails;
