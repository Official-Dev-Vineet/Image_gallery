import { useState } from "react";
import PropTypes from "prop-types";

const FilterComponent = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle text input for keyword search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange(searchTerm.split(" "));
  };

  return (
    <div className="filter">
      {/* Search input */}
      <div>
        <label>
          Search for photos:
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
          />
        </label>
      </div>
    </div>
  );
};

export default FilterComponent;

FilterComponent.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
