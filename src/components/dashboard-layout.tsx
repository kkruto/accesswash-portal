// src/components/dashboard-layout.tsx
"use client";

import { useEffect, useState } from "react";
import { getProfile, customerLogout } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AWLogo } from "./AWLogo";
import { 
  Home, 
  User, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  Settings
} from "lucide-react";

function DashboardLayout({ tenant, children }: { tenant: string; children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getProfile(tenant);
        setUser(data);
      } catch (error) {
        toast.error("Error", { description: (error as Error).message });
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [tenant]);

  const handleLogout = async () => {
    try {
      await customerLogout(tenant);
      toast.success("Logged out", { description: "Redirecting to login..." });
      window.location.href = `/portal/${tenant}/login`;
    } catch (error) {
      toast.error("Error", { description: (error as Error).message });
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      href: `/portal/${tenant}/dashboard`,
      icon: Home,
      current: pathname === `/portal/${tenant}/dashboard`
    },
    {
      name: "Profile",
      href: `/portal/${tenant}/profile`,
      icon: User,
      current: pathname === `/portal/${tenant}/profile`
    },
    {
      name: "Service Requests",
      href: `/portal/${tenant}/requests`,
      icon: FileText,
      current: pathname?.startsWith(`/portal/${tenant}/requests`)
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <AWLogo compact />
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          {user && (
            <div className="px-6 py-4 border-b border-border bg-accent/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.email || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">Customer Portal</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`sidebar-link ${item.current ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
        </nav>

          {/* Footer actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Link
              href={`/portal/${tenant}/settings`}
              className="sidebar-link"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            
            {user && (
              <Button 
                onClick={handleLogout} 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-0">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-6 bg-card border-b border-border shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">
              {navigation.find(item => item.current)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-accent transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="loading-spinner w-8 h-8"></div>
              </div>
            ) : (
              children
            )}
          </div>
      </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
export { DashboardLayout };