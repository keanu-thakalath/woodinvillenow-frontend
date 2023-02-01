import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
import { verify_auth } from '$lib/client/auth';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    verify_auth();

    const authors = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/authors`).then((res) => res.json());
    return { authors };
};

export const ssr = false;