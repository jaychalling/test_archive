'use client';

import React from 'react';
import { Activity, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('q') || '';

    const handleSearch = (val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (val) {
            params.set('q', val);
        } else {
            params.delete('q');
        }

        // Always navigate to home on search if not already there, 
        // or just update current URL if on home.
        if (pathname === '/') {
            router.replace(`/?${params.toString()}`);
        } else {
            router.push(`/?${params.toString()}`);
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo.png"
                        alt="Test Archive Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                        unoptimized
                    />
                    Test Archive
                </Link>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 border border-transparent focus-within:border-blue-500 transition-all">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tests..."
                            className="bg-transparent border-none outline-none text-sm ml-2 w-48"
                            defaultValue={initialSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
