import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://movie-master-server-nine.vercel.app/movies")
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load movies");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center mt-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Manage Movies</h1>
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie, index) => (
                            <tr key={movie._id}>
                                <td>{index + 1}</td>
                                <td>{movie.title}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMovies;
