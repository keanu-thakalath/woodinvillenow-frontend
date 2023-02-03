<script lang="ts">
    import type { PageData } from './$types';
    import Submit from '$lib/components/Submit.svelte';
    import Alert from '$lib/components/Alert.svelte';
    import { get_auth_header } from '$lib/client/auth';
    import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
    
    let alert: Alert;
    let submit: Submit;
    export let data: PageData;

    async function handleSubmit(e: SubmitEvent) {
        submit.disable();

        const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            },
            
            body: JSON.stringify({name: `tag${Date.now()}`})
        });

        const tag = await res.json();
        if (res.status == 201) {
            location.href = `/admin/tags/${tag.url_slug}`;
        }
        else {
            alert.show(tag.message);
            submit.enable();
        }
    };

</script>

<Alert bind:this={alert} />

<section class="flex justify-center pt-40">
    <div class="w-9/12 bg-gray-100 text-gray-900 rounded-md px-10 py-2">
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <Submit bind:this={submit} value="New Tag"/>
        </form>
        <div class="my-3 flex justify-between items-center border-b-2 py-5 border-gray-300">
            <p class="w-5/12 pl-2 font-bold">Tags</p>
            <p class="w-5/12">URL Slug</p>
            <p class="w-1/6">ID</p>
        </div>
        {#each data.tags as tag}
            <div class="my-3 flex justify-between items-center border-b-2 py-5 border-gray-300">
                <p class="w-5/12 font-semibold text-xl hover:text-blue-500"><a href="/admin/tags/{tag.url_slug}">{tag.name}</a></p>
                <p class="w-5/12">{tag.url_slug}</p>
                <p class="w-1/6">{tag.id}</p>
            </div>
        {/each}
    </div>
</section>

