import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CountUp from "react-countup";

const Statistics = () => {
    const [totalMovies, setTotalMovies] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = fetch("http://localhost:3000/movies")
            .then((res) => res.json())
            .then((data) => setTotalMovies(data.length))
            .catch(() => toast.error("Failed to fetch movies!"));

        const fetchUsers = fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => setTotalUsers(data.length))
            .catch(() => toast.error("Failed to fetch users!"));

        Promise.all([fetchMovies, fetchUsers]).finally(() => setLoading(false));
    }, []);

    if (loading)
        return (
            <p className="text-center text-white text-lg mt-20">Loading statistics...</p>
        );

    return (
        <div className="flex justify-center items-center gap-10 p-10 flex-wrap">
            {/* Total Movies Card */}
            <div
                className="text-center p-6 rounded-xl shadow-lg w-52 transform transition-transform duration-500 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #A3CEF1, #6CA0DC)" }}
            >
                <h2 className="text-4xl font-bold text-white">
                    <CountUp end={totalMovies} duration={2} />
                </h2>
                <p className="text-white mt-2 font-medium">Total Movies</p>
            </div>

            {/* Total Users Card */}
            <div
                className="text-center p-6 rounded-xl shadow-lg w-52 transform transition-transform duration-500 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #C1E1C1, #7CC47F)" }}
            >
                <h2 className="text-4xl font-bold text-white">
                    <CountUp end={totalUsers} duration={2} />
                </h2>
                <p className="text-white mt-2 font-medium">Total Users</p>
            </div>
        </div>
    );
};

export default Statistics;
