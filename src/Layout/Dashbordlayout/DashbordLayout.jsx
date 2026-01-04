// layouts/DashboardLayout.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
// import useAuth from "../Hooks/useAuth";

// Icons
import { FaHome, FaUsers, FaFilm, FaClipboardList } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import useAuth from "../../Hook/useAuth";

const DashboardLayout = () => {
    const { user } = useAuth();
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);

    console.log(user, role);
    // 🔹 GET ROLE FROM YOUR BACKEND
    useEffect(() => {
        if (!user?.email) return;

        fetch("https://movie-master-server-nine.vercel.app/users")
            .then(res => res.json())
            .then(data => {
                const currentUser = data.find(u => u.email === user.email);
                setRole(currentUser?.role || "user");
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* ================= MAIN CONTENT ================= */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 px-4">
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                        <HiMenuAlt2 size={24} />
                    </label>
                    <h2 className="ml-3 font-semibold text-lg">Dashboard</h2>
                </div>

                {/* Page Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="w-64 bg-base-200 min-h-full p-4 space-y-4">

                    {/* HOME */}
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <FaHome /> Home
                    </Link>

                    <div className="divider"></div>

                    {/* ================= ADMIN MENU ================= */}
                    {role === "admin" && (
                        <div className="space-y-2">
                            <p className="menu-title text-xs">Admin Panel</p>

                            <NavLink to="manage-users" className="flex items-center gap-2">
                                <FaUsers /> Manage Users
                            </NavLink>

                            <NavLink to="manage-movies" className="flex items-center gap-2">
                                <FaFilm /> Manage Movies
                            </NavLink>
                        </div>
                    )}

                    {/* ================= USER MENU ================= */}
                    {role === "user" && (
                        <div className="space-y-2">
                            <p className="menu-title text-xs">User Panel</p>

                            <NavLink to="/dashboard/my-watchlist" className="flex items-center gap-2">
                                <FaClipboardList /> My Watchlist
                            </NavLink>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
