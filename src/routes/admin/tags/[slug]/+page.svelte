<script lang="ts">
    import Alert from '$lib/components/Alert.svelte'
    import Submit from '$lib/components/Submit.svelte';
    import type { PageData } from './$types';
    import { get_auth_header } from '$lib/client/auth';
    import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

    export let data: PageData;
    let alert: Alert;
    let submit: Submit;
    let deleteSubmit: Submit;

    async function handleDeleteSubmit(e: SubmitEvent) {
        deleteSubmit.disable();

        const res = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/tags/${data.tag.url_slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            }
        });
        const tag = await res.json();
        if (res.status == 200) {
            location.href = `/admin/tags`;
        }
        else {
            alert.show(tag.message);
            deleteSubmit.enable();
        }
    }

    async function handleSubmit(e: SubmitEvent) {
        submit.disable();

        const res = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/tags/${data.tag.url_slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            },
            body: JSON.stringify({
                name: data.tag.name
            })
        });
        const tag = await res.json();
        if (res.status == 200) {
            location.href = `/admin/tags`;
        }
        else {
            alert.show(tag.message);
            submit.enable();
        }
    }
</script>

<Alert bind:this={alert} />

<section class="flex justify-center pt-10">
    <div class="w-full max-w-xl bg-gray-100 text-gray-900 rounded-md px-10 py-2">
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
                <div class="relative mt-1">
                    <input bind:value={data.tag.name} type="text" placeholder="Name">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <input bind:value={data.tag.id} type="text" disabled placeholder="ID">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <input bind:value={data.tag.url_slug} type="text" disabled placeholder="URL Slug">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                </div>
            </div>
            <Submit bind:this={submit} value="Update Tag"/>
        </form>
        
        <form on:submit|preventDefault={handleDeleteSubmit} class="space-y-4">
            <Submit bind:this={deleteSubmit} value="Delete Tag"/>
        </form>
    </div>
</section>