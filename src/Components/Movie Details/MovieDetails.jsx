import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2, FiStar, FiCalendar, FiUser, FiFilm } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import ThemeToggle from "../Navbar/Theme Button/ThemeToggle";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    // Fetch movie details
    useEffect(() => {
        fetch(`https://movie-master-server-nine.vercel.app/movies/${id}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load movie details!");
                setLoading(false);
            });
    }, [id]);

    const handelDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://movie-master-server-nine.vercel.app/movies/${movie._id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                })
                    .then(() => {
                        navigate('/allmovies');
                        Swal.fire("Deleted!", "The movie has been deleted.", "success");
                    })
                    .catch(() => toast.error("Failed to delete movie!"));
            }
        });
    };

    if (loading) return <p className="text-center text-white text-lg mt-20">Loading details...</p>;
    if (!movie) return <p className="text-center text-white text-lg mt-20">Movie not found</p>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-start items-center min-h-[calc(100vh-80px)] p-4 sm:p-6 transition-colors duration-500"
            style={{ backgroundColor: theme === "light" ? "#f5f5f5" : "#000" }} // only bg changes
        >

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="card bg-base-100 text-gray-900 shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden"
            >
                {/* Left: Poster */}
                <div className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-auto">
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="card-title text-2xl sm:text-3xl font-bold mb-3 text-[#5A0000] flex items-center gap-2">
                            <FiFilm className="text-[#FF9900]" /> {movie.title}
                            <span className="badge badge-secondary ml-2">{movie.genre}</span>
                        </h2>

                        <p className="text-sm sm:text-base flex items-center gap-2">
                            <FiStar className="text-yellow-400" /> <strong>Rating:</strong> {movie.rating}
                        </p>
                        <p className="text-sm sm:text-base flex items-center gap-2">
                            <FiCalendar className="text-blue-400" /> <strong>Release Year:</strong> {movie.releaseYear}
                        </p>
                        <p className="text-sm sm:text-base flex items-center gap-2">
                            <FiUser className="text-green-400" /> <strong>Director:</strong> {movie.director}
                        </p>
                        <p className="text-sm sm:text-base flex items-center gap-2">
                            <FiUser className="text-purple-400" /> <strong>Cast:</strong> {movie.cast}
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed flex items-start gap-2">
                            <FiFilm className="mt-1 text-red-400" /> <strong>Description:</strong> {movie.plotSummary || "No description available."}
                        </p>
                        <p className="text-sm sm:text-base flex items-center gap-2">
                            <FiUser className="text-gray-600" /> <strong>Added By:</strong> {movie.addedBy || "Unknown"}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-5 mt-5">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link to={`/edit-movie/${movie._id}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#4d0000] to-[#330000] text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                                <FiEdit /> Edit
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <button onClick={handelDelete} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#cc0033] to-[#ff3366] text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                                <FiTrash2 /> Delete
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MovieDetails;
