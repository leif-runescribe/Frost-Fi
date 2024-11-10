'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Lock, Shield, Zap, Wallet,
  Box, Users, Code2, Gem,
  ChevronRight, ExternalLink, GithubIcon,
  BarChart2, ArrowUpRight,
  LayoutDashboard,
  GemIcon
} from 'lucide-react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Tooltip } from '@mui/material';
import Link from 'next/link';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const FullLandingPage = () => {
  const [counter, setCounter] = useState(0);
  const [activeTab, setActiveTab] = useState('borrow');

  // Counter animation
  useEffect(() => {
    const target = 10085;
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

  // Stats data
  const stats = [
    { label: 'Upcoming Chains', value: '11+' },
    { label: 'Active Users', value: '504' },
    { label: 'Protocols Offered', value: '3+' },
    { label: 'Average APY', value: '7.4%' }
  ];

  // Sample chart data
  const chartData = [
    { name: 'Jan', totalStaked: 5000000, activeStakers: 200000, avgRewardYield: 5.2 },
    { name: 'Feb', totalStaked: 5200000, activeStakers: 210000, avgRewardYield: 5.4 },
    { name: 'Mar', totalStaked: 5300000, activeStakers: 220000, avgRewardYield: 5.6 },
    { name: 'Apr', totalStaked: 5500000, activeStakers: 230000, avgRewardYield: 5.8 },
    { name: 'May', totalStaked: 5700000, activeStakers: 240000, avgRewardYield: 6.0 },
    { name: 'Jun', totalStaked: 5900000, activeStakers: 250000, avgRewardYield: 6.2 }
  ];

  return (
    <div style={{ backgroundImage: "url('/d.avif')" }} className="min-h-screen  from-blue-950 via-gray-900 to-black">


      {/* Main glass container */}
      <div className="relative min-h-screen mx-auto max-w-7xl my- px-4 space-y-32">
        {/* lil glass panel */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
        >


          {/* ... later ... */}
        </motion.div>

        {/* Stats */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeInUp}
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-3xl font-semibold text-black mb-2">{stat.value}</h3>
                <p className="text-gray-900">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works  */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInUp}
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/10"
        >
          <h2 className="text-4xl  text-gray-900 mb-12 text-center">How It Works</h2>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-white/20 p-1">
              <button
                onClick={() => setActiveTab('borrow')}
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'borrow'
                    ? 'bg-blue-100 text-gray-900'
                    : 'text-gray-800 hover:text-gray-900'
                  }`}
              >
                App FLow
              </button>
              <button
                onClick={() => setActiveTab('lend')}
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'lend'
                    ? 'bg-blue-100 text-gray-900'
                    : 'text-gray-800 hover:text-gray-900'
                  }`}
              >
                Operations
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                variants={fadeInUp}
                transition={{ delay: step * 0.1 }}
                className="relative p-8 bg-white/50 rounded-xl border border-white/10 group hover:bg-white/10 transition-all"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                  {step}
                </div>
                <h3 className="text-xl text-cyan-900 mb-4">
                  {activeTab === 'borrow' ? (
                    ['Connect Wallet', 'Deposit Funds', `That's it!`][step - 1]
                  ) : (
                    ['Polygon', 'Solana', 'Aptos'][step - 1]
                  )}
                </h3>
                <p className="text-gray-900">
                  {activeTab === 'borrow' ? (
                    ['Connect your wallet to get on the FrostBoard.', 'Deposit tokens to your chains', 'Participate in Multi Chain Defi.'][step - 1]
                  ) : (
                    ['.', '.', '.'][step - 1]
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Market Overview  */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.75 }}
          variants={fadeInUp}
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              variants={fadeInLeft}
              className="space-y-6"
            >
              <h2 className="text-4xl text-gray-900">Staking Dashboard</h2>
              <p className="text-cyan-900 text-lg">
                Track real-time staking performance and cross-chain rewards with our comprehensive analytics dashboard.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Staked Assets', value: '$10.5M' },
                  { label: 'Active Stakers', value: '3,800' },
                  { label: 'Cross-Chain Staked Value', value: '$5.2M' },
                  { label: 'Average Reward Yield', value: '4.7%' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <p className="text-gray-900 text-sm">{stat.label}</p>
                    <p className="text-gray-900 font-semibold text-xl">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              className="relative h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  {/* Dark Background */}
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#000000" /> {/* Changed to black */}
                  <YAxis stroke="#000000" /> {/* Changed to black */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F1F1F',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                    }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />

                  <Line
                    type="monotone"
                    dataKey="totalStaked"
                    stroke="url(#stakedGradient)"  // Gradient line
                    strokeWidth={3}
                    dot={{ stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6', r: 6 }}
                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 3, fill: '#fff' }}
                    isAnimationActive={true}
                  />

                  <Line
                    type="monotone"
                    dataKey="activeStakers"
                    stroke="url(#stakersGradient)"  // Gradient line
                    strokeWidth={3}
                    dot={{ stroke: '#10b981', strokeWidth: 2, fill: '#10b981', r: 6 }}
                    activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 3, fill: '#fff' }}
                    isAnimationActive={true}
                  />

                  <Line
                    type="monotone"
                    dataKey="avgRewardYield"
                    stroke="url(#rewardGradient)"  // Gradient line
                    strokeWidth={3}
                    dot={{ stroke: '#fbbf24', strokeWidth: 2, fill: '#fbbf24', r: 6 }}
                    activeDot={{ r: 8, stroke: '#fbbf24', strokeWidth: 3, fill: '#fff' }}
                    isAnimationActive={true}
                  />

                  <defs>
                    <linearGradient id="stakedGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="stakersGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="rewardGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#fcd34d" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>

            </motion.div>
          </div>
        </motion.section>
        <motion.div
                className="bg-white/10 backdrop-blur-xl shadow-lg rounded-lg p-4 transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
        <div className="mb-12 text-center">
          <img
            src="/okto.png" // Image Path
            alt="Chain Abstraction"
            className="w-72 mx-auto rounded-lg shadow-lg"
          /><h1 className='text-2xl text-black'>Powered by Okto</h1>
        </div>
        </motion.div>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.75 }}
          variants={fadeInUp}
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/10"
        >
          <h2 className="text-4xl text-gray-900 mb-12 text-center">
            Built on Chain Abstraction
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: GemIcon,
                title: 'Multi-Chain Staking',
                description: 'Stake your assets across multiple chains with a unified experience.'
              },
              {
                icon: Shield,
                title: 'Cross-Chain Security',
                description: 'Advanced security mechanisms to protect staked assets across all supported chains.'
              },
              {
                icon: LayoutDashboard,
                title: 'Unified Staking Dashboard',
                description: 'Track and manage all your staking activities in one seamless interface.'
              },
              {
                icon: Users,
                title: 'Community-Driven Protocols',
                description: 'Decentralized governance for protocol upgrades and staking strategies.'
              }

            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
              >
                <feature.icon className="w-12 h-12 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl  text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-900">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeInUp}
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-16 border border-white/10 text-center"
        >
          <h2 className="text-4xl text-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-900 text-lg mb-8 max-w-2xl mx-auto">
            Join us and take your first step into the world of Decentralized Finance
          </p>
          <div className="flex justify-center space-x-4">
            <Link href='/frostboard'><button className="px-8 py-4 bg-blue-500 rounded-lg font-medium text-gray-900 flex items-center space-x-2 hover:bg-blue-300 transition-colors">
              <span>Launch App</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            </Link>
        <a href="https://github.com/leif-runescribe/Frost-Fi"  target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-4 bg-black/50 hover:bg-black/30 border border-white/10 rounded-lg font-medium text-gray-900 transition-all flex items-center space-x-2">
              <GithubIcon className="w-4 h-4" />
              <span>View Source</span>
            </button>
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FullLandingPage;