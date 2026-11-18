// @ts-check
import { writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://khosraviyani.ir',
  base: '/',
  integrations: [{
    name: 'portfolio-sitemap',
    hooks: {
      'astro:build:done': async ({ pages, dir }) => {
        const urls = [...new Set(pages.map(({ pathname }) => new URL(pathname, 'https://khosraviyani.ir/').href))]
          .filter((url) => !/\/404\/?$/.test(url)).sort();
        const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map((url) => '<url><loc>' + escapeXml(url) + '</loc></url>').join('') + '</urlset>\n';
        await writeFile(new URL('sitemap.xml', dir), xml);
      }
    }
  }],
  vite: {
    plugins: [tailwindcss()]
  }
});
