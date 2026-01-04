// hooks/useUserRole.js
import { useEffect, useState } from "react";

const useUserRole = (email) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;

        fetch(`https://movie-master-server-nine.vercel.app/users/role?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setRole(data?.role || "user"); // safety
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [email]);

    return [role, loading];
};

export default useUserRole;
