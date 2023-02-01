import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const limit = 10;
    const articles = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/articles?limit=${limit}`).then((res) => res.json());
    const poems = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/articles?category=poetry&limit=5`).then((res) => res.json());
    return { articles, poems, limit };
};