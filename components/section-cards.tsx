"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/utils/client"
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
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    enrolledUsers: 0,
    alerts: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setError(null)
        setLoading(true)

        // Get total users
        const { count: totalCount, error: totalError } = await supabase
          .from('user')
          .select('*', { count: 'exact', head: true })

        if (totalError) throw totalError

        // Get new users (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        
        const { count: newCount, error: newError } = await supabase
          .from('user')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', thirtyDaysAgo.toISOString())

        if (newError) throw newError

        // Get enrolled users (assuming there's a scheme_enrollment table)
        const { count: enrolledCount, error: enrolledError } = await supabase
          .from('scheme_enrollment')
          .select('*', { count: 'exact', head: true })

        if (enrolledError) throw enrolledError

        // Get alerts (assuming there's an alerts table)
        const { count: alertCount, error: alertError } = await supabase
          .from('alerts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active')

        if (alertError) throw alertError

        setStats({
          totalUsers: totalCount || 0,
          newUsers: newCount || 0,
          enrolledUsers: enrolledCount || 0,
          alerts: alertCount || 0
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-40">
            <CardHeader>
              <CardDescription>Loading...</CardDescription>
              <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ...
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 lg:px-6">
        <p className="text-red-500">Error loading statistics: {error}</p>
      </div>
    )
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
