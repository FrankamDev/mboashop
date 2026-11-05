
import Categories from "../composnents/Categories";
import Hero from "../composnents/Hero";
import Navbar from "../composnents/Navbar";
import ProductCard from "../composnents/ProductCard";
import ProductSection from "../composnents/ProductSection";
import Footer from "../composnents/Footer";
import ChatAssistant from "../composnents/ChatAssistant";
import InstallPWA from "../composnents/pwa/InstallPWA";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={2} />
      <main className="flex-grow">
        <Hero/>
        <Categories/>
        <ProductSection/>
        <ChatAssistant/>
        <InstallPWA/>
      </main>
      <Footer />
    </div>
  );
}