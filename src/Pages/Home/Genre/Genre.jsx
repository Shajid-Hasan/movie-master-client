import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Genre = () => {
    const [genres, setGenres] = useState([]);

    // Fetch movies and extract unique genres
    useEffect(() => {
        fetch("https://movie-master-server-nine.vercel.app/movies")
            .then((res) => res.json())
            .then((data) => {
                const uniqueGenres = [
                    ...new Set(
                        data.map((movie) => movie.genre?.trim()).filter(Boolean)
                    ),
                ];
                setGenres(uniqueGenres);
            })
            .catch((err) => console.error("Failed to fetch genres:", err));
    }, []);

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    };

    return (
        <StyledWrapper>
            <h2 className="section-title">Movie Genres</h2>
            {genres.length > 0 ? (
                <motion.div
                    className="genre-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {genres.map((genre, index) => (
                        <motion.div
                            className="genre-card"
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.08,
                                boxShadow: "0 0 25px rgba(255, 150, 50, 0.5)",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {genre}
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <p className="loading">Loading genres...</p>
            )}
        </StyledWrapper>
    );
};

export default Genre;

const StyledWrapper = styled.div`
  background-color: #0b0b0b;
  color: #fff;
  padding: 80px 20px;
  text-align: center;
  font-family: "Poppins", sans-serif;

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #5A0000;
    margin-bottom: 40px;
    letter-spacing: 1px;
  }

  .genre-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 25px;
    justify-items: center;
  }

  .genre-card {
  background: linear-gradient(135deg, #330000, #4d0000);
  color: #f5e6e6;
  font-weight: 600;
  border-radius: 12px;
  padding: 25px;
  width: 170px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  box-shadow: 0 0 10px rgba(77, 0, 0, 0.6), inset 0 0 8px rgba(77, 0, 0, 0.2);
}

.genre-card:hover {
  background: linear-gradient(135deg, #550000, #770000);
  color: #f5e6e6;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 0 12px rgba(119, 0, 0, 0.3), inset 0 0 6px rgba(119, 0, 0, 0.2);
  cursor: pointer;
}


  .loading {
    color: #888;
    font-size: 1.1rem;
  }
`;
