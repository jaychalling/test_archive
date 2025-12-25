import React, { Suspense } from 'react';
import { Clock, Users, Search, ArrowRight, Play, Activity, Heart, Smile } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchTests, TestInfo } from '@/utils/api';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const tests = await fetchTests();

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-slate-400 font-bold">Loading...</div>}>
      <HomeClient initialTests={tests} />
    </Suspense>
  );
}
