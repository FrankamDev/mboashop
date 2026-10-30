
// import Hero from "../composnents/Hero";
import Hero from "../composnents/Hero";
import Navbar from "../composnents/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={2} />
      <main className="flex-grow">
        <Hero/>
        
      </main>
      {/* <Footer /> */}
    </div>
  );
}