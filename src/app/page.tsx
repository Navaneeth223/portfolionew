'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/components/Preloader';
import ProgressRail from '@/components/ProgressRail';
import CustomCursor from '@/components/CustomCursor';
import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import MoreWork from '@/components/sections/MoreWork';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import RadialContextMenu from '@/components/RadialContextMenu';

// ThreeBackground dynamically imported with ssr: false (touches WebGL canvas)
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-ink relative selection:bg-signal selection:text-bg overflow-x-hidden">
      {/* Boot sequence load-in */}
      <Preloader />

      {/* Persistent WebGL 3D Node Network Canvas */}
      <ThreeBackground />

      {/* Persistent Section Navigation Rail (Desktop) */}
      <ProgressRail />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Radial Right-Click Context Menu (fine pointer / desktop only) */}
      <RadialContextMenu />

      {/* Navigation Header */}
      <Nav />

      {/* Main Single Page Sections */}
      <div className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <MoreWork />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
