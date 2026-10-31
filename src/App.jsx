
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/produit/:slug" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
