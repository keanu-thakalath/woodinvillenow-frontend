import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const authors = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/authors`).then((res) => res.json());

    return { authors};
};
