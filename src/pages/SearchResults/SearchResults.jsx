import "./SearchResults.css";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import MovieCard from "../../components/MovieCard/MovieCard";

import {
  searchMovies,
} from "../../services/movieService";

const SearchResults = () => {
  const [movies, setMovies] =
    useState([]);

  const [searchParams] =
    useSearchParams();

  const query =
    searchParams.get("q");

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      const data =
        await searchMovies(query);

      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-results">
      <h1>
        Search Results for "{query}"
      </h1>

      <div className="results-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.poster}
            rating={movie.rating}
            year={movie.release_date?.split("-")[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;