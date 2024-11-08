'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Zap, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FNavbar from '@/app/components/FixedNav'; // Assuming these components are custom
import InteractiveSharpTorusComponent from '@/app/components/Sphere';
import StakingEducation from '../components/Staking';

const DashboardPage = () => {
  return (
    <div style={{ backgroundImage: "url('/d.avif')"}} className="min-h-screen  text-white">
      {/* Navbar */}
      <FNavbar />
      <StakingEducation/>
      </div>
  );
};

export default DashboardPage;
