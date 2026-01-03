import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/Authentication";
import { toast } from "react-toastify";
import { Link } from "react-router";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { GiFilmSpool } from "react-icons/gi";
import { BiCalendar } from "react-icons/bi";
import { MdStar } from "react-icons/md";
import { Sun, Moon } from "react-feather";
import { useTheme } from "next-themes";

const MyCollections = () => {
    const { user } = useContext(AuthContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        fetch("https://movie-master-server-nine.vercel.app/movies")
            .then((res) => res.json())
            .then((data) => {
                const myMovies = data.filter((movie) => movie.addedBy === user.email);
                setMovies(myMovies);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to fetch movies!");
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this movie?"
        );
        if (!confirmDelete) return;

        fetch(`https://movie-master-server-nine.vercel.app/movies/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Movie deleted successfully!");
                    setMovies(movies.filter((movie) => movie._id !== id));
                } else {
                    toast.error("Failed to delete movie!");
                }
            })
            .catch(() => toast.error("Failed to delete movie!"));
    };

    if (loading) return <p className="loading">Loading your movies...</p>;
    if (movies.length === 0)
        return <p className="loading">You have not added any movies yet.</p>;

    return (
        <StyledWrapper themeMode={theme}>

            <div className="movie-grid">
                {movies.map((movie, index) => (
                    <div
                        className="card"
                        key={movie._id}
                        style={{ animationDelay: `${index * 0.1}s` }} // stagger animation
                    >
                        <div className="poster-wrapper">
                            <img src={movie.posterUrl} alt={movie.title} className="poster" />
                        </div>

                        <div className="movie-info">
                            <div className="top-info">
                                <div className="left-info">
                                    <h3 className="title">{movie.title}</h3>
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

                            <div className="buttons">
                                <Link
                                    to={`/movies/${movie._id}`}
                                    className="icon-btn edit-btn"
                                    title="Edit"
                                >
                                    <FiEdit size={20} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(movie._id)}
                                    className="icon-btn delete-btn"
                                    title="Delete"
                                >
                                    <FiTrash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </StyledWrapper>
    );
};

export default MyCollections;

const StyledWrapper = styled.div`
  background-color: ${({ themeMode }) =>
        themeMode === "light" ? "#f5f5f5" : "#000"};
  color: #fff;
  padding: 50px 20px;
  font-family: "Poppins", sans-serif;
  transition: background-color 0.3s ease;
  min-height: 100vh;
  position: relative;

  /* Theme toggle */
  .theme-toggle-wrapper {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .theme-toggle-btn {
    padding: 8px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .theme-toggle-btn:hover {
    transform: scale(1.1);
  }

  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 35px;
    justify-items: center;
    width: 100%;
  }

  /* Animated Card */
  .card {
    width: 100%;
    max-width: 320px;
    background: #1c1c1c;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 0 18px rgba(255, 153, 51, 0.2);
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s forwards;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(255, 153, 51, 0.4);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .poster-wrapper {
    height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #111;
    overflow: hidden;
  }
  .poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  .poster:hover {
    transform: scale(1.05);
  }

  .movie-info {
    padding: 14px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .top-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .left-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #ffcc66;
    margin: 0 0 4px 0;
  }
  .genre,
  .year {
    font-size: 1rem;
    color: #ddd;
    margin: 2px 0;
    display: flex;
    align-items: center;
  }
  .rating {
    font-size: 1rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
  }
  .icon-btn {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    background: linear-gradient(
      135deg,
      #993300 0%,
      #cc6600 60%,
      #ff9933 100%
    );
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    text-align: center;
  }
  .icon-btn.edit-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 153, 51, 0.5);
  }
  .icon-btn.delete-btn {
    background: linear-gradient(
      135deg,
      #cc0033 0%,
      #ff3366 60%,
      #ff6699 100%
    );
  }
  .icon-btn.delete-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 51, 102, 0.5);
  }

  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #999;
    margin-top: 100px;
  }

  @media (max-width: 1024px) {
    .poster-wrapper {
      height: 320px;
    }
  }
  @media (max-width: 768px) {
    .poster-wrapper {
      height: 280px;
    }
    .card {
      max-width: 260px;
    }
  }
  @media (max-width: 480px) {
    .poster-wrapper {
      height: 240px;
    }
    .card {
      max-width: 100%;
    }
  }
`;
