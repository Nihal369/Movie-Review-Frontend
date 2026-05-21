import "./Genres.css";

const Genres = () => {
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Fantasy",
    "Crime",
  ];

  return (
    <section className="genres-section">
      <h2>Browse By Genres</h2>

      <div className="genres-container">
        {genres.map((genre, index) => (
          <div className="genre-card" key={index}>
            {genre}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Genres;