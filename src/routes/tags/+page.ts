import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

export const load: PageLoad = async ({ fetch, url }) => {
    const urlTag = url.searchParams.get('tag');
    let tag = {url_slug: urlTag};
    if (urlTag == null) {
        tag = {url_slug: 'all'};
    }
    let tags = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/tags`).then((res) => res.json());
    
    tags = [{name: 'All', url_slug: 'all'}, ...tags]

    
    if (!tags.some((t) => t.url_slug === tag.url_slug)) {
        throw error(404, {
            message: 'Not found'
        });
    }

    const limit = 8;

    const articles = tag.url_slug === 'all' ? await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles?limit=${limit}`).then((res) => res.json()) : await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles?tag=${tag.url_slug}&limit=${limit}`).then((res) => res.json());

    return { articles, tags, tag, limit, page: 1 };
};
