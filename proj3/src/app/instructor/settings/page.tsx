import { Fragment } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/instructor-sidebar";

export default function Page() {
  return (
    <Fragment>
      <div className="m-10">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <h1 className="text-3xl">Instructor</h1>
            <p>Settings page content</p>
            {/* {children} */}
          </main>
        </SidebarProvider>
      </div>
    </Fragment>
  );
}
