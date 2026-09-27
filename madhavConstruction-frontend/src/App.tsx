
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { LabrProfile } from "./pages/LabrProfile";
import MeasurementBill from "./pages/Bills/MeasurementBill/MeasurementBill";
import { useEffect, useState } from "react";
import { checkSession, SessionExpiredError } from "./service/auth";
import SessionExpiredCard from "./components/SessionExpiredCard";
import InvoiceBill from "./pages/Bills/InvoiceBill/InvoiceBill";
import MainBill from "./pages/Bills/MainBill/MainBill";
import AbstractBill from "./pages/Bills/AbstractBill/AbstractBill";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await checkSession();
      } catch (err) {
        if (err instanceof SessionExpiredError) {
          setSessionExpired(true);
        }
      }
    };
    verify();
  }, []);

  if (sessionExpired) {
    return <SessionExpiredCard onRelogin={() => (window.location.href = "/login")} />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/measurementbill" element={<PrivateRoute><MeasurementBill /></PrivateRoute>} />
              <Route path="/mainbill" element={<PrivateRoute><MainBill /></PrivateRoute>} />
              <Route path="/abstractbill" element={<PrivateRoute><AbstractBill /></PrivateRoute>} />
              <Route path="/invoicebill" element={<PrivateRoute><InvoiceBill /></PrivateRoute>} />
              <Route path="/labour/:slugAndId" element={<PrivateRoute><LabrProfile /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
