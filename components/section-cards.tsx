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
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="h-32">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1000
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-32">
        <CardHeader>
          <CardDescription>New Users</CardDescription>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            234
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="h-32">
        <CardHeader>
          <CardDescription>Users Enrolled in Schemes</CardDescription>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            878
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-red-600">Alerts</CardDescription>
          <CardTitle className="text-red-600 text-4xl font-semibold tabular-nums @[250px]/card:text-4xl">
            4
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
