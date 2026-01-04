// src/Hooks/useAuth.js
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Authentication";

const useAuth = () => {
    const auth = useContext(AuthContext);
    const { user } = auth;

    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        fetch(`https://movie-master-server-nine.vercel.app/users/role?email=${user.email}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setRole(data.role || "user");
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch role:", err);
                setRole("user");
                setLoading(false);
            });
    }, [user]);

    return { ...auth, role, loading };
};

export default useAuth;
