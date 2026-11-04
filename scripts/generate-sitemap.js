import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { products } from '../src/data/products.js'; // ← adapte le chemin si besoin

// Fonction pour créer un slug propre à partir du nom de catégorie
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')                   // enlève les accents
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')               // espaces → -
    .replace(/[^\w\-]+/g, '')           // enlève caractères spéciaux
    .replace(/\-\-+/g, '-');            // évite les --
}

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: 'https://www.mboashop.getomiie.com'
  });

  const writeStream = createWriteStream(resolve('./public/sitemap.xml'));
  sitemap.pipe(writeStream);

  // === Pages statiques ===
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/a-propos', priority: 0.5, changefreq: 'monthly' },
    { url: '/contact', priority: 0.5, changefreq: 'monthly' },
  ];

  staticPages.forEach((page) => {
    sitemap.write({
      url: page.url,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: new Date().toISOString(),
    });
  });

  // === Catégories uniques ===
  const categories = [...new Set(products.map((p) => p.category))];

  categories.forEach((category) => {
    const categorySlug = slugify(category);

    sitemap.write({
      url: `/categories/${categorySlug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });
  });

  // === Produits (seulement ceux publiés) ===
  products
    .filter((product) => product.isPublished === true)
    .forEach((product) => {
      sitemap.write({
        url: `/produits/${product.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log('✅ Sitemap généré avec succès → public/sitemap.xml');
  console.log(`→ ${products.filter(p => p.isPublished).length} produits`);
  console.log(`→ ${categories.length} catégories`);
}

generateSitemap().catch(console.error);