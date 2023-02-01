import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/articles/${params.slug}`);
    const article = await res.json();
    if (res.status == 404) {
        throw error(404, {
            message: 'Not found'
        });
    }

    return { article };
};
