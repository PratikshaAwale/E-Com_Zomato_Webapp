import { useState } from "react";
import "./Filters.css";

const Filters = ({ applyFilters }) => {
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    sortBy: "",
    cost: "",
    rating: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = () => {
    applyFilters(filters); 
    setOpen(false);
  };

  return (
    <div className="filter-wrapper">
      <button className="filter-btn" onClick={() => setOpen(!open)}>
        Filters ▾
      </button>

      {open && (
        <div className="filter-dropdown">
          <label>Sort By</label>
          <select name="sortBy" onChange={handleChange}>
            <option value="">None</option>
            <option value="popularity">Popularity</option>
            <option value="ratingHigh">Rating: High to Low</option>
            <option value="costLow">Cost: Low to High</option>
            <option value="costHigh">Cost: High to Low</option>
          </select>

          <label>Cost per Person</label>
          <select name="cost" onChange={handleChange}>
            <option value="">Any</option>
            <option value="200">Below ₹200</option>
            <option value="300">Below ₹300</option>
            <option value="500">Below ₹500</option>
          </select>

          <label>Rating</label>
          <select name="rating" onChange={handleChange}>
            <option value="">Any</option>
            <option value="3">⭐ 3.0+</option>
            <option value="3.5">⭐ 3.5+</option>
            <option value="4">⭐ 4.0+</option>
            <option value="4.5">⭐ 4.5+</option>
          </select>

          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
