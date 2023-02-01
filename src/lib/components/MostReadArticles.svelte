<script>
    import { PUBLIC_BACKEND_DOMAIN } from "$env/static/public";
    import { onMount } from "svelte";

    let articles = [];

    onMount(async () => {
        articles = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/articles?sort_by=views&limit=5`).then(res => res.json());
    });
</script>

<div class="mb-10">
    <h2 class="font-extrabold text-zinc-800 text-lg mb-1">Most Read Articles</h2>
    {#each articles as article}
        <div class="pb-3 mb-3 border-b-2 border-slate-200">
            <a href="/articles/{article.url_slug}" class="block text-zinc-800 font-semibold">{article.title}</a>
        </div>
    {/each}
</div>