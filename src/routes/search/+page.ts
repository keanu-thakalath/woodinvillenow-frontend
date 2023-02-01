import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
    const query = url.searchParams.get('query');
    const articles = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles?query=${query}`).then((res) => res.json());
    return { articles, query };
};
