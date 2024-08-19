import React, { useState } from 'react';
import './search.css';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search: searchTerm, category: selectedCategory });
  };

  return (
    <form onSubmit={handleSubmit} className="search-filter-form">
      <input
        type="text"
        placeholder="Search artworks"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control"
      />
      <select value={selectedCategory} onChange={handleCategoryChange} className="form-select">
        <option value="">All Categories</option>
        <option value="painting">Painting</option>
        <option value="sculpture">Sculpture</option>
        <option value="photography">Photography</option>
        {/* Add more categories as needed */}
      </select>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchFilter;
