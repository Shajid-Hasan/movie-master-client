import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Delete from "./Delete Button/Delete";
import Edit from "./Edit Button/Edit";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        navigate('/allmovies')
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
    }

    if (loading) return <p className="text-center text-white text-lg mt-20">Loading details...</p>;
    if (!movie) return <p className="text-center text-white text-lg mt-20">Movie not found</p>;

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-[#ffff] p-4 sm:p-6">
            <div className="card bg-base-100 text-gray-900 shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">

                {/* Left: Movie Poster */}
                <div className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-auto">
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right: Movie Details */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="card-title text-2xl sm:text-2xl font-bold mb-3 text-[#5A0000]">
                            {movie.title}
                            <div className="badge badge-secondary ml-2">{movie.genre}</div>
                        </h2>

                        <p className="mb-2 text-sm sm:text-base"><strong>Rating:</strong> ⭐ {movie.rating}</p>
                        <p className="mb-2 text-sm sm:text-base"><strong>Release Year:</strong> 🎬 {movie.releaseYear}</p>
                        <p className="mb-2 text-sm sm:text-base"><strong>Director:</strong> 🎬 {movie.director}</p>
                        <p className="mb-2 text-sm sm:text-base"><strong>Cast:</strong> 🎬 {movie.cast}</p>
                        <p className="mb-2 text-sm sm:text-base leading-relaxed">
                            <strong>Description:</strong> {movie.plotSummary || "No description available."}
                        </p>
                        <p className="mb-2 text-sm sm:text-base"><strong>Added By:</strong> {movie.addedBy || "Unknown"}</p>
                    </div>

                    {/* Buttons section */}
                    <div className="flex justify-end gap-5 mt-5">
                        <Link to={`/edit-movie/${movie._id}`}>
                            <Edit />
                        </Link>
                        <button onClick={handelDelete}>
                            <Delete />
                        </button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default MovieDetails;
