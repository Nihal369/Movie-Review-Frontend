import "./MovieSection.css";

import MovieCard from "../MovieCard/MovieCard";

import SkeletonCard from "../Skeleton/SkeletonCard";

const MovieSection = ({
  title,
  movies,
}) => {
  return (
    <section className="movie-section">
      <h2>{title}</h2>

      <div className="movie-row">
        {movies?.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={movie.poster}
              rating={movie.rating}
              year={
                movie.release_date?.split(
                  "-"
                )[0]
              }
            />
          ))
        ) : (
          [...Array(5)].map((_, index) => (
            <SkeletonCard
              key={index}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MovieSection;