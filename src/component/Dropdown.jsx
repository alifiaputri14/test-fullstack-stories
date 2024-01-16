// Dropdown.jsx
import React from "react";

const Dropdown = ({ options, selectedOption, onSelect }) => {
  return (
    <select
      value={selectedOption}
      onChange={(e) => onSelect(e.target.value)}
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
