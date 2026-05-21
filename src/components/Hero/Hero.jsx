import "./Hero.css";

import {
  useEffect,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp
} from "lucide-react";

import {
  getFeaturedMovies,
} from "../../services/movieService";

const Hero = () => {
  const [movies, setMovies] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () =>
      clearInterval(interval);
  }, [current, movies]);

  const fetchMovies = async () => {
    try {
      const data =
        await getFeaturedMovies();

      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === movies.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0
        ? movies.length - 1
        : prev - 1
    );
  };

  if (!movies.length) return null;

  const movie = movies[current];

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(
          to top,
          rgba(0,0,0,1.9),
          rgba(0,0,0,0.7)
        ),
        url(${movie.banner})`,
      }}
    >
      <button
        className="hero-arrow left"
        onClick={prevSlide}
      >
        <ChevronLeft />
      </button>

      <button
        className="hero-arrow right"
        onClick={nextSlide}
      >
        <ChevronRight />
      </button>

      <div className="hero-content">
        <span className="featured-tag">
          <Star size={16} />
          Featured
        </span>

        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>
            {movie.release_date?.split(
              "-"
            )[0]}
          </span>

          <span>{movie.genre}</span>

          <span>
            <Star size={16} color="#f0b429"/>
            {movie.rating}/5
          </span>
        </div>

        <p>
          {movie.description?.slice(
            0,
            180
          )}
          ...
        </p>

        <div className="hero-buttons">
          <button>
            Reviews
          </button>

          <button className="secondary-btn">
            Details
          </button>
        </div>
      </div>

      <div className="hero-poster">
        <img
          src={movie.poster}
          alt={movie.title}
        />
      </div>

      <div className="hero-indicators">
        {movies.map((_, index) => (
          <span
            key={index}
            className={
              current === index
                ? "active"
                : ""
            }
            onClick={() =>
              setCurrent(index)
            }
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;