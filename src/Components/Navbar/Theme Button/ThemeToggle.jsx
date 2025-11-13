import { Sun, Moon } from "react-feather";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 mt-3 w-10 h-10 rounded-full transition duration-300 bg-gray-200 dark:bg-gray-800 hover:scale-110 flex items-center justify-center"
            title="Toggle Theme"
        >
            {theme === "light" ? (
                <Moon size={18} className="text-gray-800" />
            ) : (
                <Sun size={18} className="text-yellow-400" />
            )}
        </button>
    );
};

export default ThemeToggle;
