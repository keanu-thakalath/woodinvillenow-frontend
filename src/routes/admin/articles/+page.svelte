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

        const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            },
            
            body: JSON.stringify({title: `article${Date.now()}`,
                excerpt: '',
                cover_img: '',
                cover_img_caption: '',
                cover_img_style: 'none',
                content: '',
                draft: true,
                author_ids: [],
                category_ids: [],
                tag_ids: []
            })
        });

        const article = await res.json();
        if (res.status == 201) {
            location.href = `/admin/articles/${article.url_slug}`;
        }
        else {
            alert.show(article.message);
            submit.enable();
        }
    };

</script>

<Alert bind:this={alert} />

<section class="flex justify-center pt-40">
    <div class="w-9/12 bg-gray-100 text-gray-900 rounded-md px-10 py-2">
        <div class="my-3 flex justify-between items-center border-b-2 py-5 border-gray-300">
            <p class="w-1/4 pl-2 font-bold">Title</p>
            <p class="w-1/4">Datetime</p>
            <p class="w-1/6">Draft</p>
            <p class="w-1/6">Authors</p>
            <p class="w-1/12">URL Slug</p>
        </div>
        {#each data.articles as article}
            <div class="my-3 flex justify-between items-center border-b-2 py-5 border-gray-300">
                <p class="w-1/4"><a class="font-semibold text-xl hover:text-blue-500" href="/admin/articles/{article.url_slug}">{article.title}</a></p>
                <p class="w-1/4">{article.datetime}</p>
                <p class="w-1/6">{article.draft}</p>
                <div class="w-1/6">
                    {#each article.authors as author}
                        <p>{author.author.name}</p>
                    {/each}
                </div>
                <p class="w-1/12 hover:text-blue-500"><a href="/articles/{article.url_slug}">{article.url_slug}</a></p>
            </div>
        {/each}
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <Submit bind:this={submit} value="New Article"/>
        </form>
    </div>
</section>

