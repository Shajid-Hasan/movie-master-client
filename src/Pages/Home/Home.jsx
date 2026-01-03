import React from "react";
import { motion } from "framer-motion";
import Hero from "./Hero/Hero";
import Statistics from "./Statistics.jsx/Statistics";
import TopRatedMovies from "./Top Rated Movies/TopRatedMovies";
import RecentlyAdded from "./Recently Added/RecentlyAdded";
import Genre from "./Genre/Genre";

const Home = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0e0e0e] dark:text-white transition-colors duration-300">

            {/* HERO SECTION */}
            <section>
                <Hero />
            </section>

            {/* STATISTICS SECTION */}
            <section>
                <Statistics />
            </section>

            {/* TOP RATED MOVIES */}
            <section>
                <TopRatedMovies />
            </section>

            {/* RECENTLY ADDED MOVIES */}
            <section>
                <RecentlyAdded />
            </section>

            {/* GENRE SECTION */}
            <section>
                <Genre />
            </section>

            {/* ABOUT PLATFORM */}
            <section className="py-16 px-8 bg-gray-100 dark:bg-[#0b0b0b] text-center transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-red-700 dark:text-[#5A0000] mb-4">
                        About MovieMaster Pro
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                        MovieMaster Pro is your all-in-one movie exploration platform —
                        offering top-rated movies, real-time updates, personalized
                        recommendations, and an engaging community for all movie lovers.
                    </p>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
