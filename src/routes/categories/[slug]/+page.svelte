<script lang="ts">
    import FollowUs from "$lib/components/FollowUs.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    import StayUpToDate from "$lib/components/StayUpToDate.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import Datetime from "$lib/components/Datetime.svelte";
    import Head from "$lib/components/Head.svelte";
    import type { PageData } from "./$types";
    
    export let data: PageData;
</script>

<Head title={`${data.category.name}`} url={`/categories/${data.category.url_slug}`} description={`Read news in the ${data.category.name} section.`} />

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-5xl font-bold py-3 mb-2 md:mb-10">{data.category.name}</h1>
        <div class="flex flex-wrap">
            <section class="w-full md:w-9/12 md:pr-10">
                {#if data.articles.length > 0}
                    <div class="flex flex-wrap">
                        {#each data.articles as article, i}
                            <div class="w-full md:w-1/2 {i % 2 == 0 ? 'md:pr-3' : 'md:pl-3'}">
                                <div class="pt-5 mb-5 border-t-2 border-slate-200">
                                    <div class="flex justify-between">
                                        <div class="w-4/5 pr-3">
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
                                        <div class="w-1/5">
                                            {#if article.cover_img !== ''}
                                                <a href="/articles/{article.url_slug}" class="w-full"><img src="{article.cover_img}" alt="{article.cover_img_caption}" class="square object-cover w-full"></a>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
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