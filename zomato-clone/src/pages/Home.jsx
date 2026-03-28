import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import restaurantsData from "../data/restaurants";
import FAQ from "../components/FAQ";
import Filters from "../components/Filters";
import CuisinesFilter from "../components/CuisinesFilter";
import diningOutRestaurants from "../data/diningOutRestaurants";
import DiningOutList from "../components/DiningOutList";
import nightLifeRestaurants from "../data/nightLifeRestaurants";
import NightLifeList from "../components/NightLifeList";
import Inspiration from "../components/Inspiration";
import "./Home.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "delivery"
  );

  const [searchText, setSearchText] = useState("");

  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [diningRestaurants, setDiningRestaurants] = useState(diningOutRestaurants);
  const [nightlifeRestaurantsState, setNightlifeRestaurantsState] =
    useState(nightLifeRestaurants);

  const [selectedCuisines, setSelectedCuisines] = useState([]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // ✅ SAFE COMMON FILTER
  const applyCommonFilters = (data, sortBy, cost, search = "") => {
    let filtered = [...data];

    if (search.trim() !== "") {
      const query = search.toLowerCase();
      filtered = filtered.filter((r) => {
        const name = r.name?.toLowerCase() || "";
        const cuisine = r.cuisine?.toLowerCase() || "";
        return name.includes(query) || cuisine.includes(query);
      });
    }

    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((r) =>
        selectedCuisines.includes(r.cuisine)
      );
    }

    if (cost) {
      filtered = filtered.filter(
        (r) => r.costPerPerson <= Number(cost)
      );
    }

    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  // ✅ DELIVERY FILTER HANDLER
  const applyFilters = (sortBy, cost) => {
  setRestaurants(
    applyCommonFilters(
      restaurantsData,
      sortBy,
      cost,
      searchText
    )
  );
  };


  // 🔍 SEARCH HANDLER
  const handleSearch = (text) => {
    setSearchText(text);

    if (activeTab === "delivery") {
      setRestaurants(
        applyCommonFilters(restaurantsData, null, null, text)
      );
    }

    if (activeTab === "dining") {
      setDiningRestaurants(
        applyCommonFilters(diningOutRestaurants, null, null, text)
      );
    }

    if (activeTab === "nightlife") {
      setNightlifeRestaurantsState(
        applyCommonFilters(nightLifeRestaurants, null, null, text)
      );
    }
  };

  return (
    <div>
      <Header onSearch={handleSearch} />

      {/* TABS */}
      <div className="tabs-container">
        {["dining", "delivery", "nightlife"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => {
              setActiveTab(tab);
              setSearchParams({ tab });
              handleSearch(searchText);
            }}
          >
            {tab === "dining" ? "Dining Out" : tab === "delivery" ? "Delivery" : "Nightlife"}
          </button>
        ))}
      </div>

      {activeTab === "delivery" && (
        <>
          <div style={{ 
            padding: "10px 40px", 
            display: "flex", 
            gap: "15px", 
            flexWrap: "wrap",
          }} > 
            <Filters applyFilters={applyFilters} />
             <CuisinesFilter restaurants={restaurantsData} selectedCuisines={selectedCuisines} setSelectedCuisines={setSelectedCuisines} 
             applyFilters={applyFilters} /> 
            </div> 

             <div style={{ padding: "20px 40px 10px" }}> 
              <h2 style={{ 
                fontSize: "28px", 
                fontWeight: "600", 
                color: "#1c1c1c", 
                margin: 0,
               }} >
                 Food Delivery Restaurants in Hyderabad </h2> 
              </div>
          <RestaurantList restaurants={restaurants} />
          <FAQ />
        </>
      )}

      {activeTab === "dining" && (
        <>
          <div style={{ 
          padding: "10px 40px", 
          display: "flex", 
          gap: "15px", 
          flexWrap: "wrap", 
          }} 
        > 
        <Filters applyFilters={(sortBy, cost) => 
          setDiningRestaurants( applyCommonFilters(diningOutRestaurants, sortBy, cost) )
           } 
          /> 
        <CuisinesFilter restaurants={diningOutRestaurants} 
        selectedCuisines={selectedCuisines} 
        setSelectedCuisines={setSelectedCuisines} 
        applyFilters={(sortBy, cost) => 
        setDiningRestaurants( applyCommonFilters(diningOutRestaurants, sortBy, cost) )
         } 
        /> 
      </div>

          <Inspiration />

          <div style={{ padding: "20px 40px 10px" }}>
       <h2 style={{
         fontSize: "28px", 
         fontWeight: "600", 
         color: "#1c1c1c", 
         margin: 0, 
        }} 
      > 
            Food Delivery Restaurants in Hyderabad
      </h2> 
    </div>
          <DiningOutList restaurants={diningRestaurants} />
          <FAQ />
        </>
      )}

      {activeTab === "nightlife" && (
        <>
          <div style={{ 
            padding: "10px 40px", 
            display: "flex", 
            gap: "15px", 
            flexWrap: "wrap", 
            }} 
          > 
        <Filters applyFilters={(sortBy, cost) => 
          setNightlifeRestaurantsState( applyCommonFilters(nightLifeRestaurants, sortBy, cost) )
           } 
        /> 
        <CuisinesFilter restaurants={nightLifeRestaurants} 
        selectedCuisines={selectedCuisines} 
        setSelectedCuisines={setSelectedCuisines} 
        applyFilters={(sortBy, cost) => 
        setNightlifeRestaurantsState( applyCommonFilters(nightLifeRestaurants, sortBy, cost) )
         } 
        />
     </div> 
     <div style={{ padding: "20px 40px 10px" }}>
       <h2 style={{
         fontSize: "28px", 
         fontWeight: "600", 
         color: "#1c1c1c", 
         margin: 0, 
        }} 
      > 
            Nightlife: Night clubs, pubs and bar in Hyderabad 
      </h2> 
    </div>
          <NightLifeList restaurants={nightlifeRestaurantsState} />
          <FAQ />
        </>
      )}
    </div>
  );
};

export default Home;
