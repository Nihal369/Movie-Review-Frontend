import "./MovieDetails.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../services/movieService";
import Reviews from "../../components/Reviews/Reviews";
import RelatedMovies from "../../components/RelatedMovies/RelatedMovies";

import {
  Star,
  Calendar,
  Clock,
  User,
  Users,
  Play,
  Share2,
  Bookmark,
  Heart,
  Award,
  TrendingUp,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchMovie();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchMovie = async () => {
    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={`star ${i < fullStars ? 'filled' : ''} ${i === fullStars && hasHalfStar ? 'half' : ''}`}
            fill={i < fullStars ? "#FFD700" : "none"}
            stroke={i < fullStars ? "#FFD700" : "#FFD700"}
          />
        ))}
      </div>
    );
  };

  if (!movie) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
      <div className="movie-details-page">
        {/* Hero Banner */}
        <div 
          className="movie-hero-banner"
          style={{
            backgroundImage: `linear-gradient(
              to top,
              rgba(0,0,0,1.9),
              rgba(0,0,0,0.7)
            ), url(${movie.banner})`,
          }}
        >
          <div className="hero-banner-content">
            <div className="hero-badge">
              <TrendingUp size={16} />
              <span>FEATURED MOVIE</span>
            </div>
            
            <h1 className="hero-title">{movie.title}</h1>
            
            <div className="hero-meta">
              <div className="hero-meta-item">
                <Calendar size={16} />
                <span>{movie.release_date?.split("-")[0]}</span>
              </div>
              <div className="hero-meta-item">
                <Clock size={16} />
                <span>{movie.duration || "2h 15min"}</span>
              </div>
              <div className="hero-meta-item rating-badge">
                <Star size={16} fill="#FFD700" stroke="#FFD700" />
                <span>{movie.rating}</span>
                <span className="rating-max">/5</span>
              </div>
            </div>
            
            <div className="hero-buttons">
              <a href={movie.trailer} target="_blank" rel="noreferrer">
                <button className="hero-watch-btn">
                  <Play size={18} fill="white" />
                  Watch Trailer
                </button>
              </a>
              <button className="hero-share-btn">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="movie-content-wrapper">
          <div className="movie-content-container">
            {/* Left Sidebar - Poster */}
            <div className="movie-sidebar">
              <div className="movie-poster-card">
                <img src={movie.poster} alt={movie.title} />
                <div className="poster-actions">
                  <button 
                    className={`action-btn ${isBookmarked ? 'active' : ''}`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark size={20} fill={isBookmarked ? "#8b5cf6" : "none"} />
                  </button>
                  <button 
                    className={`action-btn ${isLiked ? 'active' : ''}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart size={20} fill={isLiked ? "#ff3d3d" : "none"} />
                  </button>
                </div>
              </div>
              
              <div className="movie-quick-info">
                <div className="info-item">
                  <span className="info-label">Genre</span>
                  <span className="info-value">{movie.genre}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration</span>
                  <span className="info-value">{movie.duration || "2h 15min"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Release Date</span>
                  <span className="info-value">{movie.release_date}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Language</span>
                  <span className="info-value">English</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="movie-main-content">
              {/* Tabs */}
              <div className="content-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'cast' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cast')}
                >
                  Cast & Crew
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="tab-content overview-tab">
                  <div className="rating-summary">
                    <div className="rating-score">
                      <div className="score-number">{movie.rating}</div>
                      <div className="score-max">/5</div>
                      <div className="score-stars">
                        {renderStars(movie.rating)}
                      </div>
                    </div>
                    <div className="rating-details">
                      <div className="rating-bar-item">
                        <span>5 Star</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '70%' }}></div>
                        </div>
                        <span>70%</span>
                      </div>
                      <div className="rating-bar-item">
                        <span>4 Star</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '20%' }}></div>
                        </div>
                        <span>20%</span>
                      </div>
                      <div className="rating-bar-item">
                        <span>3 Star</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '7%' }}></div>
                        </div>
                        <span>7%</span>
                      </div>
                      <div className="rating-bar-item">
                        <span>2 Star</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '2%' }}></div>
                        </div>
                        <span>2%</span>
                      </div>
                      <div className="rating-bar-item">
                        <span>1 Star</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '1%' }}></div>
                        </div>
                        <span>1%</span>
                      </div>
                    </div>
                  </div>

                  <div className="movie-description">
                    <h3>Synopsis</h3>
                    <p>{movie.description}</p>
                  </div>

                  <div className="movie-details-grid">
                    <div className="detail-card">
                      <Award size={24} />
                      <h4>Director</h4>
                      <p>{movie.director}</p>
                    </div>
                    <div className="detail-card">
                      <Users size={24} />
                      <h4>Cast</h4>
                      <p>{movie.cast}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cast Tab */}
              {activeTab === 'cast' && (
                <div className="tab-content cast-tab">
                  <div className="director-section">
                    <h3>
                      <User size={20} />
                      Director
                    </h3>
                    <div className="director-card">
                      <div className="director-avatar">
                        {movie.director?.[0] || "D"}
                      </div>
                      <div>
                        <h4>{movie.director}</h4>
                        <p>Director</p>
                      </div>
                    </div>
                  </div>

                  <div className="cast-section">
                    <h3>
                      <Users size={20} />
                      Starring
                    </h3>
                    <div className="cast-grid">
                      {movie.cast?.split(",").map((actor, index) => (
                        <div key={index} className="cast-card">
                          <div className="cast-avatar">
                            {actor.trim()[0]}
                          </div>
                          <p>{actor.trim()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="tab-content reviews-tab">
                  <Reviews movieId={id} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Movies Section */}
        <RelatedMovies movieId={id} />
      </div>
    </>
  );
};

export default MovieDetails;