'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Lock, Shield, Zap, Wallet, 
   Box, Users, Code2, Gem,
  ChevronRight, ExternalLink, GithubIcon,
  BarChart2, ArrowUpRight
} from 'lucide-react';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';
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

  // Stats data
  const stats = [
    { label: 'Total Value Locked', value: '$766,129,153' },
    { label: 'Active Users', value: '50,000+' },
    { label: 'Total Loans', value: '125,000+' },
    { label: 'Average APY', value: '0%' }
  ];

  // Sample chart data
  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 }
  ];

  return (
    <div style={{ backgroundImage: "url('/d.avif')" }} className="min-h-screen  from-blue-950 via-gray-900 to-black">
      {/* Animated background elements */}
      

      {/* Main glass container */}
      <div className="relative min-h-screen mx-auto max-w-7xl my- px-4 space-y-32">
        {/* Main glass panel */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
        >
          
        
          {/* Previous content remains the same until Features section */}
          {/* ... (Previous content from the last example) ... */}
        </motion.div>

        {/* Statistics Section */}
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

        {/* How It Works Section */}
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
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'borrow' 
                    ? 'bg-blue-100 text-gray-900' 
                    : 'text-gray-800 hover:text-gray-900'
                }`}
              >
               App FLow
              </button>
              <button
                onClick={() => setActiveTab('lend')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'lend' 
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
                    ['Connect Wallet', 'Deposit Funds', `That's it!`][step-1]
                  ) : (
                    ['Polygon', 'Solana', 'Aptos'][step-1]
                  )}
                </h3>
                <p className="text-gray-900">
                  {activeTab === 'borrow' ? (
                    ['Connect your wallet to get on the FrostBoard.', 'Deposit tokens to your chains', 'Participate in Multi Chain Defi.'][step-1]
                  ) : (
                    ['.', '.', '.'][step-1]
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Market Overview Section */}
        {/* Market Overview Section */}
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
      <h2 className="text-4xl  text-gray-900">Market Overview</h2>
      <p className="text-cyan-900 text-lg">
        Track real-time market statistics and protocol performance with our
        comprehensive analytics dashboard.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: '24h Volume', value: '$12.5M' },
          { label: 'Active Loans', value: '1,250' },
          { label: 'Liquidation Ratio', value: '150%' },
          { label: 'Protocol Fee', value: '0.1%' }
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
    <LineChart
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" stroke="#ffffff40" />
      <YAxis stroke="#ffffff40" />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke="#3b82f6" 
        strokeWidth={2}
        dot={{ stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6', r: 4 }}
        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
      />
    </LineChart>
  </ResponsiveContainer>
</motion.div>
  </div>
</motion.section>
        {/* Security Features */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.75 }}
          variants={fadeInUp}
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/10"
        >
          <h2 className="text-4xl text-gray-900 mb-12 text-center">
            Enterprise-Grade Security
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Audited Protocol',
                description: 'Multiple security audits by leading firms'
              },
              {
                icon: Lock,
                title: 'Secure Vaults',
                description: 'Multi-signature security for all assets'
              },
              {
                icon: Code2,
                title: 'Open Source',
                description: 'Transparent, verified smart contracts'
              },
              {
                icon: Users,
                title: 'DAO Governed',
                description: 'Community-driven security decisions'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
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
            Join thousands of users already benefiting from our decentralized lending protocol.
            Start borrowing or lending today with zero interest rates.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-4 bg-blue-500 rounded-lg font-medium text-gray-900 flex items-center space-x-2 hover:bg-blue-300 transition-colors">
              <span>Launch App</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 bg-black/50 hover:bg-black/30 border border-white/10 rounded-lg font-medium text-gray-900 transition-all flex items-center space-x-2">
              <GithubIcon className="w-4 h-4" />
              <span>View Source</span>
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FullLandingPage;