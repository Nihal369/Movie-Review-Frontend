import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import "./Navbar.css";

import { AuthContext } from "../../context/AuthContext";

import {
  Menu,
  X,
  Film,
  Home,
  TrendingUp,
  User,
  LogIn,
  LogOut,
  Search,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Enhanced avatar letter with multiple fallbacks
  const getAvatarLetter = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    return "U"; // Default fallback
  };

  const avatarLetter = getAvatarLetter();

  // Optional: Get full name for display
  const getDisplayName = () => {
    if (user?.username) return user.username;
    if (user?.name) return user.name;
    if (user?.email) return user.email.split('@')[0];
    return "User";
  };

  const displayName = getDisplayName();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
      setSearchActive(false);
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" className="logo">
          <div className="logo-icon">
            <Film size={26} />
          </div>
          <div className="logo-text">
            <span className="logo-main">Cine</span>
            <span className="logo-accent">Scope</span>
          </div>
        </Link>

        {/* SEARCH */}
        <div className={`search-container ${searchActive ? "active" : ""}`}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchActive(true)}
              onBlur={() => setTimeout(() => setSearchActive(false), 200)}
            />
            <button type="submit">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* DESKTOP NAVIGATION */}
        <ul className="nav-links">
          <li>
            <Link to="/">
              <Home size={18} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/movies">
              <Film size={18} />
              <span>Movies</span>
            </Link>
          </li>
          <li>
            <Link to="/trending">
              <TrendingUp size={18} />
              <span>Trending</span>
            </Link>
          </li>

          {isAuthenticated ? (
            <li className="dropdown">
              <button className="dropdown-trigger">
                <div className="avatar">
                  {avatarLetter}
                </div>
                <ChevronDown size={16} />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile">
                    <User size={16} />
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/watchlist">
                    <Film size={16} />
                    Watchlist
                  </Link>
                </li>
                <li className="divider"></li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn-login">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn-signup">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* MOBILE MENU ICON */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          {isAuthenticated && (
            <div className="mobile-user-info">
              <div className="mobile-avatar">
                {avatarLetter}
              </div>
              <div>
                <div className="mobile-user-name">
                  {displayName}
                </div>
                <div className="mobile-user-email">
                  {user?.email}
                </div>
              </div>
            </div>
          )}
        </div>

        <ul className="mobile-nav-links">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <Home size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" onClick={() => setMenuOpen(false)}>
              <Film size={20} />
              Movies
            </Link>
          </li>
          <li>
            <Link to="/trending" onClick={() => setMenuOpen(false)}>
              <TrendingUp size={20} />
              Trending
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              <User size={20} />
              Profile
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button className="mobile-logout" onClick={handleLogout}>
                <LogOut size={20} />
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <LogIn size={20} />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="mobile-signup" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;