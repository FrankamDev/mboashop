
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import MobileBottomNav from "./composnents/MobileBottomNav";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/produit/:slug" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    <MobileBottomNav />
    </>
  );
}

export default App;
