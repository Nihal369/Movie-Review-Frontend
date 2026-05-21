import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import SearchResults from "../pages/SearchResults/SearchResults";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Movies from "../pages/Movies/Movies";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/search" element={<SearchResults />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies"
          element={<Movies />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;