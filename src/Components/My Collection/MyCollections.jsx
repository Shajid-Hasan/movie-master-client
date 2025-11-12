import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/Authentication";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyCollections = () => {
    const { user } = useContext(AuthContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all movies and filter by logged-in user
    useEffect(() => {
        fetch("http://localhost:3000/movies")
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

    // Delete movie handler
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this movie?"
        );
        if (!confirmDelete) return;

        fetch(`http://localhost:3000/movies/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Movie deleted successfully!");
                    setMovies(movies.filter((movie) => movie.id !== id));
                } else {
                    toast.error("Failed to delete movie!");
                }
            })
            .catch(() => toast.error("Failed to delete movie!"));
    };

    if (loading)
        return (
            <p className="text-center text-white text-lg mt-20">
                Loading your movies...
            </p>
        );

    if (movies.length === 0)
        return (
            <p className="text-center text-white text-lg mt-20">
                You have not added any movies yet.
            </p>
        );

    return (
        <div className="min-h-screen bg-[#1b1b1b] p-6">
            {/* <h2 className="text-3xl font-bold text-center text-white mb-6">
                My Movie Collection
            </h2> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                {movies.map((movie) => (
                    <div
                        key={movie._id}
                        className="card bg-[#292929] shadow-xl overflow-hidden rounded-xl w-72 flex flex-col"
                    >
                        <div className="h-64 overflow-hidden">
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold mb-1 text-white truncate">
                                    {movie.title}
                                </h3>
                                <p className="text-gray-400 mb-1 truncate">{movie.genre}</p>
                                <p className="text-gray-400 mb-1">Rating: {movie.rating}</p>
                                <p className="text-gray-400 mb-2">Year: {movie.releaseYear}</p>
                            </div>

                            {/* EDIT && DELETE BUTTON */}
                            <div className="flex justify-between mt-4">
                                <Link
                                    to={`/edit-movie/${movie._id}`}
                                    className="btn btn-sm btn-primary w-1/2 mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(movie._id)}
                                    className="btn btn-sm btn-error w-1/2 ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCollections;
