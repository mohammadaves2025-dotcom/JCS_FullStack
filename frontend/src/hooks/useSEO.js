/**
 * useSEO — Dynamic SEO hook for JCS Consultancy React pages
 * Handles title, meta tags, Open Graph, Twitter Card, canonical & JSON-LD schemas
 */
import { useEffect } from 'react';

const DEFAULT_DOMAIN = 'https://www.jamiaconsultancyservices.in';
const DEFAULT_IMAGE = `${DEFAULT_DOMAIN}/JCS-LOGO1.jpeg`;

function setMeta(name, content, useProperty = false) {
  if (!content) return;
  const attr = useProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectSchema(schema) {
  let el = document.getElementById('dynamic-page-schema');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'dynamic-page-schema';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
}

export function useSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  keywords,
  schema,
  noIndex = false,
}) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large');
    if (canonical) setLink('canonical', canonical);

    // Open Graph
    setMeta('og:title', ogTitle || title, true);
    setMeta('og:description', ogDescription || description, true);
    if (canonical) setMeta('og:url', canonical, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'JCS Consultancy', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', ogTitle || title);
    setMeta('twitter:description', ogDescription || description);
    setMeta('twitter:image', ogImage);

    if (schema) injectSchema(schema);
  }, [title, description, canonical, ogImage, keywords, schema, noIndex, ogTitle, ogDescription]);
}

export const DEFAULT_DOMAIN_EXPORT = DEFAULT_DOMAIN;
