import "./Reviews.css";

import {
  useEffect,
  useState,
} from "react";

import {
  getMovieReviews,
  addReview,
} from "../../services/movieService";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] =
    useState([]);

  const [reviewText, setReviewText] =
    useState("");

  const [rating, setRating] =
    useState("");

  const [hover, setHover] =
    useState(null);

  const [sort, setSort] =
    useState("newest");

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const fetchReviews = async () => {
    try {
      const data =
        await getMovieReviews(movieId);

      setReviews(data.results || data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText) {
      alert("Please fill all fields");

      return;
    }

    try {
      await addReview(movieId, {
        rating,
        review_text: reviewText,
      });

      setReviewText("");

      setRating("");

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const sortedReviews = [...reviews];

  if (sort === "highest") {
    sortedReviews.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "lowest") {
    sortedReviews.sort(
      (a, b) => a.rating - b.rating
    );
  }

  const renderStars = (rating) => {
    return (
      "★".repeat(rating) +
      "☆".repeat(5 - rating)
    );
  };

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h2>
          User Reviews (
          {reviews.length})
        </h2>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="review-sort"
        >
          <option value="newest">
            Newest
          </option>

          <option value="highest">
            Highest Rated
          </option>

          <option value="lowest">
            Lowest Rated
          </option>
        </select>
      </div>

      <form
        className="review-form"
        onSubmit={handleSubmit}
      >
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= (hover || rating)
                  ? "star active"
                  : "star"
              }
              onClick={() => setRating(star)}
              onMouseEnter={() =>
                setHover(star)
              }
              onMouseLeave={() =>
                setHover(null)
              }
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) =>
            setReviewText(e.target.value)
          }
        ></textarea>

        <button type="submit">
          {reviews.find(
            (review) =>
              review.username ===
              localStorage.getItem(
                "username"
              )
          )
            ? "Update Review"
            : "Submit Review"}
        </button>
      </form>

      <div className="reviews-container">
        {sortedReviews.map((review) => (
          <div
            className="review-card"
            key={review.id}
          >
            <div className="review-top">
              <div>
                <h3>
                  {review.username}
                </h3>

                {review.updated_at !==
                  review.created_at && (
                  <small className="edited-label">
                    Edited
                  </small>
                )}
              </div>

              <span className="review-rating">
                {renderStars(
                  review.rating
                )}
                {" "}
                ({review.rating})
              </span>
            </div>

            <p>{review.review_text}</p>

            <small>
              {new Date(
                review.created_at
              ).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;