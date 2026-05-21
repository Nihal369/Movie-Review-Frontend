import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/Footer/Footer";

import MovieSection from "../components/MovieSection/MovieSection";

import {
  getMovies,
  getTopRatedMovies,
  getMostReviewedMovies,
  getLatestMovies,
} from "../services/movieService";

const Home = () => {
  const [trendingMovies, setTrendingMovies] =
    useState([]);

  const [topRatedMovies, setTopRatedMovies] =
    useState([]);

  const [
    mostReviewedMovies,
    setMostReviewedMovies,
  ] = useState([]);

  const [latestMovies, setLatestMovies] =
    useState([]);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const trending =
        await getMovies();

      const topRated =
        await getTopRatedMovies();

      const mostReviewed =
        await getMostReviewedMovies();

      const latest =
        await getLatestMovies();

      setTrendingMovies(
        trending.results || trending
      );

      setTopRatedMovies(topRated);

      setMostReviewedMovies(
        mostReviewed
      );

      setLatestMovies(latest);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <Hero />

      {/* <SearchBar /> */}

      <MovieSection
        title="Trending Now"
        movies={trendingMovies}
      />

      <MovieSection
        title="Top Rated"
        movies={topRatedMovies}
      />

      <MovieSection
        title="Most Reviewed"
        movies={mostReviewedMovies}
      />

      <MovieSection
        title="Latest Releases"
        movies={latestMovies}
      />

      <Footer />
    </>
  );
};

export default Home;