import { useNavigate } from "react-router-dom";
//import "./NightLifeList.css"; // 

const DiningOutList = ({ restaurants = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="restaurant-list">
      {restaurants.map((res) => (
        <div
          key={res.id}
          className="restaurant-card"
          onClick={() => navigate(`/restaurant/${res.id}`)}
        >
          <img src={res.image} alt={res.name} />

          <div className="restaurant-info">
            <div className="restaurant-header">
              <h3>{res.name}</h3>
              <span className="rating">{res.rating}★</span>
            </div>

            <p>{res.cuisine}</p>
            <p>{res.location}</p>

            <div className="restaurant-footer">
              <span>₹{res.costForTwo} for two</span>
              <span>{res.distance}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiningOutList;
