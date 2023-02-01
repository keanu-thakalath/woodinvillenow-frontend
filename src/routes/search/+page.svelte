<script lang="ts">
    import StayUpToDate from "$lib/components/StayUpToDate.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import Head from "$lib/components/Head.svelte";
    import type { PageData } from "./$types";
    import Datetime from "$lib/components/Datetime.svelte";
    import FollowUs from "$lib/components/FollowUs.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    
    export let data: PageData;
</script>

<Head title={`Search Results for "${data.query}"`} url={`/search?query=${data.query}`} />

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-xl font-bold border-b-2 border-slate-200 py-3 mb-8 w-full">Search Results for "{data.query}"</h1>
        <div class="w-full border-b-2 border-slate-200 pb-8 mb-10">
            <form action="/search" method="get" class="w-full">
                <input name="query" type="text" class="sm:w-[400px] w-[230px] p-1 md:p-2 text-xl sm:text-2xl pl-4 border-zinc-300 border-2 outline-none hover:border-zinc-400 rounded-md focus:border-zinc-400" value={data.query}>
                <input type="submit" value="Search" class="bg-emerald-800 text-zinc-50 px-4 py-1 sm:py-2 sm:px-6 text-xl sm:text-2xl font-semibold rounded-md hover:bg-emerald-600 hover:cursor-pointer">
            </form>
        </div>
        <div class="flex flex-wrap">
            <section class="md:w-9/12 md:pr-10">
                {#if data.articles.length > 0}
                    {#each data.articles as article, i}
                        <div class="w-full">
                            <div class="pb-5 mb-5 border-b-2 border-slate-200">
                                <div class="flex justify-between">
                                    <div class="w-1/6 pr-5">
                                        {#if article.cover_img !== ''}
                                            <a href="/articles/{article.url_slug}" class="w-full"><img src="{article.cover_img}" alt="{article.cover_img_caption}" class="square object-cover w-full"></a>
                                        {/if}
                                    </div>
                                    <div class="w-5/6">
                                        {#each article.tags as tag, i}
                                            <a class="text-xs font-bold uppercase" href="/tags?tag={tag.tag.url_slug}">{tag.tag.name}</a>{#if i != article.tags.length - 1}{", "}{/if}
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
                                </div>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p class="text-xl">We didn't find any results.</p>
                {/if}
            </section>
            <section class="md:w-3/12 mt-10 md:mt-0">
                <FollowUs />
                <JoinUs />
                <StayUpToDate />
                <MostReadArticles />
            </section>
        </div>
    </div>
</div>
