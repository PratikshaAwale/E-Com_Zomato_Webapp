import { useState } from "react";
import "./CuisinesFilter.css";

const CUISINES = [
  "Indian", "Chinese", "Pizza", "Fast Food", "Japanese",
  "Cafe", "Desserts", "Biryani", "Burger", "Sandwich"
];

const CuisinesFilter = ({ restaurants, selectedCuisines, setSelectedCuisines, applyFilters }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleCuisine = (cuisine) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleApply = () => {
    applyFilters(); 
    setOpen(false);
  };

  const filteredCuisines = CUISINES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cuisine-wrapper">
      <button className="filter-btn" onClick={() => setOpen(!open)}>
        Cuisines ▾
      </button>

      {open && (
        <div className="cuisine-dropdown">
          <input
            type="text"
            placeholder="Search cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="cuisine-search"
          />

          <div className="cuisine-list">
            {filteredCuisines.map((cuisine) => (
              <label key={cuisine}>
                <input
                  type="checkbox"
                  checked={selectedCuisines.includes(cuisine)}
                  onChange={() => toggleCuisine(cuisine)}
                />
                {cuisine}
              </label>
            ))}
          </div>

          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default CuisinesFilter;
