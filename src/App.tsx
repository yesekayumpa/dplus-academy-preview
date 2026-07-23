import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ContactPage from "./pages/ContactPage";
import MasterclassPage from "./pages/MasterclassPage";
import MasterclassesPage from "./pages/MasterclassesPage";
import MasterclassDetailPage from "./pages/MasterclassDetailPage";
import FormatsPage from "./pages/FormatsPage";
import ElearningPage from "./pages/ElearningPage";
import SurMesurePage from "./pages/SurMesurePage";
import SurmesureDetailPage from "./pages/SurmesureDetailPage";
import CorporateProgramsPage from "./pages/CorporateProgramsPage";
import TrainersPage from "./pages/TrainersPage";
import BecomeTrainerPage from "./pages/BecomeTrainerPage";
import FinanceInvestmentPage from "./pages/FinanceInvestmentPage";
import DigitalToolsAutomationPage from "./pages/DigitalToolsAutomationPage";
import DataAnalyticsPage from "./pages/DataAnalyticsPage";
import EntrepreneurshipPage from "./pages/EntrepreneurshipPage";
import SoftSkillsLeadershipPage from "./pages/SoftSkillsLeadershipPage";
import FormationPilliersPage from "./pages/FormationPilliersPage";
import SalesFunnelPage from "./pages/SalesFunnelPage";
import FormationDetailPage from "./pages/FormationDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/nous-contacter" element={<ContactPage />} />
          <Route path="/devenir-formateur" element={<BecomeTrainerPage />} />
          <Route path="/masterclass" element={<MasterclassPage />} />
          <Route path="/masterclasses" element={<MasterclassesPage />} />
          <Route path="/masterclass/:id" element={<MasterclassDetailPage />} />
          <Route path="/formats" element={<FormatsPage />} />
          <Route path="/e-learning" element={<ElearningPage />} />
          <Route path="/corporate-programs" element={<CorporateProgramsPage />} />
          <Route path="/sur-mesure" element={<SurMesurePage />} />
          <Route path="/sur-mesure/:id" element={<SurmesureDetailPage />} />
          <Route path="/nos-formateurs" element={<TrainersPage />} />
          <Route path="/finance-investment" element={<FinanceInvestmentPage />} />
          <Route path="/digital-tools-automation" element={<DigitalToolsAutomationPage />} />
          <Route path="/data-analytics" element={<DataAnalyticsPage />} />
          <Route path="/entrepreneurship" element={<EntrepreneurshipPage />} />
          <Route path="/soft-skills-leadership" element={<SoftSkillsLeadershipPage />} />
          <Route path="/formation-pilliers" element={<FormationPilliersPage />} />
          <Route path="/formations/:id" element={<FormationDetailPage />} />
          <Route path="/tunnel-vente" element={<SalesFunnelPage />} />
          <Route path="/sales-funnel" element={<SalesFunnelPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
