"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Building, MapPin, Sparkles } from "lucide-react"

const jobListings = [
  {
    id: "job-card-1",
    title: "AI/ML Engineer",
    company: "Innovate AI",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Seeking a skilled AI/ML Engineer to develop and deploy cutting-edge machine learning models.",
  },
  {
    id: "job-card-2",
    title: "Data Scientist",
    company: "DataDriven Inc.",
    location: "New York, NY",
    type: "Full-time",
    description: "Join our data science team to analyze large datasets and extract valuable insights.",
  },
  {
    id: "job-card-3",
    title: "Research Scientist, AI",
    company: "Future Forward Labs",
    location: "Boston, MA",
    type: "Remote",
    description: "Conduct groundbreaking research in artificial intelligence and publish your findings.",
  },
]

export function JobsSection() {
  return (
    <section id="jobs-section" className="w-full bg-background py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Recommended Jobs</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Here are some job openings we've found that match your profile.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {jobListings.map((job) => (
            <Card key={job.id} id={job.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                  <Building className="h-4 w-4" /> {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs">
                    <Briefcase className="h-3 w-3" />
                    {job.type}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Apply with AI
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
