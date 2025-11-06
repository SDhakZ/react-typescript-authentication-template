import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { Outlet } from "react-router-dom";
import { LucideRefreshCw } from "lucide-react";

export default function DashboardLayout() {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = () => {
    setIsSpinning(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          {/* Top bar with trigger and breadcrumb */}
          <div className="flex items-center w-full gap-3 py-3 bg-white border-b">
            <SidebarTrigger />
            <span className="text-slate-400">|</span>
            <div>
              <BreadcrumbNav />
            </div>
            <button
              onClick={handleRefresh}
              className="flex cursor-pointer items-center justify-center gap-2 px-2 py-1 ml-auto mr-4 text-sm text-gray-600 transition-colors duration-150 border border-gray-400 rounded-full hover:bg-gray-100"
            >
              <LucideRefreshCw
                className={`w-3.5 h-3.5  text-gray-600 ${
                  isSpinning ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>
          </div>
          {/* Main content */}
          <main className="w-full p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
