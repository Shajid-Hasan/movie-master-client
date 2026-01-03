import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);

  // FETCH BACKEND API
  useEffect(() => {
    fetch("https://movie-master-server-nine.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.rating - a.rating);
        setMovies(sorted.slice(0, 5));
      })
      .catch((err) => console.error("Failed to fetch movies:", err));
  }, []);

  return (
    <StyledWrapper>
      <h2 className="section-title">Top Rated Movies</h2>

      <div className="card-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="flip-card">
              <div className="flip-card-inner">
                {/* FRONT */}
                <div className="flip-card-front">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="poster"
                  />
                  <p className="movie-title">{movie.title}</p>
                </div>

                {/* BACK */}
                <div className="flip-card-back">
                  <p className="title">{movie.title}</p>
                  <p className="rating">⭐ {movie.rating}</p>
                  <p className="year">🎬 {movie.releaseYear}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="loading">Loading top rated movies...</p>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* 🌞 LIGHT THEME BACKGROUND */
  background-color: #ffffff;
  color: #f1f1f1;
  padding: 80px 20px;
  text-align: center;
  font-family: "Poppins", sans-serif;

  /* 🌙 DARK THEME BACKGROUND (ONLY THIS CHANGES) */
  html.dark &,
  body.dark & {
    background-color: #0b0b0b;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #5a0000;
    margin-bottom: 40px;
    letter-spacing: 1px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 30px;
    justify-items: center;
  }

  .flip-card {
    background-color: transparent;
    width: 220px;
    height: 300px;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s ease-in-out;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    backface-visibility: hidden;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(229, 9, 20, 0.25);
  }

  .flip-card-front {
    background: linear-gradient(145deg, #1a1a1a, #2b2b2b);
    border: 1px solid #5a0000;
  }

  .poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    transition: transform 0.5s ease;
  }

  .flip-card-front:hover .poster {
    transform: scale(1.05);
  }

  .movie-title {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    padding: 10px;
    color: #ffffff;
    font-weight: 600;
    position: absolute;
    bottom: 0;
    font-size: 0.95rem;
  }

  .flip-card-back {
    background: linear-gradient(135deg, #5a0000, #5a0000);
    color: #ffffff;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 800;
  }

  .rating {
    font-size: 1rem;
    font-weight: 600;
    color: #ffd700;
  }

  .year {
    font-size: 0.9rem;
    color: #cccccc;
  }

  .loading {
    color: #aaaaaa;
  }
`;

export default TopRatedMovies;
