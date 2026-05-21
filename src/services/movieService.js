import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getMovies = async (
  page = 1
) => {
  const response = await axios.get(
    `${API}/movies/?page=${page}`
  );

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${API}/movies/${id}/`);

  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(
    `${API}/movies/${movieId}/reviews/`
  );

  return response.data;
};

export const addReview = async (
  movieId,
  reviewData
) => {
  const token =
    localStorage.getItem("access");

  const response = await axios.post(
    `${API}/movies/${movieId}/add-review/`,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const searchMovies = async (
  query
) => {
  const response = await axios.get(
    `${API}/search/?q=${query}`
  );

  return response.data;
};

export const getProfile = async () => {
  const token =
    localStorage.getItem("access");

  const response = await axios.get(
    `${API}/profile/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getRelatedMovies =
  async (movieId) => {
    const response = await axios.get(
      `${API}/movies/${movieId}/related/`
    );

    return response.data;
  };


export const getTopRatedMovies =
  async () => {
    const response = await axios.get(
      `${API}/top-rated/`
    );

    return response.data;
};

export const getMostReviewedMovies =
  async () => {
    const response = await axios.get(
      `${API}/most-reviewed/`
    );

    return response.data;
};

export const getLatestMovies =
  async () => {
    const response = await axios.get(
      `${API}/latest/`
    );

    return response.data;
};


export const getFeaturedMovies =
  async () => {
    const response = await axios.get(
      `${API}/featured/`
    );

    return response.data;
};