<script lang="ts">
    import Alert from '$lib/components/Alert.svelte'
    import Submit from '$lib/components/Submit.svelte';
    import MultiSelect from '$lib/components/MultiSelect.svelte';
    import type { PageData } from './$types';
    import { get_auth_header } from '$lib/client/auth';
    import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

    export let data: PageData;

    let alert: Alert;
    let submit: Submit;
    let deleteSubmit: Submit;

    async function handleDeleteSubmit(e: SubmitEvent) {
        deleteSubmit.disable();

        const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles/${data.slug}/comments/${data.comment.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            }
        });
        const comment = await res.json();
        if (res.status == 200) {
            location.href = `/admin/articles/${data.slug}/comments`;
        }
        else {
            alert.show(comment.message);
            deleteSubmit.enable();
        }
    }

    async function handleSubmit(e: SubmitEvent) {
        submit.disable();
        

        const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles/${data.slug}/comments/${data.comment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            },
            body: JSON.stringify({
                name: data.comment.name,
                datetime: data.comment.datetime,
                content: data.comment.content
            })
        });
        const article = await res.json();
        if (res.status == 200) {
            location.href = `/admin/articles/${data.slug}/comments`;
        }
        else {
            alert.show(article.message);
            submit.enable();
        }
    }
</script>

<Alert bind:this={alert} />

<section class="flex justify-center pt-10">
    <div class="w-full max-w-xl bg-gray-100 text-gray-900 rounded-md px-10 py-2">
        <h1 class="font-bold text-lg my-10">Comment on "{data.slug}"</h1>
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
                <div class="relative mt-1">
                    <input bind:value={data.comment.name} type="text" placeholder="Name">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <input bind:value={data.comment.datetime} type="text" placeholder="Datetime">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <textarea bind:value={data.comment.content} rows=3 placeholder="Content"></textarea>
                    <svg class="top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
            </div>
            <Submit bind:this={submit} value="Update Comment"/>
        </form>
        
        <form on:submit|preventDefault={handleDeleteSubmit} class="space-y-4">
            <Submit bind:this={deleteSubmit} value="Delete Comment"/>
        </form>
    </div>
</section>