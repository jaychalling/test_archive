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

    // Debounce timer logic
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (val: string) => {
        // 1. If we are on the home page, just emit an event for instant JS filtering
        if (pathname === '/') {
            const event = new CustomEvent('test-search-event', { detail: val });
            window.dispatchEvent(event);
        } else {
            // 2. If we are NOT on home page, navigate to home with query param
            const params = new URLSearchParams();
            if (val) params.set('q', val);
            router.push(`/?${params.toString()}`);
        }
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // 300ms debounce to prevent flickering
        timerRef.current = setTimeout(() => {
            handleSearch(val);
        }, 300);
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
                            onChange={onSearchChange}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
