"use client"

import { BarChart, LineChart, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, Bar, Line, ResponsiveContainer, Tooltip as RechartsTooltip, Area } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const barChartData = [
  { month: "January", applications: 12 },
  { month: "February", applications: 19 },
  { month: "March", applications: 15 },
  { month: "April", applications: 22 },
  { month: "May", applications: 18 },
  { month: "June", applications: 25 },
]

const lineChartData = [
  { date: "2024-01", score: 65 },
  { date: "2024-02", score: 72 },
  { date: "2024-03", score: 70 },
  { date: "2024-04", score: 85 },
  { date: "2024-05", score: 88 },
  { date: "2024-06", score: 92 },
]

const chartConfig = {
	applications: {
		label: "Applications",
		color: "hsl(var(--primary))",
	},
  score: {
    label: "Resume Score",
    color: "hsl(var(--accent))",
  }
}

export function AnalyticsSection() {
  return (
    <section id="analytics" className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Analytics</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Track your job application performance and resume strength.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card id="bar-chart-card">
            <CardHeader>
              <CardTitle>Applications per Month</CardTitle>
              <CardDescription>See your application activity over the past six months.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart data={barChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="applications" fill="var(--color-applications)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card id="line-chart-card">
            <CardHeader>
              <CardTitle>AI Resume Score</CardTitle>
              <CardDescription>This chart tracks the AI-powered score of your resume over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <LineChart data={lineChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
