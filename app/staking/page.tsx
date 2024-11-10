'use client';
import React from 'react';
import FNavbar from '@/app/components/FixedNav';
import StakingEducation from '../components/Staking';

const DashboardPage = () => {
  return (
    <div style={{ backgroundImage: "url('/d.avif')"}} className="min-h-screen  text-white">

      <FNavbar />
      <StakingEducation/>
      </div>
  );
};

export default DashboardPage;
