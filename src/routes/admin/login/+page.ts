import { is_auth } from '$lib/client/auth';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    is_auth().then((auth) => {
        if (auth) {
            location.href = '/admin/authors';
        }
    });
};

export const ssr = false;