import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Movie Review</h2>

        <p>
          Discover trending movies, ratings, reviews, trailers, and audience
          reactions.
        </p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/">Movies</a>
          <a href="/">Trending</a>
          <a href="/">Contact</a>
        </div>

        <p className="copyright">
          © 2026 Movie Review. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;