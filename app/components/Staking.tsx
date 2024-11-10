import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Coins, Wallet, Shield, Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const StakingEducation = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const networks = [
    {
      name: 'Solana',
      protocol: 'Marinade',
      logo: '/mnde.png',
      apy: '8.19%',
      users: '147,548',
      totalStaked: '8,142,628 SOL',
      tvl: '$ 1.6B+'
    },
    {
      name: 'Aptos',
      protocol: 'Tortuga',
      logo: '/apt.png',
      apy: '~7%',
      users: '21,135',
      totalStaked: '315,128.255 APT',
      tvl: '$ 61,361,882'
    },
    {
      name: 'Polygon',
      protocol: 'Ankr',
      logo: '/ankr.png',
      apy: '4.21%',
      users: '4520',
      totalStaked: '977,362.74 POL',
      tvl:'$ 370,811'
    }
  ];

  return (
    <div className="min-h-screen px-12 md:px-40 text-white">
      {/* Hero Section */}
      <motion.section 
        className=" h-screen flex flex-col justify-center items-center text-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="lg:text-6xl md:mt-20 mt-40 text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Understanding Crypto Staking
        </h1>
        <p className="text-xl text-gray-900 font-medium max-w-2xl mb-8">
          Discover how to earn passive income by participating in network security
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-20 h-20 text-blue-400" />
        </motion.div>
      </motion.section>

      {/* What is Staking Section */}
      <motion.section className="py-20 md:px-8" {...fadeIn}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-black mb-12 text-center">What is Staking?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Coins className="w- h-8" />,
                title: "Lock & Earn",
                description: "Lock your crypto assets to earn regular rewards while supporting network security"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure Networks",
                description: "Validators process transactions and secure the network using staked tokens"
              },
              {
                icon: <Wallet className="w-8 h-8" />,
                title: "Passive Income",
                description: "Earn annual yields ranging from 5% to 12% depending on the network"
              }
            ].map((item, index) => (
              <motion.div
                className="bg-white/10 backdrop-blur-xl shadow-lg rounded-xl p-4 transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-blue-900 mb-4">{item.icon}</div>
                <h3 className="text-xl text-black mb-2">{item.title}</h3>
                <p className="text-gray-900">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Network Comparison Section */}
      <motion.section className="py-10 px-4 md:px-8 rounded-xl bg-gray-300/50" {...fadeIn}>
      <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl mb-12 text-black text-center">Popular Staking Protocols</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {networks.map((network, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-xl shadow-lg rounded-xl p-4 transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            {/* Network Logo and Name */}
            <div className="flex items-center mb-4">
              <Image src={network.logo} alt={`${network.name} logo`} width={40} height={40} className="mr-3" />
              <div>
                <h3 className="text-2xl font-medium text-black">{network.name}</h3>
                <p className="text-gray-600 text-lg">{network.protocol}</p>
              </div>
            </div>

            {/* Staking Details */}
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-900">APY</span>
                <span className="text-green-700">{network.apy}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-900">Users</span>
                <span className="text-teal-700">{network.users}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-900">Total Staked</span>
                <span className="text-teal-700">{network.totalStaked}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-900">TVL</span>
                <span className="text-green-700">{network.tvl}</span>
              </li>
            </ul>
            
          </motion.div>
        ))}
      </div>
    </div>
    <div className='text-center text-black mt-10'>More on the way...</div>
      </motion.section>

      {/* FrostFin Platform Section */}
      <motion.section className="py-20 px-4 md:px-8" {...fadeIn}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-black mb-12 text-center">Stake Easily with FrostFin</h2>
          <div className="bg-gradient-to-r from-blue-900/70 to-purple-900/50 p-8 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl mb-4">Chain Abstraction Technology</h3>
                <p className="text-gray-100 mb-6">
                  FrostFin leverages Okto's advanced chain abstraction to simplify multi-chain staking. 
                  Manage all your staked assets across Solana, Aptos, and Polygon from a single dashboard.
                </p>
                <Link href='/frostboard'><motion.button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Staking <ArrowRight className="w-4 h-4" />
                </motion.button>
                </Link>
              </div>
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                />
                <motion.div
                  className="relative bg-gray-700 p-6 rounded-xl border border-gray-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <Layers className="w-12 h-12 text-blue-400 mb-4" />
                  <h4 className="text-xl mb-2">One Platform, Multiple Networks</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Unified dashboard for all networks</li>
                    <li>• Automated reward collection</li>
                    <li>• Simple stake/unstake process</li>
                    <li>• Real-time performance monitoring</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default StakingEducation;