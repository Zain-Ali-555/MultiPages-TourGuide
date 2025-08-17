"use client";

import type { TourStep } from '@/components/tour/tour-provider';
import { TourProvider } from '@/components/tour/tour-provider';
import { Navbar } from '@/components/dashboard/navbar';
import { Hero } from '@/components/dashboard/hero';
import { FeatureCards } from '@/components/dashboard/feature-cards';
import { AnalyticsSection } from '@/components/dashboard/analytics-section';
import { SettingsSection } from '@/components/dashboard/settings-section';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Send, Sparkles } from 'lucide-react';
import { Progress } from '../ui/progress';

export function Dashboard({ tourSteps }: { tourSteps: Omit<TourStep, 'content'>[] }) {
  return (
    <TourProvider steps={tourSteps}>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <main className="flex-1 bg-background">
          <Hero />
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:px-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FeatureCards />
            </div>
            <div className="space-y-8">
              <Card id="progress-tracker" className="w-full">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between">
                        <p className="text-sm font-medium">Profile Completion</p>
                        <p className="text-sm font-medium text-primary">75%</p>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div>
                      <div className="mb-2 flex justify-between">
                        <p className="text-sm font-medium">Applications Sent</p>
                        <p className="text-sm font-medium text-primary">5/20</p>
                      </div>
                      <Progress value={25} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card id="tools-section" className="w-full">
                <CardHeader>
                  <CardTitle>Resume & Apply Tools</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Button variant="outline"><FileText className="mr-2 h-4 w-4" />AI Resume Builder</Button>
                  <Button variant="outline"><Send className="mr-2 h-4 w-4" />Cover Letter Generator</Button>
                  <Button><Sparkles className="mr-2 h-4 w-4" />Auto-Apply with AI</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <AnalyticsSection />
          <SettingsSection />
        </main>
        <footer className="border-t">
          <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
            <p className="text-sm text-muted-foreground">&copy; 2024 TourGuideAI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </TourProvider>
  );
}
