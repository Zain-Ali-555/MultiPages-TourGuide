"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Rocket, Settings2, Sparkles } from "lucide-react"

const features = [
  {
    id: 'resume-builder-card',
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "AI Resume Builder",
    description: "Create a professional resume in minutes with our AI-powered builder.",
  },
  {
    id: 'ai-apply-card',
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "AI Apply Tool",
    description: "Automatically apply to jobs that match your profile and preferences.",
  },
  {
    id: 'interview-prep-card',
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Interview Prep",
    description: "Get ready for your interviews with AI-generated questions and tips.",
  },
]

export function FeatureCards() {
  return (
    <section id="feature-cards" className="space-y-6">
      <div className="text-left">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your AI Toolkit</h2>
          <p className="text-muted-foreground md:text-xl">
            Leverage these powerful tools to supercharge your job search.
          </p>
        </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.id} id={feature.id} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{feature.title}</CardTitle>
              {feature.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
