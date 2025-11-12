import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/Authentication";

const AddMovie = () => {
    const { user } = useContext(AuthContext);

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

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // validation
        if (!movie.title || !movie.genre || !movie.releaseYear || !movie.rating) {
            toast.error("Please fill all required fields!");
            return;
        }

        const newMovie = {
            ...movie,
            addedBy: user?.email || "anonymous",
        };

        fetch("http://localhost:3000/movies", {
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
        <div className="flex justify-center items-start min-h-screen p-6 bg-[#0f0f0f]">
            <div
                className="card w-full max-w-xl p-6 rounded-xl shadow-2xl
               bg-gradient-to-br from-[#2e001f] to-[#3a001f]
               hover:from-[#500033] hover:to-[#6a0033]
               transition-all duration-700 ease-in-out"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-[#f3e6f0]">
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
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                        <input
                            type="text"
                            name="genre"
                            placeholder="Genre *"
                            value={movie.genre}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                        <input
                            type="number"
                            name="releaseYear"
                            placeholder="Release Year *"
                            value={movie.releaseYear}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                        <input
                            type="text"
                            name="director"
                            placeholder="Director"
                            value={movie.director}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                        <input
                            type="text"
                            name="cast"
                            placeholder="Cast (comma separated)"
                            value={movie.cast}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                    </div>

                    {/* RIGN*/}
                    <div className="flex flex-col gap-3">
                        <input
                            type="number"
                            step="0.1"
                            name="rating"
                            placeholder="Rating *"
                            value={movie.rating}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                        <input
                            type="number"
                            name="duration"
                            placeholder="Duration (minutes)"
                            value={movie.duration}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                        <input
                            type="text"
                            name="language"
                            placeholder="Language"
                            value={movie.language}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={movie.country}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                        <input
                            type="text"
                            name="posterUrl"
                            placeholder="Poster URL"
                            value={movie.posterUrl}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                    </div>

                    {/* FULL WIDTH TEXT AREA*/}
                    <div className="col-span-1 md:col-span-2">
                        <textarea
                            name="plotSummary"
                            placeholder="Plot Summary"
                            value={movie.plotSummary}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full bg-[#1a0014] text-[#f3e6f0]"
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="w-full px-6 py-3 font-semibold text-white rounded-lg 
                     bg-gradient-to-r from-[#4a001f] to-[#33001a] 
                     hover:from-[#770033] hover:to-[#550022] 
                     transition-all duration-500 ease-in-out transform hover:scale-105 shadow-lg text-1xl"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default AddMovie;
