import React, { useEffect, useState } from "react";
import { FaFilm, FaUsers, FaHeart } from "react-icons/fa";

const Overview = () => {
    const [stats, setStats] = useState({
        users: 0,
        movies: 0,
        watchlist: 0,
    });

    useEffect(() => {
        // Fetch dashboard stats
        fetch("https://movie-master-server-nine.vercel.app/dashboard-stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch(() => { });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>

            {/* ===== STATS CARDS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.users}
                    icon={<FaUsers size={28} />}
                />
                <StatCard
                    title="Total Movies"
                    value={stats.movies}
                    icon={<FaFilm size={28} />}
                />
                <StatCard
                    title="Watchlist Items"
                    value={stats.watchlist}
                    icon={<FaHeart size={28} />}
                />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon }) => (
    <div className="bg-base-100 shadow rounded-xl p-6 flex items-center gap-4">
        <div className="p-4 bg-primary/10 text-primary rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-3xl font-bold">{value}</h2>
        </div>
    </div>
);

export default Overview;
