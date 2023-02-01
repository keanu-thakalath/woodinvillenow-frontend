import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
import { get_auth_header, verify_auth } from '$lib/client/auth';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    verify_auth();

    const articles = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles`, {headers: {'Authorization': get_auth_header()}}).then((res) => res.json());
    return { articles };
};

export const ssr = false;