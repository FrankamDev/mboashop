import {
  Smartphone,
  Headphones,
  House,
  Gamepad2,
  Laptop,
  Drone,
} from "lucide-react";

const categories = [
  { id: 1, name: "Phones", icon: Smartphone },
  { id: 2, name: "Audio", icon: Headphones },
  { id: 3, name: "Smart Home", icon: House },
  { id: 4, name: "Gaming", icon: Gamepad2 },
  { id: 5, name: "Computers", icon: Laptop },
  { id: 6, name: "Gadgets", icon: Drone },
];

export default function Categories() {
  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-3 transition-colors duration-300 sm:px-4">
      <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide sm:justify-between sm:gap-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              type="button"
              className="group flex min-w-[65px] shrink-0 flex-col items-center gap-2"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 group-hover:border-blue-500 group-hover:text-blue-600 group-hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:shadow-none dark:group-hover:border-blue-500 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400">
                <Icon size={23} strokeWidth={1.8} />
              </span>

              <span className="whitespace-nowrap text-[10px] font-medium text-gray-800 transition-colors dark:text-slate-300">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}