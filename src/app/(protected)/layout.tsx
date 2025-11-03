import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, Header } from "../_components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <main className="w-screen pt-14 flex">
          <SidebarTrigger className="h-screen items-start border-r border-input rounded-none p-6" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
