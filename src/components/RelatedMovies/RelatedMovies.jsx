import "./RelatedMovies.css";

import {
  useEffect,
  useState,
} from "react";

import MovieCard from "../MovieCard/MovieCard";

import {
  getRelatedMovies,
} from "../../services/movieService";

const RelatedMovies = ({ movieId }) => {
  const [movies, setMovies] =
    useState([]);

  useEffect(() => {
    fetchMovies();
  }, [movieId]);

  const fetchMovies = async () => {
    try {
      const data =
        await getRelatedMovies(movieId);

      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="related-movies">
      <h2>Related Movies</h2>

      <div className="related-grid">
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
    </section>
  );
};

export default RelatedMovies;