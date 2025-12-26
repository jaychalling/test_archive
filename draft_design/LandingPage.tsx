"use client";

import React, { useState } from 'react';
import { Clock, Users, Search, ArrowRight, Play, Activity, Heart, Smile } from 'lucide-react';

// 1. Mock Data Integration
const INITIAL_TESTS = [
    {
        id: 'diabetes',
        title: 'Type 2 Diabetes Risk Test',
        description: 'Assess your risk factors for Type 2 Diabetes based on lifestyle and family history.',
        category: 'Health',
        duration: '3 min',
        participants: '1.2k',
        isFeatured: true, // Hero Item
        image: 'bg-blue-600', // Placeholder for gradient/image
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
    },
];

const CATEGORIES = ['All', 'Health', 'Personality', 'Fun'];

export default function LandingPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter Logic
    const filteredTests = INITIAL_TESTS.filter((test) => {
        const matchesCategory = activeCategory === 'All' || test.category === activeCategory;
        const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch && !test.isFeatured;
    });

    const featuredTest = INITIAL_TESTS.find((t) => t.isFeatured) || INITIAL_TESTS[0];

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
            {/* Navbar (Simplified) */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-extrabold text-xl text-slate-900 tracking-tight">
                        <Activity className="w-6 h-6 text-blue-600" />
                        Test Archive
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 border border-transparent focus-within:border-blue-500 transition-all">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tests..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-48"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition">
                            Login
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">

                {/* 2A. Hero Section */}
                {
                    featuredTest && (
                        <section className="mb-12 rounded-3xl overflow-hidden shadow-2xl relative text-white">
                            <div className={`absolute inset-0 ${featuredTest.image} opacity-90 bg-gradient-to-r from-blue-900 to-blue-600`}></div>
                            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="md:w-2/3 space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                        Featured Test
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                        {featuredTest.title}
                                    </h1>
                                    <p className="text-lg text-blue-100 max-w-xl leading-relaxed">
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
                                            <span className="px-2 py-0.5 bg-white/20 rounded">{featuredTest.category}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="group bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center gap-2">
                                            Start Test <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                {/* Optional Hero Image/Illustration */}
                                <div className="hidden md:block md:w-1/3">
                                    <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                                        <Activity className="w-32 h-32 text-white/80" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                {/* 2B. Category & Filter */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 sticky top-16 z-40 bg-gray-50/95 py-4 backdrop-blur-sm">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        {
                            CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                                  px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap
                                  ${activeCategory === cat
                                            ? 'bg-slate-900 text-white shadow-md transform scale-105'
                                            : 'bg-white text-slate-600 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'}
                                `}
                                >
                                    {cat}
                                </button>
                            ))
                        }
                    </div>

                    <div className="text-sm text-gray-500 font-medium">
                        Showing {filteredTests.length} tests
                    </div>
                </div>

                {/* 2C. Enhanced Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        filteredTests.map((test) => (
                            <div
                                key={test.id}
                                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${test.image}`}>
                                        {/* Icon logic based on category */}
                                        {
                                            test.category === 'Health' && <Activity className="w-6 h-6" />}
                                        {
                                            test.category === 'Personality' && <Smile className="w-6 h-6" />}
                                        {
                                            test.category === 'Fun' && <Play className="w-6 h-6" />}
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide
                                  ${test.category === 'Health' ? 'bg-red-50 text-red-600' :
                                            test.category === 'Personality' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}
                                `}>
                                        {test.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
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
