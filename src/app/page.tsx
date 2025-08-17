
"use client";

import HomePage from './home-page';
import { TourProvider } from '@/components/tour/tour-provider';
import { tourSteps } from '@/lib/tour-steps';

export default function Home() {
  return (
    <TourProvider steps={tourSteps}>
      <HomePage />
    </TourProvider>
  );
}
