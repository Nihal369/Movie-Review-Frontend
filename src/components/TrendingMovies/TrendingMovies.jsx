import "./TrendingMovies.css";

import {
  useEffect,
  useState,
} from "react";

import MovieCard from "../MovieCard/MovieCard";

import {
  getMovies,
} from "../../services/movieService";

const TrendingMovies = () => {
  const [movies, setMovies] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [hasNext, setHasNext] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [loading, hasNext]);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const data =
        await getMovies(page);

      setMovies((prev) => [
        ...prev,
        ...(data.results || data),
      ]);

      setHasNext(!!data.next);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight +
        document.documentElement
          .scrollTop +
        200 >=
        document.documentElement
          .offsetHeight &&
      hasNext &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="trending">
      <h2>Trending Movies</h2>

      <div className="movie-grid">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.poster}
            rating={movie.rating}
            year={movie.release_date?.split(
              "-"
            )[0]}
          />
        ))}
      </div>

      {loading && (
        <h3 className="loading-text">
          Loading...
        </h3>
      )}
    </section>
  );
};

export default TrendingMovies;