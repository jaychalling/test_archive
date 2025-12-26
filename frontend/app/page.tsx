"use client";

import React, { useState, Suspense } from 'react';
import { Clock, Users, Search, ArrowRight, Play, Activity, Heart, Smile, Brain, Music, Droplet, Dna, Fingerprint, Zap, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// 1. Mock Data Integration
const INITIAL_TESTS = [
  {
    id: 'cognitive-brain',
    title: 'Cognitive Brain Test',
    description: 'Measure your brain health age by analyzing frontal, temporal, and parietal lobe functions through 20 precise questions.',
    category: 'Health',
    duration: '10 min',
    participants: 'New',
    isFeatured: false,
    image: 'bg-indigo-700',
    isDisabled: false,
    icon: Brain,
  },
  {
    id: 'kpop-hunter',
    title: 'K-Pop Hunter Character Test',
    description: 'Find your soul character among the legendary Demon Hunters! Based on your personality and choices.',
    category: 'Fun',
    duration: '5 min',
    participants: '15.4k',
    isFeatured: true,
    image: 'bg-pink-600',
    icon: Music,
  },
  {
    id: 'diabetes',
    title: 'Type 2 Diabetes Risk Test',
    description: 'Assess your risk factors for Type 2 Diabetes based on lifestyle and family history.',
    category: 'Health',
    duration: '3 min',
    participants: '1.2k',
    isFeatured: false,
    image: 'bg-blue-600',
    icon: Droplet,
  },
  {
    id: 'body-age',
    title: 'Biological Age Test',
    description: 'Discover if your body is aging faster or slower than your chronological age.',
    category: 'Health',
    duration: '4 min',
    participants: '3.1k',
    isFeatured: false,
    image: 'bg-indigo-600',
    icon: Dna,
  },
  {
    id: 'mbti',
    title: '16 Personality Types',
    description: 'Discover your personality type with our in-depth psychological analysis.',
    category: 'Personality',
    duration: '10 min',
    participants: '50k+',
    isFeatured: false,
    image: 'bg-purple-500',
    isDisabled: true,
    icon: Fingerprint,
  },
  {
    id: 'stress',
    title: 'Stress Level Indicator',
    description: 'Measure your current stress levels and get actionable advice.',
    category: 'Health',
    duration: '5 min',
    participants: '8.5k',
    isFeatured: false,
    image: 'bg-green-500',
    isDisabled: true,
    icon: Zap,
  },
  {
    id: 'iq',
    title: 'Logical IQ Test',
    description: 'Challenge your cognitive abilities with these logic puzzles.',
    category: 'Fun',
    duration: '15 min',
    participants: '20k+',
    isFeatured: false,
    image: 'bg-orange-500',
    isDisabled: true,
    icon: Lightbulb,
  },
  {
    id: 'eq',
    title: 'Emotional Intelligence',
    description: 'Understand how well you perceive and manage emotions.',
    category: 'Personality',
    duration: '8 min',
    participants: '12k',
    isFeatured: false,
    image: 'bg-pink-500',
    isDisabled: true,
    icon: Heart,
  },
];

const CATEGORIES = ['All', 'Health', 'Personality', 'Fun'];

function HomeContent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // Filter Logic
  const filteredTests = INITIAL_TESTS.filter((test) => {
    const matchesCategory = activeCategory === 'All' || test.category === activeCategory;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !test.isFeatured;
  });

  const featuredTest = INITIAL_TESTS.find((t) => t.isFeatured) || INITIAL_TESTS[0];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* 2A. Hero Section */}
        {
          featuredTest && (
            <section className="mb-12 rounded-3xl overflow-hidden shadow-2xl relative text-white min-h-[400px] flex items-center">

              {/* Conditional Background Logic */}
              {featuredTest.id === 'kpop-hunter' ? (
                <>
                  <Image
                    src="/images/kpop_hero_image.png"
                    alt="K-Pop Hunter"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]"></div>
                </>
              ) : (
                /* Fallback Gradient for other tests */
                <div className={`absolute inset-0 ${featuredTest.image} opacity-90 bg-gradient-to-r from-blue-900 to-blue-600`}></div>
              )}

              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
                <div className="md:w-2/3 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse shadow-[0_0_10px_rgba(244,114,182,0.8)]"></span>
                    Now Trending
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                    {featuredTest.title}
                  </h1>
                  <p className="text-lg md:text-xl text-blue-50 max-w-xl leading-relaxed drop-shadow-md font-medium">
                    {featuredTest.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm font-medium text-blue-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {featuredTest.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> {featuredTest.participants} participants
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-white/20 rounded border border-white/10">{featuredTest.category}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link href={`/test/${featuredTest.id}`} className="group bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-blue-50 transition-all flex items-center gap-2 inline-flex">
                      Start Test <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Optional Hero Icon/Illustration - Keep simplicity or remove if image is busy */}
                <div className="hidden md:block md:w-1/3 text-right">
                  {/* Image is background now, so we can remove the large icon or keep it small */}
                </div>
              </div>
            </section>
          )}

        {/* 2B. Category & Filter */}
        <div className="flex flex-row items-center justify-center mb-8 gap-4 sticky top-16 z-40 bg-gray-50/95 py-3 backdrop-blur-sm shadow-sm border-b border-gray-100">
          <div className="flex gap-2 overflow-x-auto max-w-[80vw] justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {
              CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                  px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-sm
                  ${activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-500 border border-gray-200 hover:bg-white hover:text-slate-900 hover:border-slate-300 hover:shadow-sm'}
                `}
                >
                  {cat}
                </button>
              ))
            }
          </div>

          <div className="hidden md:block text-xs font-bold text-gray-400 tracking-wide uppercase shrink-0">
            Showing <span className="text-slate-900 text-sm ml-1">{filteredTests.length}</span>
          </div>
        </div>

        {/* 2C. Enhanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            filteredTests.map((test) => (
              <Link
                key={test.id}
                href={test.isDisabled ? '#' : `/test/${test.id}`}
                className={`flex flex-col h-full ${test.isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={(e) => test.isDisabled && e.preventDefault()}
              >
                <div
                  className={`
                    group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col h-full relative overflow-hidden
                    ${test.isDisabled ? 'opacity-70 grayscale' : 'hover:shadow-xl transition-all duration-300 hover:-translate-y-1'}
                  `}
                >
                  {/* Coming Soon Overlay */}
                  {test.isDisabled && (
                    <div className="absolute inset-0 bg-slate-100/10 backdrop-blur-[1px] flex items-center justify-center z-10">
                      <span className="bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">Coming Soon</span>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${test.image}`}>
                      {/* Specific Icon */}
                      <test.icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide
                    ${test.category === 'Health' ? 'bg-red-50 text-red-600' :
                        test.category === 'Personality' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}
                  `}>
                      {test.category}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold text-slate-800 mb-2 ${!test.isDisabled && 'group-hover:text-blue-600'} transition-colors`}>
                    {test.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {test.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs font-medium text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {test.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> {test.participants}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>

        {
          filteredTests.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>No tests found matching your criteria.</p>
            </div>
          )
        }

      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-slate-400 font-bold">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
