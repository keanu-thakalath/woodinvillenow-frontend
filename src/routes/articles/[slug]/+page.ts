import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles/${params.slug}`);
    const article = await res.json();
    if (res.status == 404) {
        throw error(404, {
            message: 'Not found'
        });
    }

    article.content = article.content.split('<StayUpToDate />');
    for (let i = article.content.length - 1; i > 0; i--) {
        article.content.splice(i, 0, '<StayUpToDate />');
    }

    return { article };
};
