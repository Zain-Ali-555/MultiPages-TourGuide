"use client";

import { JobsSection } from "@/components/dashboard/jobs-section";
import { Navbar } from "@/components/dashboard/navbar";
import { TourProvider } from "@/components/tour/tour-provider";
import { useTour } from "@/components/tour/tour-provider";
import { tourSteps } from "@/lib/tour-steps";
import { useEffect } from "react";

function JobsPageContent() {
    const { isTourOpen, start } = useTour();
  
    useEffect(() => {
      const tourStatus = localStorage.getItem('tourStatus');
      if (tourStatus === 'running' && !isTourOpen) {
        start();
      }
    }, [isTourOpen, start]);
  
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
                <JobsSection />
            </main>
            <footer className="border-t">
                <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
                    <p className="text-sm text-muted-foreground">&copy; 2024 TourGuideAI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
  }
  
  export default function JobsPage() {
    return (
      <TourProvider steps={tourSteps}>
        <JobsPageContent />
      </TourProvider>
    );
  }
  