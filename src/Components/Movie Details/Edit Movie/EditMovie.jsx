import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/Authentication";

const EditMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [movie, setMovie] = useState({
        title: "",
        genre: "",
        rating: "",
        releaseYear: "",
        director: "",
        cast: "",
        duration: "",
        language: "",
        country: "",
        posterUrl: "",
        plotSummary: "",
        addedBy: "",
    });

    const [loading, setLoading] = useState(true);

    // FATCH FROM BACKEND
    useEffect(() => {
        fetch(`http://localhost:3000/movies/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || !data._id) {
                    toast.error("Movie not found!");
                    setLoading(false);
                    return;
                }

                if (user?.email !== data.addedBy) {
                    toast.error("You are not authorized to edit this movie!");
                    setLoading(false);
                    return;
                }

                setMovie({
                    title: data.title || "",
                    genre: data.genre || "",
                    rating: data.rating || "",
                    releaseYear: data.releaseYear || "",
                    director: data.director || "",
                    cast: data.cast || "",
                    duration: data.duration || "",
                    language: data.language || "",
                    country: data.country || "",
                    posterUrl: data.posterUrl || "",
                    plotSummary: data.plotSummary || "",
                    addedBy: data.addedBy || "",
                });
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load movie details!");
                setLoading(false);
            });
    }, [id, user]);

    // HANDEL FORM CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prev) => ({ ...prev, [name]: value }));
    };

    // HANDEL MOVIE UPDATE
    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/movies/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie),
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Movie updated successfully!");
                    navigate("/mycollections");
                } else {
                    toast.error("Failed to update movie!");
                }
            })
            .catch(() => toast.error("Error while updating movie!"));
    };

    if (loading)
        return (
            <p className="text-center text-white text-lg mt-20">
                Loading movie details...
            </p>
        );

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1b1b1b] p-6">
            <div className="card w-full max-w-2xl bg-base-100 shadow-2xl p-6 rounded-xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#5A0000]">
                    Update Movie
                </h2>

                <form
                    onSubmit={handleUpdate}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {/* Left Column */}
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="title"
                            value={movie.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="genre"
                            value={movie.genre}
                            onChange={handleChange}
                            placeholder="Genre"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="number"
                            name="releaseYear"
                            value={movie.releaseYear}
                            onChange={handleChange}
                            placeholder="Release Year"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="director"
                            value={movie.director}
                            onChange={handleChange}
                            placeholder="Director"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="cast"
                            value={movie.cast}
                            onChange={handleChange}
                            placeholder="Cast (comma separated)"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-3">
                        <input
                            type="number"
                            step="0.1"
                            name="rating"
                            value={movie.rating}
                            onChange={handleChange}
                            placeholder="Rating"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="number"
                            name="duration"
                            value={movie.duration}
                            onChange={handleChange}
                            placeholder="Duration (minutes)"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="language"
                            value={movie.language}
                            onChange={handleChange}
                            placeholder="Language"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="country"
                            value={movie.country}
                            onChange={handleChange}
                            placeholder="Country"
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="posterUrl"
                            value={movie.posterUrl}
                            onChange={handleChange}
                            placeholder="Poster URL"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Plot Summary */}
                    <div className="col-span-1 md:col-span-2">
                        <textarea
                            name="plotSummary"
                            value={movie.plotSummary}
                            onChange={handleChange}
                            placeholder="Plot Summary"
                            className="textarea textarea-bordered w-full"
                        />
                    </div>

                    {/* Added By (Read-only) */}
                    <div className="col-span-1 md:col-span-2">
                        <input
                            type="text"
                            name="addedBy"
                            value={movie.addedBy}
                            readOnly
                            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-1 md:col-span-2 flex justify-between mt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 font-semibold text-white rounded-lg 
              bg-gradient-to-r from-[#4d0000] to-[#330000] 
              hover:from-[#770000] hover:to-[#550000] 
              transition-all duration-500 ease-in-out transform hover:scale-105 shadow-lg"
                        >
                            Update
                        </button>

                        <Link
                            to="/mycollections"
                            className="btn btn-secondary md:w-auto w-full mt-2 md:mt-0"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMovie;
