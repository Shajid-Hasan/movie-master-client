import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <main className='min-h-[calc(100vh-285px)]'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;