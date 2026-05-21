import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search?q=${search}`);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;