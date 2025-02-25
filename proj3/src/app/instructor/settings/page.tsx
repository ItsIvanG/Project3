"use client";

import { Fragment } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/instructor-sidebar";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const name = useUserStore((state) => state.name);
  const role = useUserStore((state) => state.role);

  const router = useRouter();

  useEffect(() => {
    if (role !== "instructor") {
      router.push("/");
    }
  });

  return (
    <Fragment>
      <div className="m-10">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex w-full flex-col">
            <SidebarTrigger />
            <h1 className="text-3xl">Instructor {name}</h1>
            <p>Settings page content</p>
            <div className="grid grid-cols-4 gap-4">
              <div>01</div>
              <div>01</div>
              <div>01</div>
              <div>01</div>
            </div>
            {/* {children} */}
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
