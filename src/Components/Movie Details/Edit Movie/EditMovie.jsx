import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { AuthContext } from "../../../Context/Authentication";
import { useNavigate, useParams } from "react-router";

const EditMovie = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        title: "",
        genre: "",
        releaseYear: "",
        director: "",
        cast: "",
        rating: "",
        duration: "",
        plotSummary: "",
        posterUrl: "",
        language: "",
        country: "",
    });

    // Fetch existing movie
    useEffect(() => {
        fetch(`https://movie-master-server-nine.vercel.app/movies/${id}`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(() => toast.error("Failed to load movie data"));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!movie.title || !movie.genre || !movie.releaseYear || !movie.rating) {
            toast.error("Please fill all required fields!");
            return;
        }

        fetch(`https://movie-master-server-nine.vercel.app/movies/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...movie, updatedBy: user?.email }),
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Movie updated successfully!");
                    navigate("/myMovies");
                } else {
                    toast.error("Update failed!");
                }
            })
            .catch(() => toast.error("Error updating movie!"));
    };

    return (
        <motion.div
            className="min-h-[calc(100vh-160px)] flex items-center justify-center p-6 transition-colors duration-500"
            style={{ backgroundColor: theme === "light" ? "#f5f5f5" : "#121212" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-xl p-6 rounded-xl shadow-2xl transition-colors duration-500"
                style={{ backgroundColor: theme === "light" ? "#ffffff" : "#1a0014" }}
            >
                <h2
                    className="text-2xl font-bold text-center mb-6"
                    style={{ color: theme === "light" ? "#5A0000" : "#f3e6f0" }}
                >
                    Edit Movie
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div className="flex flex-col gap-3">
                        {["title", "genre", "releaseYear", "director", "cast"].map((field) => (
                            <input
                                key={field}
                                type={field === "releaseYear" ? "number" : "text"}
                                name={field}
                                placeholder={field.replace(/([A-Z])/g, " $1")}
                                value={movie[field] || ""}
                                onChange={handleChange}
                                className="input input-bordered w-full transition-colors duration-500"
                                style={{
                                    backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                    color: theme === "light" ? "#000" : "#f3e6f0",
                                }}
                            />
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-3">
                        {["rating", "duration", "language", "country", "posterUrl"].map((field) => (
                            <input
                                key={field}
                                type={field === "rating" || field === "duration" ? "number" : "text"}
                                name={field}
                                placeholder={field.replace(/([A-Z])/g, " $1")}
                                value={movie[field] || ""}
                                onChange={handleChange}
                                className="input input-bordered w-full transition-colors duration-500"
                                style={{
                                    backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                    color: theme === "light" ? "#000" : "#f3e6f0",
                                }}
                            />
                        ))}
                    </div>

                    {/* Plot Summary */}
                    <div className="col-span-1 md:col-span-2">
                        <textarea
                            name="plotSummary"
                            placeholder="Plot Summary"
                            value={movie.plotSummary || ""}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-6 py-3 font-semibold rounded-lg shadow-lg text-white transition-all duration-500"
                            style={{
                                background:
                                    theme === "light"
                                        ? "linear-gradient(to right, #4a001f, #33001a)"
                                        : "linear-gradient(to right, #770033, #550022)",
                            }}
                        >
                            Update Movie
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default EditMovie;
