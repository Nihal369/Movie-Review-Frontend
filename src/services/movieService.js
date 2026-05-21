import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});



export const getMovies = async (page = 1) => {
  const response = await API.get(`/movies/?page=${page}`);

  return response.data;
};



export const getMovieDetails = async (id) => {
  const response = await API.get(`/movies/${id}/`);

  return response.data;
};



export const getMovieReviews = async (movieId) => {
  const response = await API.get(
    `/movies/${movieId}/reviews/`
  );

  return response.data;
};



export const addReview = async (
  movieId,
  reviewData
) => {
  const token = localStorage.getItem("access");

  const response = await API.post(
    `/movies/${movieId}/add-review/`,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export const searchMovies = async (query) => {
  const response = await API.get(
    `/search/?q=${query}`
  );

  return response.data;
};



export const getProfile = async () => {
  const token = localStorage.getItem("access");

  const response = await API.get(`/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};



export const getRelatedMovies = async (
  movieId
) => {
  const response = await API.get(
    `/movies/${movieId}/related/`
  );

  return response.data;
};



export const getTopRatedMovies = async () => {
  const response = await API.get(
    `/top-rated/`
  );

  return response.data;
};



export const getMostReviewedMovies =
  async () => {
    const response = await API.get(
      `/most-reviewed/`
    );

    return response.data;
  };



export const getLatestMovies = async () => {
  const response = await API.get(
    `/latest/`
  );

  return response.data;
};



export const getFeaturedMovies =
  async () => {
    const response = await API.get(
      `/featured/`
    );

    return response.data;
  };