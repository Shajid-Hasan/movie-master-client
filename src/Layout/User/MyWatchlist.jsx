// pages/dashboard/MyWatchlist.jsx
import React, { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../Hook/useAuth";

const MyWatchlist = () => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch user's watchlist
    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://movie-master-server-nine.vercel.app/watchlist/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setWatchlist(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load watchlist");
                setLoading(false);
            });
    }, [user]);

    // 🔹 Remove movie from watchlist
    const handleRemove = id => {
        if (!confirm("Are you sure you want to remove this movie from watchlist?")) return;

        fetch(`https://movie-master-server-nine.vercel.app/watchlist/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Removed from watchlist");
                setWatchlist(prev => prev.filter(m => m._id !== id));
            })
            .catch(() => toast.error("Failed to remove"));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!watchlist.length) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-xl font-bold">Your watchlist is empty.</h2>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Movie Title</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watchlist.map((movie, index) => (
                            <tr key={movie._id}>
                                <td>{index + 1}</td>
                                <td>{movie.title || "N/A"}</td>
                                <td className="flex justify-center gap-3">
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleRemove(movie._id)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyWatchlist;
