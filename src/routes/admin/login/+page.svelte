<script lang="ts">
    import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
    import Alert from '$lib/components/Alert.svelte'
    import Head from '$lib/components/Head.svelte';
    import Submit from '$lib/components/Submit.svelte';

    let alert: Alert;
    let submit: Submit;

    let username: string;
    let password: string;

    async function handleSubmit(e: SubmitEvent) {
        submit.disable();

        const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const auth = await res.json();
        if (res.status == 200) {
            localStorage.setItem('auth_token', auth.auth_token);
            location.href = '/admin/authors';
        }
        else {
            alert.show(auth.message);
            submit.enable();
        }
    };
  </script>

<Head title={`Login`} url={`/login`} />

<Alert bind:this={alert} />

<section class="flex items-center justify-center h-screen pb-40">
    <div>
        <div class="flex justify-center">
            <h1 class="text-gray-400 text-3xl font-black font-sans">
                Log in
            </h1>
        </div>
        <div class="flex-auto space-y-7 p-2">
            <div class="flex flex-col items-center justify-center text-gray-900">
                <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                    <div>
                        <div class="relative mt-1">
                            <input bind:value={username} type="text" placeholder="username">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                        </div>
                    </div>
                    
                    <div>
                        <div class="relative mt-1 mb-2">
                            <input bind:value={password} type="password" placeholder="password">
                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                    <Submit bind:this={submit} value="Login"/>
                </form>
            </div>
        </div>
    </div>
</section>