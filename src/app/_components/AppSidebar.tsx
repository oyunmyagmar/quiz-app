import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Genghis Khan", url: "/" },
  { title: "Figma ашиглах заавар", url: "/" },
  { title: "Санхүүгийн шийдвэрүүд", url: "/" },
  { title: "Figma-д загвар зохион бүтээх аргачлалууд", url: "/" },
  { title: "Санхүүгийн технологи 2023", url: "/" },
  { title: "Хэрэглэгчийн интерфейс дизайны шилдэг туршлага", url: "/" },
  { title: "Архитектур загварчлалын хөтөлбөрүүд", url: "/" },
  { title: "Эрүүл амьдралын хэв маяг", url: "/" },
  { title: "Технологийн салбарт хийгдэж буй инноваци", url: "/" },
];

export function AppSidebar() {
  return (
    <Sidebar className="group-data-[side=left]:border-0">
      <SidebarContent className="bg-background pt-14">
        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="text-xl leading-7 h-10 py-1.5 font-semibold text-foreground">
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarFooter />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
