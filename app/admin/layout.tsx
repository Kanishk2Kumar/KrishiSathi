"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/lib/utils/client";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const Layout = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false); // State to control AlertDialog visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to store the alert message
  const router = useRouter();

  useEffect(() => {
    // Fetch the current user's role
    const fetchUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        // Fetch the user's profile or role from the `user` table
        const { data: userData, error: userError } = await supabase
          .from("user") // Use the correct table name
          .select("userType")
          .eq("userid", user?.id)
          .single();

        // Check if the user is an admin
        console.log(userData?.userType)
        if (userData?.userType === "ADMIN") {
          setIsAdmin(true);
        } else {
          // Set alert message for non-admin users
          setAlertMessage("You do not have permission to access this page.");
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setAlertMessage("An error occurred. Please try again later.");
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [router]);

  // Handle AlertDialog close
  const handleAlertClose = () => {
    setShowAlert(false);
    router.push("/"); // Redirect to home or login page after closing the dialog
  };

  // Show a loading state while checking the user's role
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the layout only if the user is an admin
  if (!isAdmin) {
    return (
      <AlertDialog open={showAlert} onOpenChange={handleAlertClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Access Denied</AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAlertClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
