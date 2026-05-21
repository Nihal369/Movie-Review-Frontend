import "./Movies.css";

import {
  useEffect,
  useState,
} from "react";

import MovieCard from "../../components/MovieCard/MovieCard";

import {
  getMovies,
} from "../../services/movieService";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

const Movies = () => {
  const [movies, setMovies] =
    useState([]);

  const [filteredMovies, setFilteredMovies] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [genre, setGenre] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data =
        await getMovies();

      setMovies(data);

      setFilteredMovies(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let updatedMovies =
      [...movies];

    /* SEARCH */

    if (search.trim()) {
      updatedMovies =
        updatedMovies.filter(
          (movie) =>
            movie.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
    }

    /* GENRE */

    if (genre !== "All") {
      updatedMovies =
        updatedMovies.filter(
          (movie) =>
            movie.genre
              ?.toLowerCase()
              .includes(
                genre.toLowerCase()
              )
        );
    }

    setFilteredMovies(
      updatedMovies
    );
  }, [search, genre, movies]);

  const genres = [
    "All",
    "Action",
    "Comedy",
    "Drama",
    "Thriller",
    "Sci-Fi",
    "Fantasy",
    "Romance",
    "Crime",
    "Adventure",
  ];

  return (
    <div className="movies-page">
      {/* HERO */}

      <div className="movies-hero">
        <div className="movies-overlay"></div>

        <div className="movies-hero-content">
          <h1>
            Explore Movies
          </h1>

          <p>
            Discover trending,
            top-rated and
            legendary films
            from around the
            world.
          </p>
        </div>
      </div>

      {/* FILTERS */}

      <div className="movies-topbar">
        <div className="movies-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        <div className="genre-filter">
          <SlidersHorizontal
            size={18}
          />

          <select
            value={genre}
            onChange={(e) =>
              setGenre(
                e.target.value
              )
            }
          >
            {genres.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* MOVIES GRID */}

      {loading ? (
        <div className="movies-loading">
          Loading Movies...
        </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map(
            (movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            )
          )}
        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        filteredMovies.length ===
          0 && (
          <div className="empty-movies">
            <h2>
              No movies found
            </h2>

            <p>
              Try another
              search or genre.
            </p>
          </div>
        )}
    </div>
  );
};

export default Movies;