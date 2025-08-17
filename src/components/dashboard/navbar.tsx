"use client"

import { Briefcase, LayoutGrid, User, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTour } from "../tour/tour-provider"

export function Navbar() {
  const { start } = useTour()
  
  return (
    <header id="navbar" className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <Rocket className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">TourGuideAI</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#" className="transition-colors hover:text-primary">Dashboard</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-primary">Jobs</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-primary">Analytics</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-primary">Settings</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button id="replay-tour-btn" variant="outline" size="sm" onClick={start}>Replay Tour</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button id="profile-menu" className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
