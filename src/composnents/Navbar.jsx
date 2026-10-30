
import {
  Menu,
  Search,
  SlidersHorizontal,
  Bell,
  ShoppingCart
} from "lucide-react";

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="w-full bg-white px-4 pt-4 pb-3 shadow-sm">

      {/* TOP NAVBAR */}
      <div className="flex items-center justify-between">

        {/* BURGER MENU */}
        <button className="flex items-center justify-center text-gray-800">
          <Menu size={27} strokeWidth={2} />
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="./src/assets/logo-icon.png"
            alt="MBOASHOP"
            className="h-9 w-9 object-contain"
          />

          <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
            MBOA<span className="text-blue-600">SHOP</span>
          </h2>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATIONS */}
          <button className="relative text-gray-800">
            <Bell size={23} strokeWidth={1.8} />

            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              2
            </span>
          </button>

          {/* CART */}
          <button className="relative text-gray-800">
            <ShoppingCart size={24} strokeWidth={1.8} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="mt-5 flex items-center gap-2">

        <div className="flex h-11 flex-1 items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 shadow-sm">

          <Search size={19} className="shrink-0 text-gray-600" />

          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />

        </div>

        {/* FILTER BUTTON */}
        <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-100">
          <SlidersHorizontal size={19} className="text-gray-700" />
        </button>

      </div>

    </header>
  );
}
