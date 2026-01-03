import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/Authentication";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const AddMovie = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useTheme(); // Get current theme

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

        const newMovie = { ...movie, addedBy: user?.email || "anonymous" };

        fetch("https://movie-master-server-nine.vercel.app/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMovie),
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Movie added successfully!");
                    setMovie({
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
                } else {
                    toast.error("Failed to add movie!");
                }
            })
            .catch(() => toast.error("Error adding movie!"));
    };

    return (
        <motion.div
            className="min-h-[calc(100vh-160px)] flex flex-col items-center p-6 transition-colors duration-500"
            style={{
                backgroundColor: theme === "light" ? "#f5f5f5" : "#121212",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className={`card w-full max-w-xl p-6 rounded-xl shadow-2xl transition-colors duration-500`}
                style={{
                    backgroundColor: theme === "light" ? "#ffffff" : "#1a0014",
                }}
            >
                <h2
                    className="text-2xl font-bold text-center mb-6"
                    style={{ color: theme === "light" ? "#5A0000" : "#f3e6f0" }}
                >
                    Add New Movie
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title *"
                            value={movie.title}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                        <input
                            type="text"
                            name="genre"
                            placeholder="Genre *"
                            value={movie.genre}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                        <input
                            type="number"
                            name="releaseYear"
                            placeholder="Release Year *"
                            value={movie.releaseYear}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                        <input
                            type="text"
                            name="director"
                            placeholder="Director"
                            value={movie.director}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                        <input
                            type="text"
                            name="cast"
                            placeholder="Cast (comma separated)"
                            value={movie.cast}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-3">
                        <input
                            type="number"
                            step="0.1"
                            name="rating"
                            placeholder="Rating *"
                            value={movie.rating}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                        <input
                            type="number"
                            name="duration"
                            placeholder="Duration (minutes)"
                            value={movie.duration}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                        <input
                            type="text"
                            name="language"
                            placeholder="Language"
                            value={movie.language}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={movie.country}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                        <input
                            type="text"
                            name="posterUrl"
                            placeholder="Poster URL"
                            value={movie.posterUrl}
                            onChange={handleChange}
                            className="input input-bordered w-full transition-colors duration-500"
                            style={{
                                backgroundColor: theme === "light" ? "#fff" : "#2a001f",
                                color: theme === "light" ? "#000" : "#f3e6f0",
                            }}
                        />
                    </div>

                    {/* Plot Summary */}
                    <div className="col-span-1 md:col-span-2">
                        <textarea
                            name="plotSummary"
                            placeholder="Plot Summary"
                            value={movie.plotSummary}
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
                                background: theme === "light"
                                    ? "linear-gradient(to right, #4a001f, #33001a)"
                                    : "linear-gradient(to right, #770033, #550022)",
                            }}
                        >
                            Submit
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddMovie;
