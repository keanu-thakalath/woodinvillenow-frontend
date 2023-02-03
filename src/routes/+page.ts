import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const limit = 10;
    const articles = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles?limit=${limit}`).then((res) => res.json());
    const poems = [];
    for (let i = articles.length - 1; i >= 0; i--) {
        if (articles[i].categories[0].category.name === 'Poetry') {
            poems.splice(0, 0, ...articles.splice(i, 1));
        }
    }
    return { articles, poems, limit };
};