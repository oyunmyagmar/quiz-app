import { AppSidebar, Header } from "../_components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="w-screen h-screen flex">
        <AppSidebar />
        {children}
      </div>
    </div>
  );
}
