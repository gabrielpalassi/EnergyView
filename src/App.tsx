import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import { DailyDashboard } from "@/pages/DailyDashboard";
import { MonthlyDashboard } from "@/pages/MonthlyDashboard";
import { FinancialAnalysis } from "@/pages/FinancialAnalysis";
import { ThemeProvider } from "@/context/ThemeContext";
import { TutorialProvider } from "@/context/TutorialContext";
import { TutorialDialog } from "@/components/TutorialDialog";
import { About } from "@/pages/About";

function App() {
  return (
    <ThemeProvider>
      <TutorialProvider>
        <SidebarProvider>
          <BrowserRouter>
            <TutorialDialog />
            <AppSidebar />
            <SidebarInset>
              <Routes>
                <Route path="/" element={<Navigate to="/daily-dashboard" />} />
                <Route path="/daily-dashboard" element={<DailyDashboard />} />
                <Route
                  path="/monthly-dashboard"
                  element={<MonthlyDashboard />}
                />
                <Route
                  path="/financial-dashboard"
                  element={<FinancialAnalysis />}
                />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/daily-dashboard" />} />
              </Routes>
            </SidebarInset>
          </BrowserRouter>
        </SidebarProvider>
      </TutorialProvider>
    </ThemeProvider>
  );
}

export default App;
