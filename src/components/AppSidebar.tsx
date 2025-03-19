import {
  Calendar,
  Clock,
  Download,
  HelpCircle,
  HousePlug,
  Info,
  Moon,
  Sun,
  Wallet,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/context/ThemeContext";
import { useTutorial } from "@/context/TutorialContext";
import { useLocation, useNavigate } from "react-router";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { setShowTutorial } = useTutorial();

  const footerItems = [
    {
      title: "Help & Tutorial",
      action: () => {
        setShowTutorial(true);
        if (isMobile) toggleSidebar();
      },
      icon: HelpCircle,
    },
    {
      title: "Export Data",
      action: () => {
        alert("Oops! This feature is still in development.");
        if (isMobile) toggleSidebar();
      },
      icon: Download,
    },
    {
      title: theme === "light" ? "Dark Mode" : "Light Mode",
      action: toggleTheme,
      icon: theme === "light" ? Moon : Sun,
    },
  ];

  const contentItems = [
    {
      title: "Daily View",
      action: () => {
        navigate("/daily-dashboard");
        if (isMobile) toggleSidebar();
      },
      isActive: location.pathname === "/daily-dashboard",
      icon: Clock,
    },
    {
      title: "Monthly View",
      action: () => {
        navigate("/monthly-dashboard");
        if (isMobile) toggleSidebar();
      },
      isActive: location.pathname === "/monthly-dashboard",
      icon: Calendar,
    },
    {
      title: "Financial Analysis",
      action: () => {
        navigate("/financial-dashboard");
        if (isMobile) toggleSidebar();
      },
      isActive: location.pathname === "/financial-dashboard",
      icon: Wallet,
    },
    {
      title: "About",
      action: () => {
        navigate("/about");
        if (isMobile) toggleSidebar();
      },
      isActive: location.pathname === "/about",
      icon: Info,
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="cursor-pointer hover:bg-transparent focus:bg-transparent active:bg-transparent"
              onClick={() => navigate("/daily-dashboard")}
            >
              <a>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <HousePlug className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">EnergyView</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <div className="cursor-pointer" onClick={item.action}>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <div className="cursor-pointer" onClick={item.action}>
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
