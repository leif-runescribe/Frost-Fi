'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LoginButton } from './LoginButton';
const FNavbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsVisible(scrollY > 100);
        setIsSticky(scrollY > 100);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Navbar for desktop */}
            <nav
                className={`flex justify-between items-center px-8 py-4 border-b border-white/10 transition-all duration-500 ${
                        'fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md shadow-md z-50 opacity-100 translate-y-0'
                        
                    }`}
                style={{ transition: 'opacity 0.5s ease, transform 0.5s ease' }}
            >
                {/* Logo with a unique animated effect */}
                <div className="flex items-center space-x-3 ">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
                <Link href="/" className="text-4xl  text-white">
                        FrostFin
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/frostboard" className="text-white/80 hover:text-white transition-colors">
                        Frostboard
                    </Link>

                    <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">
                        Dashboard
                    </Link>

                    <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                        About
                    </Link>

                    <LoginButton />
                </div>

                {/* Mobile menu icon */}
                <div className="flex md:hidden">
                    <button onClick={toggleSidebar} className="text-white focus:outline-none text-2xl">
                        {isSidebarOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Sidebar for mobile */}
            {isSidebarOpen && (
                <aside className="fixed inset-0 bg-gray-900/90 z-50 flex flex-col items-center space-y-6 pt-20 md:hidden transition-all duration-300 ease-in-out">
                    <button onClick={toggleSidebar} className="self-end mr-6 mt-2 text-3xl text-white focus:outline-none">
                        ✕
                    </button>
                    <Link href="/frostboard" className="text-white/80 hover:text-blue-400 text-xl transition-colors">
                        App
                    </Link>
                    <Link href="/dashboard" className="text-white/80 hover:text-purple-400 text-xl transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/about" className="text-white/80 hover:text-indigo-400 text-xl transition-colors">
                        About
                    </Link>
                    <LoginButton />
                </aside>
            )}
        </>
    );
};

export default FNavbar;
