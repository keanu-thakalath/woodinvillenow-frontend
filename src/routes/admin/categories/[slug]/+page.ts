import { verify_auth } from '$lib/client/auth';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

export const load: PageLoad = async ({ fetch, params }) => {
    verify_auth();

    const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/categories/${params.slug}`);
    const category = await res.json();
    if (res.status == 404) {
        throw error(404, {
            message: 'Not found'
        });
    }
    return { category };
};

export const ssr = false;