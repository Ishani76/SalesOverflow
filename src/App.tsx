import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LeadReassignment from "./pages/LeadReassignment";
import TeamAnalytics from "./pages/TeamAnalytics";
import WeeklyReports from "./pages/WeeklyReports";
import LeadsToday from "./pages/LeadsToday";
import PastLeads from "./pages/PastLeads";
import UserManagement from "./pages/UserManagement";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFeatures from "./pages/admin/AdminFeatures";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads/reassign" element={<LeadReassignment />} />
            <Route path="/leads/today" element={<LeadsToday />} />
            <Route path="/leads/past" element={<PastLeads />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/admin/companies" element={<AdminCompanies />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/features" element={<AdminFeatures />} />
            <Route path="/analytics" element={<TeamAnalytics />} />
            <Route path="/reports/weekly" element={<WeeklyReports />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
