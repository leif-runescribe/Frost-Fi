'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, DollarSign, Lock, Shield, Wallet, Zap } from 'lucide-react';
import InteractiveSphereComponent from '@/app/components/Sphere';
import Link from 'next/link';
import { LoginButton } from './LoginButton';

const GlassLandingPage = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const target = 766129153;
    const steps = 50;
    const increment = target / steps;
    let current = 0;

    const interval = setInterval(() => {
      if (current < target) {
        current += increment;
        setCounter(Math.floor(current));
      } else {
        setCounter(target);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-100 relative overflow-hidden">

      <div className="absolute z-[10] inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[200px] opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-[200px] opacity-30 animate-blob animation-delay-4000" />
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-600/30 rounded-full mix-blend-multiply filter blur-[150px] opacity-30 animate-blob animation-delay-6000" />
      </div>


      <div className={`absolute inset-0 bg-white bg-opacity-10 transition-opacity duration-300 ease-in-out'opacity-100`}
        style={{ backgroundImage: "url('/snow2.avif')" }}
      ></div>

      {/* Main glass container */}
      <div className="relative min-h-screen mx-auto max-w-7xl px-4" >

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Navigation */}
          <nav className="flex justify-between items-center p-6 border-b border-white/10">
            <Link href="/" className="text-4xl  text-black">
              FrostFin
            </Link>
            <div className="md:hidden"></div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/frostboard" className="text-black hover:text-blue-400 transition-colors">
                Frostboard
              </Link>
              <Link href="/dashboard" className="text-black hover:text-purple-400 transition-colors">
                Dashboard
              </Link>
              <Link href="/about" className="text-black hover:text-indigo-400 transition-colors">
                About
              </Link>
              {/* <button className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg font-medium text-black transition-all hover:scale-105"> */}
              <LoginButton />
              {/* </button> */}

            </div>

          </nav>

          {/* Hero Section */}
          <main className="p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 0.2 }}
                className="space-y-8"
              >
                <h1 className="text-6xl font-semibold leading-tight bg-gradient-to-tr from-purple-600 via-blue-400 to-gray-200 bg-clip-text text-transparent">
                  Asset Management <span className="text-blue-800">*</span>
                  <br />
                  <span className="text-5xl font-medium">Effortlessly Easy</span>
                </h1>
                <p className="text-2xl text-gray-900 mt-4 max-w-xl">
  Simplifying multi-chain assets with FrostFin&apos;s abstraction for seamless transactions.
</p>



                <div className="flex items-center space-x-4">
                  <Link href="/frostboard"><button className="px-6 py-3 bg-blue-500 hover:bg-blue-300 rounded-lg font-medium text-black flex items-center space-x-2 transition-colors backdrop-blur-sm">
                    <span>Start Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  </Link>
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-black transition-all">
                    Learn More
                  </button>
                </div>
                <div className="">
                  <p className="text-sm text-gray-900">Total Value Locked</p>
                  <h2 className="text-4xl font-semibold text-black">
                    ${counter.toLocaleString()}
                  </h2>
                </div>
              </motion.div>
              <InteractiveSphereComponent />
            </div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20"
            >
              <div className="p-8 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 transition-all group">
                <div className="w-12 h-12 bg-blue-600 rounded-lg grid place-items-center mb-4 group-hover:scale-110 transition-transform">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">OnChain Abstraction</h3>
                <p className="text-gray-900">Your OnChain identity linked right to your Google Account, powered by Okto</p>
              </div>
              <div className="p-8 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 transition-all group">
                <div className="w-12 h-12 bg-blue-600 rounded-lg grid place-items-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">Defi Services</h3>
                <p className="text-gray-900">Get immediate access to InterChain Defi Services, easier than tying your shoelaces</p>
              </div>
              <div className="p-8 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 transition-all group">
                <div className="w-12 h-12 bg-blue-600 rounded-lg grid place-items-center mb-4 group-hover:scale-110 transition-transform">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">Best UX</h3>
                <p className="text-gray-900">Feels so smooth and easy</p>
              </div>
            </motion.div>
          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default GlassLandingPage;
