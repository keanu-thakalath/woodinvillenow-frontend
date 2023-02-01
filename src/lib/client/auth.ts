export const verify_auth = async () => {
    const auth_token = localStorage.getItem('auth_token');

    await fetch('http://127.0.0.1:5000/api/auth', {headers: {'Authorization': `Bearer ${auth_token}`}}).then((response) => {
        if (response.status == 401) {
            location.href = '/admin/login';
        }
    });
    return auth_token;
}


export const is_auth = async () => {
    const auth_token = localStorage.getItem('auth_token');

    return await fetch('http://127.0.0.1:5000/api/auth', {headers: {'Authorization': `Bearer ${auth_token}`}}).then((response) => {
        return response.status != 401;
    });
}

export const get_auth_header = () => {
    const auth_token = localStorage.getItem('auth_token');

    return `Bearer ${auth_token}`;
}