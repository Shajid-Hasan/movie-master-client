import React, { useEffect, useState } from "react";
import styled from "styled-components";

const RecentlyAdded = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      fetch("https://movie-master-server-nine.vercel.app/movies")
            .then((res) => res.json())
            .then((data) => {
                const latest = data.slice(-6).reverse();
                setMovies(latest);
            })
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    return (
        <StyledWrapper>
            <h2 className="section-title">🎥 Recently Added Movies</h2>
            {movies.length > 0 ? (
                <div className="card-grid">
                    {movies.map((movie) => (
                        <div className="card" key={movie._id}>
                            <div className="first-content">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="poster"
                                />
                            </div>
                            <div className="second-content">
                                <div>
                                    <h3 className="title">{movie.title}</h3>
                                    <p className="rating">⭐ {movie.rating}</p>
                                    <p className="year">📅 {movie.releaseYear}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="loading">Loading movies...</p>
            )}
        </StyledWrapper>
    );
};

export default RecentlyAdded;

const StyledWrapper = styled.div`
  background-color: #0b0b0b;
  color: #f1f1f1;
  padding: 80px 20px;
  text-align: center;
  font-family: "Poppins", sans-serif;

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #5A0000;
    margin-bottom: 40px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    justify-items: center;
  }

  /* ==== CARD STYLE ==== */
  .card {
  width: 200px;
  height: 280px;
  background: linear-gradient(145deg, #1c1c1c, #222);
  transition: all 0.4s ease;
  border-radius: 12px;
  box-shadow: 0px 0px 10px 4px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: scale(1.05);
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 184, 0, 0.3);
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover; /* <-- cover for full card fill */
  border-radius: 12px;
  transition: all 0.4s;
}

.first-content {
  height: 100%;
  width: 100%;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.card:hover .first-content {
  height: 0;
  opacity: 0;
}

.second-content {
  height: 0%;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  transition: all 0.4s;
  transform: rotate(90deg) scale(-1);
  background: linear-gradient(135deg, #993300 0%, #cc6600 60%, #ff9933 100%);
  color: #fff;
  font-weight: 700;
  padding: 10px;
}

.card:hover .second-content {
  opacity: 1;
  height: 100%;
  font-size: 1rem;
  transform: rotate(0deg);
}

.title {
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.rating {
  color: #fff;
  font-size: 0.95rem;
}

.year {
  color: #fff;
  font-size: 0.9rem;
}

.loading {
  color: #999;
}

`;
