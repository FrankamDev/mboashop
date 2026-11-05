import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      devOptions: {
        enabled: true,
      },

      manifest: {
        name: "MboaShop",
        short_name: "MboaShop",
        description:
          "MboaShop - Votre boutique en ligne au Cameroun.",

        theme_color: "#ffffff",
        background_color: "#ffffff",

        display: "standalone",
        orientation: "portrait",
        start_url: "/",

        icons: [
          {
            src: "/icons/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}",
        ],
      },
    }),
  ],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),

//     VitePWA({
//       registerType: "autoUpdate",

//       devOptions: {
//         enabled: true,
//       },

//       manifest: {
//         name: "MboaShop",
//         short_name: "MboaShop",
//         description:
//           "MboaShop - Votre boutique en ligne au Cameroun.",

//         theme_color: "#ffffff",
//         background_color: "#ffffff",

//         display: "standalone",
//         orientation: "portrait",
//         start_url: "/",

//         icons: [
//           {
//             src: "/icons/logo.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/icons/logo.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//       },

//       workbox: {
//         globPatterns: [
//           "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}",
//         ],

//         cleanupOutdatedCaches: true,
//       },
//     }),
//   ],
// });