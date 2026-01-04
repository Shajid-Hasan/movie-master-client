import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://movie-master-server-nine.vercel.app/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load users");
                setLoading(false);
            });
    }, []);

    const handleRoleChange = (id, role) => {
        fetch(`https://movie-master-server-nine.vercel.app/users/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ role }),
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Role updated");
                setUsers(prev => prev.map(u => (u._id === id ? { ...u, role } : u)));
            })
            .catch(() => toast.error("Failed to update role"));
    };

    const handleDelete = id => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        fetch(`https://movie-master-server-nine.vercel.app/users/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => {
                toast.success("User deleted");
                setUsers(prev => prev.filter(u => u._id !== id));
            })
            .catch(() => toast.error("Delete failed"));
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={e => handleRoleChange(user._id, e.target.value)}
                                        className="select select-sm select-bordered"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="flex justify-center gap-3">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                    {user.role === "admin" && (
                                        <span className="badge badge-success gap-1">
                                            <FaUserShield /> Admin
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
