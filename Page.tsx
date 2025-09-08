"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Plus, Settings } from "lucide-react"

interface TimeZoneData {
  name: string
  abbreviation: string
  offset: string
  location: string
}

const timeZones: TimeZoneData[] = [
  { name: "Your Local Time", abbreviation: "LOCAL", offset: "", location: "Current Location" },
  { name: "Pacific Standard Time", abbreviation: "PST", offset: "America/Los_Angeles", location: "Los Angeles, CA" },
  { name: "Eastern Standard Time", abbreviation: "EST", offset: "America/New_York", location: "New York, NY" },
  { name: "United Kingdom Time", abbreviation: "UK", offset: "Europe/London", location: "London, UK" },
  { name: "Belgium Time", abbreviation: "BE", offset: "Europe/Brussels", location: "Brussels, Belgium" },
]

export default function TimeTracker() {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>({})
  const [currentDates, setCurrentDates] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const updateTimes = () => {
      const times: { [key: string]: string } = {}
      const dates: { [key: string]: string } = {}

      timeZones.forEach((tz) => {
        const now = new Date()
        let timeString: string
        let dateString: string

        if (tz.abbreviation === "LOCAL") {
          timeString = now.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          dateString = now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        } else {
          timeString = now.toLocaleTimeString("en-US", {
            timeZone: tz.offset,
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          dateString = now.toLocaleDateString("en-US", {
            timeZone: tz.offset,
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }

        times[tz.abbreviation] = timeString
        dates[tz.abbreviation] = dateString
      })

      setCurrentTimes(times)
      setCurrentDates(dates)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)

    return () => clearInterval(interval)
  }, [])

  const getTimeZoneStatus = (abbreviation: string) => {
    if (abbreviation === "LOCAL") return "primary"
    return "secondary"
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Discord Event Planner</h1>
            <p className="text-muted-foreground">Track multiple time zones for seamless event coordination</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </div>
        </div>

        {/* Time Zone Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {timeZones.map((tz) => (
            <Card key={tz.abbreviation} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{tz.name}</CardTitle>
                  <Badge variant={getTimeZoneStatus(tz.abbreviation) as any}>{tz.abbreviation}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tz.location}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-mono font-bold text-foreground">
                    {currentTimes[tz.abbreviation] || "--:--:--"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{currentDates[tz.abbreviation] || "Loading..."}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Event Planning Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Event Scheduler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Event Name</label>
                <input
                  type="text"
                  placeholder="Discord Gaming Session"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Time Zone</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="local">Your Local Time</option>
                  <option value="pst">Pacific Time (PST)</option>
                  <option value="est">Eastern Time (EST)</option>
                  <option value="uk">United Kingdom Time (UK)</option>
                  <option value="be">Belgium Time (BE)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Event
              </Button>
              <Button variant="outline">Copy Times</Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Perfect for coordinating Discord events across different time zones
        </div>
      </div>
    </div>
  )
}
