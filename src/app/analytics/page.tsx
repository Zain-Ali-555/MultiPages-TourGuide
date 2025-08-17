"use client";

import { AnalyticsSection } from "@/components/dashboard/analytics-section";
import { Navbar } from "@/components/dashboard/navbar";
import { TourProvider, useTour } from "@/components/tour/tour-provider";
import { tourSteps } from "@/lib/tour-steps";
import { useEffect } from "react";

function AnalyticsPageContent() {
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
                <AnalyticsSection />
            </main>
            <footer className="border-t">
                <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
                    <p className="text-sm text-muted-foreground">&copy; 2024 TourGuideAI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default function AnalyticsPage() {
    return (
        <TourProvider steps={tourSteps}>
            <AnalyticsPageContent />
        </TourProvider>
    );
}
