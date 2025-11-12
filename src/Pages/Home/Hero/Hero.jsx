import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/poster")
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Failed to fetch movies:", err));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 20000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        arrows: false,
        pauseOnHover: false,
        rtl: false,
        cssEase: "linear",
    };


    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {movies.length > 0 ? (
                <Slider {...settings}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="relative w-full h-screen">
                            <img
                                src={movie.banner}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* Optional overlay */}
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="flex justify-center items-center h-screen text-gray-400">
                    Loading posters...
                </div>
            )}
        </div>
    );
};

export default Hero;
