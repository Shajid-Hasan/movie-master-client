import React, { useState, useEffect } from "react";

const FilterMovies = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState(""); // comma separated e.g., Action,Thriller
    const [minRating, setMinRating] = useState("");
    const [maxRating, setMaxRating] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchFilteredMovies = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams();
            if (genres) query.append("genre", genres);
            if (minRating) query.append("minRating", minRating);
            if (maxRating) query.append("maxRating", maxRating);

            const res = await fetch(`http://localhost:3000/movies/filter?${query.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch filtered movies");

            const data = await res.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching filtered movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch all movies initially
        fetchFilteredMovies();
    }, []);

    return (
        <div className="p-6 bg-[#1b1b1b] min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-4">Filter Movies</h2>

            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Genres (comma separated)"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    className="input input-bordered w-60"
                />
                <input
                    type="number"
                    placeholder="Min Rating"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="input input-bordered w-40"
                />
                <input
                    type="number"
                    placeholder="Max Rating"
                    value={maxRating}
                    onChange={(e) => setMaxRating(e.target.value)}
                    className="input input-bordered w-40"
                />
                <button
                    onClick={fetchFilteredMovies}
                    className="px-4 py-2 bg-[#5a0000] rounded-lg hover:bg-[#770000] transition-colors"
                >
                    Filter
                </button>
            </div>

            {loading ? (
                <p>Loading movies...</p>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {movies.map((movie) => (
                        <div key={movie._id} className="bg-[#292929] p-4 rounded-lg shadow-lg">
                            <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover rounded" />
                            <h3 className="mt-2 text-lg font-bold">{movie.title}</h3>
                            <p>Genre: {movie.genre}</p>
                            <p>Rating: ⭐ {movie.rating}</p>
                            <p>Year: 🎬 {movie.releaseYear}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No movies found.</p>
            )}
        </div>
    );
};

export default FilterMovies;
