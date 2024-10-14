import React, { useState } from 'react';

const FilterComponent = ({ onFilterChange }) => {
  const [selectedObjects, setSelectedObjects] = useState([]);

  const handleObjectChange = (e) => {
    const value = e.target.value;
    setSelectedObjects((prev) => 
      prev.includes(value) ? prev.filter((obj) => obj !== value) : [...prev, value]
    );
    onFilterChange(selectedObjects);
  };

  const objects = ['car', 'person', 'animal', 'tree'];

  return (
    <div className="filter">
      {objects.map((object) => (
        <label key={object}>
          <input
            type="checkbox"
            value={object}
            onChange={handleObjectChange}
          />
          {object}
        </label>
      ))}
    </div>
  );
};

export default FilterComponent;
