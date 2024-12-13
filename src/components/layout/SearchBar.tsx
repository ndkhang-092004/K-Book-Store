import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import "./SearchBar.scss";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='search-bar-container'>
      <div className='search-bar'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search for something...'
          className='search-input'
        />
        <button type='button' className='search-button'>
          <HiSearch style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
    </div>
  );
}
