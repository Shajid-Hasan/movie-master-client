import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import ThemeToggle from "../Navbar/Theme Button/ThemeToggle";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://movie-master-server-nine.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading movies...</p>;

  return (
    <StyledWrapper>
      {/* <h1 className="page-title">All Movies</h1> */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="card" key={movie._id}>
            <img src={movie.posterUrl} alt={movie.title} className="poster" />
            <div className="movie-info">
              <h2 className="title">{movie.title}</h2>
              <p className="rating">{movie.rating}</p>
              <p className="genre">{movie.genre}</p>
              <p className="year">{movie.releaseYear}</p>
              <Link to={`/details/${movie._id}`}
                className="details-btn"
                onClick={() => (`/allmovies/${movie.id}`)}
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

export default AllMovies;

const StyledWrapper = styled.div`
  background-color: #ffff;
  color: #fff;
  padding: 50px 20px;
  font-family: "Poppins", sans-serif;

  .page-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #ff9933;
    text-shadow: 0 0 10px rgba(255, 153, 51, 0.6);
  }

  /* 🔹 Responsive Grid Layout */
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 35px;
    justify-items: center;
    width: 100%;
  }

  /* 🔹 Movie Card */
  .card {
    width: 100%;
    max-width: 320px;
    background: #1c1c1c;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 0 18px rgba(255, 153, 51, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(255, 153, 51, 0.4);
  }

  /* 🔹 Poster Image */
  .poster {
    width: 100%;
    height: 380px;
    object-fit: cover;
  }

  /* 🔹 Movie Info */
  .movie-info {
    padding: 14px;
    text-align: center;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: #ffcc66;
  }

  .rating,
  .genre,
  .year {
    font-size: 1rem;
    margin: 2px 0;
    color: #ddd;
  }

  /* 🔹 Details Button */
  .details-btn {
    margin-top: 10px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #993300 0%, #cc6600 60%, #ff9933 100%);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .details-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 0 15px rgba(255, 153, 51, 0.5);
  }

  /* 🔹 Loading Text */
  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #999;
    margin-top: 100px;
  }

  /* 🔹 Responsive Breakpoints */
  @media (max-width: 1024px) {
    .poster {
      height: 320px;
    }
  }

  @media (max-width: 768px) {
    .poster {
      height: 280px;
    }
    .card {
      max-width: 260px;
    }
  }

  @media (max-width: 480px) {
    .poster {
      height: 240px;
    }
    .card {
      max-width: 100%;
    }
  }
`;
