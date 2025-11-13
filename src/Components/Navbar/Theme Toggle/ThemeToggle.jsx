import React, { useContext } from "react";
import { Sun, Moon } from "lucide-react"; 
import { ThemeContext } from "../../../Context/ThemeContextProvider";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full transition duration-300 bg-gray-200 dark:bg-gray-700 hover:scale-105"
            title="Toggle Theme"
        >
            {theme === "light" ? (
                <Moon size={16} className="text-gray-800" />
            ) : (
                <Sun size={16} className="text-yellow-400" />
            )}
        </button>

    );
};

export default ThemeToggle;
