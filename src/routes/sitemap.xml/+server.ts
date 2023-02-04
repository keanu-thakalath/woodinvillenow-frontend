import type { RequestHandler } from './$types';
import { DOMAIN } from '$env/static/private';
import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

export const GET: RequestHandler = async ({ fetch }) => {
    const pages = ['', '/about', '/contact', '/staff', '/newsletter', '/donate'];
    const articles = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles`).then((res) => res.json());
    const response = new Response(sitemap(pages, articles));

    response.headers.set('Content-Type', 'application/xml');
    return response;
};

const sitemap = (pages, articles) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${pages.map(page => `
        <url>
            <loc>https://${DOMAIN}${page}</loc>
        </url>
    `).join('')}
    ${articles.map(article => `
        <url>
            <loc>https://${DOMAIN}/articles/${article.url_slug}</loc>
            ${(Date.now() - new Date(`${article.datetime}Z`).getTime()) < 172800000 ? `
            <news:news>
                <news:publication>
                    <news:name>WoodinvilleNow</news:name>
                    <news:language>en</news:language>
                </news:publication>
                <news:publication_date>${article.datetime}+00:00</news:publication_date>
                <news:title>${article.title}</news:title>
            </news:news>
            ` : ''}
        </url>
    `).join('')}
</urlset>`;