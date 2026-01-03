import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { GiFilmSpool } from "react-icons/gi";
import { BiCalendar } from "react-icons/bi";
import { MdStar } from "react-icons/md";
import { useTheme } from "next-themes";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://movie-master-server-nine.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Get unique genres and years for the selects
  const genres = [...new Set(movies.map((m) => m.genre))];
  const years = [...new Set(movies.map((m) => m.releaseYear))].sort(
    (a, b) => b - a
  );

  const filteredMovies = movies.filter((movie) => {
    const matchTitle = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchGenre = genreFilter ? movie.genre === genreFilter : true;
    const matchYear = yearFilter ? movie.releaseYear === Number(yearFilter) : true;

    return matchTitle && matchGenre && matchYear;
  });

  if (loading) return <p className="loading">Loading movies...</p>;

  return (
    <StyledWrapper themeMode={theme}>
      {/* FILTER + SEARCH ROW */}
      <div className="controls-row">
        <div className="filter-box">
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search movie by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* MOVIE GRID */}
      <div className="movie-grid">
        {filteredMovies.map((movie, index) => (
          <div
            className="card"
            key={movie._id}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="poster-wrapper">
              <img src={movie.posterUrl} alt={movie.title} className="poster" />
            </div>

            <div className="movie-info">
              <div className="top-info">
                <div className="left-info">
                  <h2 className="title">{movie.title}</h2>
                  <p className="genre">
                    <GiFilmSpool style={{ marginRight: "5px", color: "#fff" }} />
                    {movie.genre}
                  </p>
                  <p className="year">
                    <BiCalendar style={{ marginRight: "5px", color: "#fff" }} />
                    {movie.releaseYear}
                  </p>
                </div>

                <p className="rating">
                  <MdStar style={{ marginRight: "5px", color: "#fff" }} />
                  {movie.rating}
                </p>
              </div>

              <div className="details-wrapper">
                <Link to={`/details/${movie._id}`} className="details-btn">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

export default AllMovies;

/* ================= STYLES ================= */
const StyledWrapper = styled.div`
  background-color: ${({ themeMode }) =>
    themeMode === "light" ? "#f5f5f5" : "#000"};
  color: #fff;
  padding: 40px 20px;
  min-height: 100vh;
  transition: background-color 0.3s ease;

  /* CONTROLS ROW */
  .controls-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 35px;
    gap: 20px;
  }

  .filter-box {
    display: flex;
    gap: 12px;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .filter-box select {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid #ff9933;
    background: #1c1c1c;
    color: #fff;
    outline: none;
  }

  .search-box {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    min-width: 200px;
  }

  .search-box input {
    width: 100%;
    max-width: 420px;
    padding: 12px 16px;
    border-radius: 12px;
    border: 2px solid transparent;
    outline: none;
    font-size: 1rem;
    background: ${({ themeMode }) =>
    themeMode === "light" ? "#fff" : "#1c1c1c"};
    color: ${({ themeMode }) => (themeMode === "light" ? "#000" : "#fff")};
    animation: fireBorder 2s linear infinite;
  }

  @keyframes fireBorder {
    0% {
      box-shadow: 0 0 6px rgba(255, 0, 0, 0.7);
    }
    50% {
      box-shadow: 0 0 18px rgba(255, 140, 0, 0.9);
    }
    100% {
      box-shadow: 0 0 6px rgba(255, 0, 0, 0.7);
    }
  }

  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 35px;
    justify-items: center;
  }

  .card {
    width: 100%;
    max-width: 320px;
    background: #1c1c1c;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 0 18px rgba(255, 153, 51, 0.2);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .poster-wrapper {
    height: 380px;
    background: #111;
  }

  .poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .movie-info {
    padding: 14px;
  }

  .top-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #ffcc66;
  }

  .genre,
  .year,
  .rating {
    font-size: 1rem;
    display: flex;
    align-items: center;
  }

  .details-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }

  .details-btn {
    padding: 8px 16px;
    background: linear-gradient(135deg, #993300, #ff9933);
    border-radius: 8px;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }

  .loading {
    text-align: center;
    margin-top: 100px;
    color: #999;
  }
`;
