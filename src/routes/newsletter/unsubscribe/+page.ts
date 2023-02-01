import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

export const load: PageLoad = async ({ fetch, url }) => {
    const auth_token = url.searchParams.get('auth_token');
    const res = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/newsletteremail?auth_token=${auth_token}`);
    const email = await res.json();
    if (res.status == 404) {
        throw error(404, {
            message: 'Not found'
        });
    }

    return { email, auth_token };
};

export const ssr = false;