"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const stats = {
    totalUsers: 6,
    newUsers: 4,
    enrolledUsers: 4,
    alerts: 1
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="h-40">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalUsers}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Badge variant="outline" className="flex items-center gap-1">
            <IconTrendingUp className="size-4" />
            {stats.newUsers} new this month
          </Badge>
        </CardFooter>
      </Card>
      <Card className="h-40">
        <CardHeader>
          <CardDescription>New Users</CardDescription>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.newUsers}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Badge variant="outline" className="flex items-center gap-1">
            <IconTrendingUp className="size-4" />
            Last 30 days
          </Badge>
        </CardFooter>
      </Card>
      <Card className="h-40">
        <CardHeader>
          <CardDescription>Users Enrolled in Schemes</CardDescription>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.enrolledUsers}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Badge variant="outline" className="flex items-center gap-1">
            {Math.round((stats.enrolledUsers / stats.totalUsers) * 100)}% of total users
          </Badge>
        </CardFooter>
      </Card>
      <Card className="h-40">
        <CardHeader>
          <CardDescription className="text-red-600">Active Alerts</CardDescription>
          <CardTitle className="text-red-600 text-4xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {stats.alerts}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <Badge variant="outline" className="flex items-center gap-1 text-red-600">
            <IconTrendingDown className="size-4" />
            Requires attention
          </Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
