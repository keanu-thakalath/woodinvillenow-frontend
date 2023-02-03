<script lang="ts">
    import FollowUs from "$lib/components/FollowUs.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    import StayUpToDate from "$lib/components/StayUpToDate.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import Datetime from "$lib/components/Datetime.svelte";
    import Head from "$lib/components/Head.svelte";
    import LoadOnScroll from '$lib/components/LoadOnScroll.svelte';
    import type { PageData } from "./$types";
    import { PUBLIC_BACKEND_DOMAIN } from "$env/static/public";
    
    export let data: PageData;

    async function loadArticles() {
        if (data.page > -1) {
            data.page++;
            let articles = data.tag.url_slug === 'all' ? await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles?page=${data.page}&limit=${data.limit}`).then((res) => res.json()) : await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles?page=${data.page}&tag=${data.tag.url_slug}&limit=${data.limit}`).then((res) => res.json());

            if (articles.length < data.limit) {
                data.page = -1;
            }
            data.articles = [...data.articles, ...articles];
        }
    }
</script>

<Head title={"Tags"} url={"/tags"} />

<svelte:head>
    <link rel="canonical" href="https://woodinvillenow.org/tags" />
</svelte:head>

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-5xl font-bold py-3 mb-10">Tags</h1>
        <div class="flex flex-wrap">
            <section class="w-full md:w-9/12 md:pr-10">
                <div class="flex flex-wrap">
                    {#each data.tags as tag}
                        <a class="{data.tag.url_slug === tag.url_slug ? 'bg-blue-600 text-zinc-50 border-white' : ''} text-sm md:text-base lg:text-lg font-semibold py-1 px-2 md:py-2 md:px-3 mx-1 my-1 border-2 border-slate-200 hover:text-zinc-50 hover:bg-blue-600 hover:border-white rounded transition" href="/tags{tag.name == 'All' ? '' : `?tag=${tag.url_slug}`}">{tag.name}</a>
                    {/each}
                </div>
                <div class="flex flex-wrap mt-10">
                    {#each data.articles as article, i}
                        <div class="w-full md:w-1/2 md:{i % 2 == 0 ? 'pr-3' : 'pl-3'}">
                            <div class="pt-5 mb-5 border-t-2 border-slate-200">
                                <div class="flex justify-between">
                                    <div class="w-4/5 pr-5">
                                        {#each article.categories as category, i}
                                            <a class="text-xs font-bold uppercase" href="/categories/{category.category.url_slug}">{category.category.name}</a>{#if i != article.categories.length - 1}{", "}{/if}
                                        {/each}
                                        <h2><a href="/articles/{article.url_slug}" class="font-extrabold block md:text-lg">{article.title}</a></h2>
                                        <p class="text-xs md:text-sm mt-2">{article.excerpt}</p>
                                        <h3 class="text-zinc-600 text-sm">
                                            By
                                            {#each article.authors as author, i}
                                                <a href="/staff/{author.author.url_slug}">{author.author.name}</a>{", "}
                                            {/each}
                                            <Datetime dateStyle={'medium'} class="text-sm text-zinc-600" datetime={article.datetime} />
                                        </h3>
                                    </div>
                                    <div class="w-1/5">
                                        {#if article.cover_img !== ''}
                                            <a href="/articles/{article.url_slug}" class="w-full"><img src="{article.cover_img}" alt="{article.cover_img_caption}" class="square object-cover w-full"></a>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                    <LoadOnScroll load={loadArticles} page={data.page} />
                </div>
            </section>
            <section class="md:w-3/12">
                <FollowUs />
                <JoinUs />
                <StayUpToDate />
                <MostReadArticles />
            </section>
        </div>
    </div>
</div>