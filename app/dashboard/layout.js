"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useRequireAuth } from "@/lib/useRequireAuth";


export default function Layout({ children }) {
  const loading = useRequireAuth();
  
  if (loading) return <p>Checking session...</p>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}