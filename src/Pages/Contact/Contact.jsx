import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulated API call
        setTimeout(() => {
            setLoading(false);
            toast.success("Message sent successfully");
            e.target.reset();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 py-16">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
                        Contact Us
                    </h1>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Questions, feedback, or collaborations?
                        We’d love to hear from you
                    </p>
                </motion.div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT INFO */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <InfoCard
                            icon={<MdEmail />}
                            title="Email"
                            value="support@moviemaster.com"
                        />
                        <InfoCard
                            icon={<MdPhone />}
                            title="Phone"
                            value="+880 1608 540 052"
                        />
                        <InfoCard
                            icon={<MdLocationOn />}
                            title="Location"
                            value="Dhaka, Bangladesh"
                        />
                    </motion.div>

                    {/* FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#111] p-6 md:p-8 rounded-xl border border-gray-700"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input label="Your Name" type="text" placeholder="Enter your name" />
                            <Input label="Your Email" type="email" placeholder="Enter your email" />
                            <TextArea label="Message" placeholder="Write your message..." />

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all duration-300 font-semibold disabled:opacity-60"
                            >
                                {loading ? "Sending..." : (
                                    <>
                                        <FaPaperPlane />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

/* ================= REUSABLE COMPONENTS ================= */

const InfoCard = ({ icon, title, value }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className="flex items-center gap-4 bg-[#111] p-5 rounded-xl border border-gray-700 hover:border-red-500 transition-all"
    >
        <div className="text-2xl text-red-500">{icon}</div>
        <div>
            <p className="font-semibold">{title}</p>
            <p className="text-gray-400 text-sm">{value}</p>
        </div>
    </motion.div>
);

const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <input
            {...props}
            required
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:outline-none focus:border-red-500 transition-all"
        />
    </div>
);

const TextArea = ({ label, ...props }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <textarea
            rows="5"
            {...props}
            required
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:outline-none focus:border-red-500 transition-all resize-none"
        />
    </div>
);

export default Contact;
