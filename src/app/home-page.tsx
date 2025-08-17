"use client";

import { Dashboard } from '@/components/dashboard/dashboard';
import { useTour } from '@/components/tour/tour-provider';
import { useEffect } from 'react';

export default function HomePage() {
  const { isTourOpen, start, steps } = useTour();

  useEffect(() => {
    // If the tour was running and the user lands here, restart it if not already open.
    const tourStatus = localStorage.getItem('tourStatus');
    if (tourStatus === 'running' && !isTourOpen) {
      start();
    }
  }, [isTourOpen, start]);

  return <Dashboard tourSteps={steps} />;
}
