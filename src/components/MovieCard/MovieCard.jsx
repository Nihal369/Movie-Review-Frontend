import "./MovieCard.css";

import { Link } from "react-router-dom";

const MovieCard = ({
  id,
  title,
  image,
  rating,
  year,
}) => {
  return (
    <Link
      to={`/movie/${id}`}
      className="movie-card"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300x450?text=No+Image";
        }}
      />

      <div className="movie-card-info">
        <div>
          <h3>{title}</h3>

          <p>{year}</p>
        </div>

        <span>
          ★ {rating}
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;