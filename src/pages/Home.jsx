import Categories from "../composnents/Categories";
import Hero from "../composnents/Hero";
import Navbar from "../composnents/Navbar";
import ProductSection from "../composnents/ProductSection";
import Footer from "../composnents/Footer";
import ChatAssistant from "../composnents/ChatAssistant";
import InstallPWA from "../composnents/pwa/InstallPWA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <Navbar cartCount={2} />

      <main className="flex-grow bg-white transition-colors duration-300 dark:bg-slate-950">
        <Hero />

        <Categories />

        <ProductSection />

        <ChatAssistant />

        <InstallPWA />
      </main>

      <Footer />
    </div>
  );
}