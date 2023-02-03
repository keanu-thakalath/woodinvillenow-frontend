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

        const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/authors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            },
            
            body: JSON.stringify({name: `author${Date.now()}`,
                title: '',
                group: 'administration',
                profile_pic: '',
                bio_pic: '',
                bio: '',
                active: true
            })
        });

        const author = await res.json();
        if (res.status == 201) {
            location.href = `/admin/authors/${author.url_slug}`;
        }
        else {
            alert.show(author.message);
            submit.enable();
        }
    };

</script>

<Alert bind:this={alert} />

<section class="flex justify-center pt-40">
    <div class="w-9/12 bg-gray-100 text-gray-900 rounded-md px-10 py-2">
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <Submit bind:this={submit} value="New Author"/>
        </form>
        <div class="my-3 flex justify-between items-center border-b-2 py-5 border-gray-300">
            <p class="w-1/4 font-bold">Staff</p>
            <p class="w-3/12">Group</p>
            <p class="w-1/6">Active</p>
            <p class="w-1/6">URL Slug</p>
            <p class="w-1/12">ID</p>
        </div>
        {#each data.authors as author}
            <div class="my-3 flex justify-between items-center border-b-2 py-5 border-gray-300">
                <div class="flex w-1/4">
                    <img class="profile-pic" src="{author.profile_pic}" alt="">
                    <div>
                        <p><a href="/admin/authors/{author.url_slug}" class="font-semibold text-xl hover:text-blue-500">{author.name}</a></p>
                        <p class="font-light">{author.title}</p>
                    </div>
                </div>
                <p class="w-3/12">{author.group}</p>
                <p class="w-1/6">{author.active}</p>
                <p class="w-1/6">{author.url_slug}</p>
                <p class="w-1/12">{author.id}</p>
            </div>
        {/each}
    </div>
</section>

