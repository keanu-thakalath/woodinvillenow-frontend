<script lang="ts">
    import FollowUs from "$lib/components/FollowUs.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    import StayUpToDate from "$lib/components/StayUpToDate.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import type { PageData } from './$types';
    import Datetime from "$lib/components/Datetime.svelte";
    import Head from "$lib/components/Head.svelte";

    export let data: PageData;
</script>

<Head title={`${data.author.name}`} url={`/staff/${data.author.url_slug}`} description={`Read ${data.author.name}'s biography and latest articles.`} image={data.author.bio_pic} />

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-5xl font-bold mb-3 w-full">{data.author.name}</h1>
        <h2 class="text-2xl font-semibold text-zinc-600 border-b-2 border-slate-200 mb-10 pb-5">{data.author.title}</h2>
        <div class="flex flex-wrap">
            <section class="md:w-9/12 md:pr-10">
                {#if data.author.bio_pic !== ''}
                    <img class="w-full rounded mb-10 landscape object-cover" src="{data.author.bio_pic}" alt="{data.author.name}">
                {/if}
                <p class="text-lg mb-10">{data.author.bio}</p>
                {#if data.articles.length > 0}
                    <h3 class="text-2xl font-semibold mt-16 mb-8">{data.author.name}'s Latest Articles</h3>
                    <div class="flex flex-wrap">
                        {#each data.articles as article, i}
                            <div class="md:w-1/2 md:{i % 2 == 0 ? 'pr-3' : 'pl-3'}">
                                <div class="pt-5 mb-5 border-t-2 border-slate-200">
                                    <div class="flex justify-between">
                                        <div class="w-4/5 pr-5">
                                            {#each article.tags as tag, i}
                                                <a class="text-xs font-bold uppercase" href="/tags?tag={tag.tag.url_slug}">{tag.tag.name}</a>{#if i != article.tags.length - 1}{", "}{/if}
                                            {/each}
                                            <h4><a href="/articles/{article.url_slug}" class="font-extrabold block text-lg">{article.title}</a></h4>
                                            <p class="text-sm mt-2">{article.excerpt}</p>
                                            <Datetime dateStyle={'medium'} class="text-sm text-zinc-600" datetime={article.datetime} />
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