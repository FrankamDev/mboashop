// import Home from "./pages/Home";

// export default function App() {
//   return (
//     <div className="App">
      
//         <Home/>        
//     </div>
//   )
// }



import { lazy, Suspense } from "react";

import Home from "./pages/Home";



// const ProductSection = lazy(() =>
//   import("./components/ProductSection")
// );

function App() {
  return (
    <>
      <Home/>

      <Suspense fallback={<p className="p-6">Chargement...</p>}>
        {/* <ProductSection /> */}
      </Suspense>
    </>
  );
}

export default App;
