// pages/dashboard/UserDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("/api/dashboard/user").then(res => {
            setData(res.data);
        });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Performance</h1>

            <div className="bg-white p-6 rounded shadow w-64">
                <p className="text-gray-500">Movies Added</p>
                <h2 className="text-3xl font-bold">{data.myMovies}</h2>
            </div>
        </div>
    );
};

export default UserDashboard;
