"use client";

import { SettingsSection } from "@/components/dashboard/settings-section";
import { Navbar } from "@/components/dashboard/navbar";
import { TourProvider, useTour } from "@/components/tour/tour-provider";
import { tourSteps } from "@/lib/tour-steps";
import { useEffect } from "react";

function SettingsPageContent() {
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
            <main className="flex-1 bg-card">
                <SettingsSection />
            </main>
            <footer className="border-t">
                <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
                    <p className="text-sm text-muted-foreground">&copy; 2024 TourGuideAI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <TourProvider steps={tourSteps}>
            <SettingsPageContent />
        </TourProvider>
    );
}
