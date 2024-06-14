import React from "react";

const SearchBar = ({ onSearch, inputValue }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center p-2">
      <input
        type="text"
        className="input-customa w-[25vh]"
        placeholder="Buscar..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
