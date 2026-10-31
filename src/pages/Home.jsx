
// import Hero from "../composnents/Hero";
import Categories from "../composnents/Categories";
import Hero from "../composnents/Hero";
import Navbar from "../composnents/Navbar";
import ProductCard from "../composnents/ProductCard";
import ProductSection from "../composnents/ProductSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={2} />
      <main className="flex-grow">
        <Hero/>
        <Categories/>
        <ProductSection/>
      </main>
      {/* <Footer /> */}
    </div>
  );
}