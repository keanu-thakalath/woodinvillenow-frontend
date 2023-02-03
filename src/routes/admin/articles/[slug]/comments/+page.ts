import { get_auth_header, verify_auth } from '$lib/client/auth';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

export const load: PageLoad = async ({ fetch, params }) => {
    verify_auth();

    const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles/${params.slug}/comments`, {headers: {'Authorization': get_auth_header()}});
    const comments = await res.json();
    if (res.status == 404) {
        throw error(404, {
            message: 'Not found'
        });
    }

    return { comments, slug: params.slug };
};

export const ssr = false;