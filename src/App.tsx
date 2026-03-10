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
import TrainersPage from "./pages/TrainersPage";
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
          <Route path="/masterclass" element={<MasterclassPage />} />
          <Route path="/masterclasses" element={<MasterclassesPage />} />
          <Route path="/masterclass/:id" element={<MasterclassDetailPage />} />
          <Route path="/formats" element={<FormatsPage />} />
          <Route path="/e-learning" element={<ElearningPage />} />
          <Route path="/sur-mesure" element={<SurMesurePage />} />
          <Route path="/nos-formateurs" element={<TrainersPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
