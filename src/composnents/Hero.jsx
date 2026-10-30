export default function Hero() {
  return (
    <section className="px-4 mt-4">
      <div className="overflow-hidden rounded-2xl">
        <img
          src="/images/hero1.png"
          alt="Découvrez les produits MBOASHOP"
          className="w-full h-52 md:h-96 object-cover"
          fetchPriority="high"
        />
      </div>
     
    </section>
  );
}