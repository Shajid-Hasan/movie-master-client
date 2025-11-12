import React from "react";
import { motion } from "framer-motion";
import Hero from "./Hero/Hero";
import Statistics from "./Statistics.jsx/Statistics";
import TopRatedMovies from "./Top Rated Movies/TopRatedMovies";
import RecentlyAdded from "./Recently Added/RecentlyAdded";
import Genre from "./Genre/Genre";

const Home = () => {
    return (
        <div className="bg-[#0e0e0e] text-white min-h-screen">

            {/* HERO SECTION */}
            <section>
                <Hero/>
            </section>

            {/* STATISTICS SECTION */}
            <section>
                <Statistics/>
            </section>

            {/* TOP RATED MOVIES*/}
            <section>
                <TopRatedMovies/>
            </section>

            {/* RECENTLY ADDED MOVIES */}
            <section>
                <RecentlyAdded/>
            </section>

            {/* GENER SECTION*/}
            <section>
                <Genre/>
            </section>

            {/* ABOUT PLATFORM */}
            <section className="py-16 px-8 bg-[#0b0b0b] text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-[#5A0000] mb-4">
                        About MovieMaster Pro
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-300">
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
