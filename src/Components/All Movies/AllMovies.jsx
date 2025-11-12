import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/movies")
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
      <h1 className="page-title">All Movies</h1>
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
  background-color: #0b0b0b;
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

  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 30px;
    justify-items: center;
  }

  .card {
    width: 220px;
    background: #1c1c1c;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(255, 153, 51, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(255, 153, 51, 0.4);
  }

  .poster {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .movie-info {
    padding: 10px 12px;
    text-align: center;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: #ffcc66;
  }

  .rating,
  .genre,
  .year {
    font-size: 0.95rem;
    margin: 2px 0;
    color: #fff;
  }

  .details-btn {
    margin-top: 8px;
    padding: 6px 12px;
    background: linear-gradient(135deg, #993300 0%, #cc6600 60%, #ff9933 100%);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .details-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 153, 51, 0.5);
  }

  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #999;
    margin-top: 100px;
  }
`;
