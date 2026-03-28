import RestaurantCard from "./RestaurantCard";

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="card-container">
      {restaurants.map((res) => (
        <RestaurantCard key={res.id} restaurant={res} />
      ))}
    </div>
  );
};

export default RestaurantList;
