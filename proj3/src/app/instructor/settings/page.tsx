"use client";

import { Fragment } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/instructor-sidebar";
import { useUserStore } from "@/store";

export default function Page() {
  const name = useUserStore((state) => state.name);

  return (
    <Fragment>
      <div className="m-10">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <h1 className="text-3xl">Instructor {name}</h1>
            <p>Settings page content</p>
            {/* {children} */}
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
