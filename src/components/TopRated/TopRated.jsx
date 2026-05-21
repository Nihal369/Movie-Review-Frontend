import "./TopRated.css";
import MovieCard from "../MovieCard/MovieCard";

const TopRated = () => {
  const movies = [
    {
      id: 5,
      title: "The Dark Knight",
      image:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 9.0,
      year: 2008,
    },

    {
      id: 6,
      title: "Fight Club",
      image:
        "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
      rating: 8.8,
      year: 1999,
    },

    {
      id: 7,
      title: "Forrest Gump",
      image:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      rating: 8.8,
      year: 1994,
    },

    {
      id: 8,
      title: "The Godfather",
      image:
        "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      rating: 9.2,
      year: 1972,
    },
  ];

  return (
    <section className="top-rated">
      <h2>Top Rated Movies</h2>

      <div className="top-rated-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            rating={movie.rating}
            year={movie.year}
          />
        ))}
      </div>
    </section>
  );
};

export default TopRated;