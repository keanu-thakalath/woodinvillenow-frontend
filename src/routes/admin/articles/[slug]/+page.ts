import { get_auth_header, verify_auth } from '$lib/client/auth';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

export const load: PageLoad = async ({ fetch, params }) => {
    verify_auth();

    const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles/${params.slug}`, {headers: {'Authorization': get_auth_header()}});
    const article = await res.json();
    if (res.status == 404) {
        throw error(404, {
            message: 'Not found'
        });
    }

    const authors = fetch(`${PUBLIC_BACKEND_DOMAIN}/api/authors`).then((res) => res.json());
    const categories = fetch(`${PUBLIC_BACKEND_DOMAIN}/api/categories`).then((res) => res.json());
    const tags = fetch(`${PUBLIC_BACKEND_DOMAIN}/api/tags`).then((res) => res.json());

    return { article, authors, categories, tags};
};

export const ssr = false;