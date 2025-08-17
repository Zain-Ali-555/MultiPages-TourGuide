"use client"

import { Button } from "@/components/ui/button"
import { useTour } from "@/components/tour/tour-provider"
import { PlayCircle } from "lucide-react"

export function Hero() {
  const { start } = useTour()

  return (
    <section id="hero" className="w-full bg-card py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center md:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome to Your AI Jobs Dashboard
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Everything you need to land your dream job in AI, all in one place. Let's take a quick tour of your new toolkit.
          </p>
          <Button size="lg" onClick={start}>
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Interactive Tour
          </Button>
        </div>
      </div>
    </section>
  )
}
