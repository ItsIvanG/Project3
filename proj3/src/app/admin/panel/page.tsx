"use client";

import { Fragment } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-sidebar"; // Replace with admin sidebar if available
import { useUserStore } from "@/store";
import UserBadge from "@/custom/UserBadge";

export default function AdminPanel() {
  const name = useUserStore((state) => state.name);
  const role = useUserStore((state) => state.role);

  return (
    <Fragment>
      <div className="md:m-10 m-5">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex w-full flex-col">
            <div className="flex justify-between items-center">
              <SidebarTrigger />
              <UserBadge name={name} pic="admin-profile-pic" role={role} />
            </div>
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
