'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Zap, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FNavbar from '@/app/components/FixedNav'; // Assuming these components are custom
import InteractiveSharpTorusComponent from '@/app/components/Sphere';

const DashboardPage = () => {
  return (
    <div style={{ backgroundImage: "url('/l.avif')"}} className="min-h-screen bg-gradient-to-tr from-purple-300 via-blue-200 to-gray-200 text-white">
      {/* Navbar */}
      <FNavbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Page Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-3xl mt-40 bg-black/30 rounded-3xl shadow-2xl border border-white/10 p-8"
        >
          {/* Header Section */}
          <header className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
            <Link href="/" className="flex items-center space-x-3 text-2xl font-bold">
                <span className="w-3 h-3 bg-blue-400 rounded-full" />
                <span>FrostFin</span>
            </Link>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all">
              Connect Wallet
            </button>
          </header>
          
          {/* Balance Overview Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-semibold">Your Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Balance Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="p-6 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 shadow-lg transition-all"
              >
                <DollarSign className="w-6 h-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold">Total Balance</h3>
                <p className="text-gray-300 mt-2">$12,340.50</p>
              </motion.div>

              {/* Loans Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="p-6 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 shadow-lg transition-all"
              >
                <TrendingUp className="w-6 h-6 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold">Loan Portfolio</h3>
                <p className="text-gray-300 mt-2">$5,500.00</p>
              </motion.div>

              {/* Asset Protection Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-6 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 shadow-lg transition-all"
              >
                <Shield className="w-6 h-6 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold">Protected Assets</h3>
                <p className="text-gray-300 mt-2">Secured in DeFi</p>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12">
            <h3 className="text-2xl font-semibold mb-8">Explore Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Secure Protocol */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="p-6 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md border border-white/10 shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Secure Protocol</h4>
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-gray-400 mt-2">Built on audited blockchain technology.</p>
                <Link href="/features#secure-protocol" className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300">
              
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>

              {/* Instant Loans */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="p-6 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md border border-white/10 shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Instant Loans</h4>
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <p className="text-gray-400 mt-2">Quick access to liquidity.</p>
                <Link href="/features#instant-loans" className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>

              {/* Asset Protection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-6 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md border border-white/10 shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Asset Protection</h4>
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-gray-400 mt-2">Secure your investments.</p>
                <Link href="/features#asset-protection" className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
