import "./Profile.css";

import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
} from "../../services/movieService";

import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data =
        await getProfile();

      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return (
      <div className="profile-loading">
        Loading Profile...
      </div>
    );
  }

  return (
    <>
      <Navbar/>
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.username
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="profile-info">
            <h1>{profile.username}</h1>

            <p>{profile.email}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h2>
              {profile.review_count}
            </h2>

            <p>Reviews</p>
          </div>
        </div>

        <div className="watchlist-section">
          <h2>My Reviews</h2>

          <div className="reviews-container">
            {profile.reviews.map(
              (review) => (
                <div
                  className="review-card"
                  key={review.id}
                >
                  <div className="review-top">
                    <h3>
                      Movie ID:
                      {review.movie}
                    </h3>

                    <span>
                      ⭐ {review.rating}
                    </span>
                  </div>

                  <p>
                    {review.review_text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;