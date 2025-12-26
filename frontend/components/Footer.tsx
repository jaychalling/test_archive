'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Activity, Mail, Github } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 mb-4">
                            <Image
                                src="/logo.png"
                                alt="Test Archive Logo"
                                width={24}
                                height={24}
                                className="w-6 h-6 object-contain"
                                unoptimized
                            />
                            <span>Test Archive</span>
                        </Link>
                        <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                            Your go-to library for every type of test. Whether you need a serious health check-up or a fun break, find the perfect assessment for you right here.
                        </p>
                    </div>

                    {/* Tests Column */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Tests</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/test/kpop-hunter" className="hover:text-blue-600 transition-colors">K-Pop Hunter Test</Link></li>
                            <li><Link href="/test/cognitive-brain" className="hover:text-blue-600 transition-colors">Cognitive Brain Test</Link></li>
                            <li><Link href="/test/diabetes" className="hover:text-blue-600 transition-colors">Diabetes Risk Test</Link></li>
                            <li><Link href="/test/body-age" className="hover:text-blue-600 transition-colors">Biological Age Test</Link></li>
                            <li className="text-slate-300">Burnout Syndrome (Coming soon)</li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Legal & Support</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors font-medium">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                            <li>
                                <a href="mailto:support@test-archive.com" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                    <Mail className="w-4 h-4" /> Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400">
                        &copy; {currentYear} Test Archive. All rights reserved.
                        <span className="ml-2 italic text-slate-300">Not a substitute for professional medical advice.</span>
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-300">v1.0.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
