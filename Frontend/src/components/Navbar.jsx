import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/40 dark:bg-gray-900/60
        backdrop-blur-md shadow-sm
        text-black dark:text-white
        transition-all duration-300
      "
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
          💧 AquaTrack
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          <Link className="hover:text-blue-500 dark:hover:text-blue-300 transition" to="/">
            Home
          </Link>

          <Link className="hover:text-blue-500 dark:hover:text-blue-300 transition" to="/">
            Features
          </Link>

          <Link className="hover:text-blue-500 dark:hover:text-blue-300 transition" to="/">
            About
          </Link>

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xl ml-2 hover:scale-110 transition"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <Link
            to="/login"
            className="
              bg-blue-600 text-white px-4 py-2 rounded-lg
              hover:bg-blue-700 dark:hover:bg-blue-500
              transition
            "
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="
          md:hidden flex flex-col items-center gap-4 pb-4
          bg-white dark:bg-gray-900
          text-black dark:text-white
          transition-all
        ">
          <Link to="/">Home</Link>
          <Link to="/">Features</Link>
          <Link to="/">About</Link>

          {/* 🌙 Dark Mode Toggle (Mobile) */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xl"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <Link
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            to="/login"
          >
            Login
          </Link>
        </div>
      )}
    </motion.nav>
  );
}