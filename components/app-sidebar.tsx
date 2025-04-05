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
import { supabase } from "../lib/utils/client"
import { useState, useEffect } from "react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: "/images/default-avatar.png", // default fallback avatar
  });

  const actions = [
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
  ]

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        const { data, error } = await supabase
          .from("user")
          .select("*")
          .eq("userid", session.user.id)
          .single()

        if (!error && data) {
          setUserData({
            name: data.name,
            email: data.email,
            avatar: "/images/Kanishk.jpg", // Optional: use dynamic avatar from db if you add that
          })
        }
      }
    }

    fetchUser()
  }, [])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href="/admin">
          <Image src="/images/Logo1.png" alt="Logo" width={132} height={32} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavDocuments items={actions} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
