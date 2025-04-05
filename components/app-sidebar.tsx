"use client"

import * as React from "react"
import {
  IconBell,
  IconFileWord,
  IconReport,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

const data = {
  user: {
    name: "Kanishk Kumar",
    email: "kanishkkumar127@gmail.com",
    avatar: "/images/Kanishk.jpg",
  },
  actions: [
    {
      name: "Update Government Schemes",
      url: "/admin/government-schemes",
      icon: IconReport,
    },
    {
      name: "Add Alerts",
      url: "/admin/add-alerts",
      icon: IconBell,
    },
    {
      name: "Will be Adding",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href="/admin">
        <Image src="/images/Logo1.png" alt="Logo" width={132} height={32} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavDocuments items={data.actions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
