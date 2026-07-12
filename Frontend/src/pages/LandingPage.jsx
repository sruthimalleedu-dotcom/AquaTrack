import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <Stats />
      <Footer />
    </div>
  );
}