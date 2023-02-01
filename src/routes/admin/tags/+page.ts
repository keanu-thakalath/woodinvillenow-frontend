import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
import { verify_auth } from '$lib/client/auth';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    verify_auth();

    const tags = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/tags`).then((res) => res.json());
    return { tags };
};

export const ssr = false;