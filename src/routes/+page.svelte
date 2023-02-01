<script lang="ts">
    import Datetime from '$lib/components/Datetime.svelte';
    import FollowUs from '$lib/components/FollowUs.svelte';
    import JoinUs from '$lib/components/JoinUs.svelte';
    import MostReadArticles from '$lib/components/MostReadArticles.svelte';
    import StayUpToDate from '$lib/components/StayUpToDate.svelte';
    import LoadOnScroll from '$lib/components/LoadOnScroll.svelte';
    import Head from '$lib/components/Head.svelte';
    import type { PageData } from './$types';
    import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

    export let data: PageData;
    let page = 1;

    for (let i = 4; i >= 0; i--) {
        if (data.articles[i].categories[0].category.name === 'Poetry') {
            data.articles.splice(i, 1);
        }
    }
    let cover_article = data.articles.shift();
    let side_article = data.articles.shift();
    let third_article = data.articles.shift();
    let fourth_and_fifth_articles = data.articles.splice(0, 2);

    async function loadArticles() {
        if (page > -1) {
            page++;
            let articles = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles?page=${page}&limit=${data.limit}`).then((res) => res.json());
            if (articles.length < data.limit) {
                page = -1;
            }
            data.articles = [...data.articles, ...articles];
        }
    }
</script>

<Head />

<section class="flex justify-center mt-16 pb-10">
    <div class="custom-container">
        <div class="w-full lg:w-2/3 xl:w-3/4 lg:border-r-2 border-slate-200 lg:pr-10">
            <div class="flex flex-wrap border-b-2 border-slate-200 pb-10 mb-10">
                <div class="w-100 order-2 xl:order-1 xl:w-4/12">
                    {#each cover_article.tags as tag, i}
                        <a class="text-xs font-bold uppercase" href="/tags?tag={tag.tag.url_slug}">{tag.tag.name}</a>{#if i != cover_article.tags.length - 1}{", "}{/if}
                    {/each}
                    <a href="/articles/{cover_article.url_slug}" class="block text-xl md:text-3xl text-zinc-800 font-extrabold">{cover_article.title}</a>
                    <h2 class="text-zinc-800 py-3">{cover_article.excerpt}</h2>
                    <h3 class="text-zinc-600 text-sm">
                        By
                        {#each cover_article.authors as author, i}
                            <a href="/staff/{author.author.url_slug}">{author.author.name}</a>{", "}
                        {/each}
                        <Datetime dateStyle={'medium'} class="text-sm text-zinc-600" datetime={cover_article.datetime} />
                    </h3>
                </div>
                <div class="w-100 order-1 xl:order-2 xl:w-8/12 xl:pl-5">
                    <a href="/articles/{cover_article.url_slug}"><img src="{cover_article.cover_img}" alt="{cover_article.cover_img_caption}" class="landscape w-full"></a>
                </div>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full pb-10 border-b-2 lg:w-6/12 border-slate-200 lg:border-r-2 lg:border-b-0 lg:pb-0 lg:pr-5 xl:pr-10">
                    <div class="flex flex-wrap">
                        <div class="w-8/12 lg:w-full lg:order-2 xl:order-1 xl:w-8/12 pr-5">
                            {#each third_article.tags as tag, i}
                                <a class="text-xs font-bold uppercase" href="/tags?tag={tag.tag.url_slug}">{tag.tag.name}</a>{#if i != third_article.tags.length - 1}{", "}{/if}
                            {/each}
                            <a href="/articles/{third_article.url_slug}" class="block text-xl text-zinc-800 font-extrabold">{third_article.title}</a>
                            <div>
                                <h2 class="text-zinc-800 py-3 text-sm">{third_article.excerpt}</h2>
                                <h3 class="text-zinc-600 text-sm">
                                    By
                                    {#each third_article.authors as author, i}
                                        <a href="/staff/{author.author.url_slug}">{author.author.name}</a>{", "}
                                    {/each}
                                    <Datetime dateStyle={'medium'} class="text-sm text-zinc-600" datetime={third_article.datetime} />
                                </h3>
                            </div>
                        </div>
                        <div class="w-4/12 lg:w-full lg:order-1 xl:order-2 xl:w-4/12">
                            <a href="/articles/{third_article.url_slug}"><img src="{third_article.cover_img}" alt="{third_article.cover_img_caption}" class="square lg:landscape w-full"></a>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap w-full pt-10 mb-10 border-200-slate border-b-2 lg:border-b-0 lg:pt-0 lg:w-6/12 lg:pl-5 xl:pl-10">
                    {#each fourth_and_fifth_articles as article, i}
                        <div class="w-full sm:w-6/12 border-slate-200 {i == 0 ? 'sm:border-r-2' : ''} {i == 0 ? 'sm:pr-5': 'sm:pl-5'} lg:px-0 lg:border-r-0 lg:w-full flex mb-5">
                            <div class="w-full xl:w-9/12 xl:pr-5">
                                {#each article.tags as tag, i}
                                    <a class="text-xs font-bold uppercase" href="/tags?tag={tag.tag.url_slug}">{tag.tag.name}</a>{#if i != article.tags.length - 1}{", "}{/if}
                                {/each}
                                <a href="/articles/{article.url_slug}" class="block text-zinc-800 font-extrabold">{article.title}</a>
                                <h3 class="text-zinc-600 text-sm mt-3">
                                    By
                                    {#each article.authors as author, i}
                                        <a href="/staff/{author.author.url_slug}">{author.author.name}</a>{", "}
                                    {/each}
                                    <Datetime dateStyle={'medium'} class="text-sm text-zinc-600" datetime={article.datetime} />
                                </h3>
                            </div>
                            <div class="lg:hidden xl:block w-3/12">
                                <a href="/articles/{article.url_slug}"><img src="{article.cover_img}" alt="{article.cover_img_caption}" class="square w-full"></a>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <div class="w-full lg:w-1/3 xl:w-1/4 lg:pl-10">
            <div class="flex flex-wrap">
                <div class="order-1 w-10/12 sm:w-full">
                    {#each side_article.tags as tag, i}
                        <a class="text-xs font-bold uppercase" href="/tags?tag={tag.tag.url_slug}">{tag.tag.name}</a>{#if i != side_article.tags.length - 1}{", "}{/if}
                    {/each}
                    <a href="/articles/{side_article.url_slug}" class="block text-xl lg:text-lg text-zinc-800 font-extrabold">{side_article.title}</a>
                </div>
                <div class="order-2 sm:order-3 w-2/12 lg:order-2 lg:w-full">
                    <a href="/articles/{side_article.url_slug}"><img src="{side_article.cover_img}" alt="{side_article.cover_img_caption}" class="square lg:portrait w-full"></a>
                </div>
                <div class="order-3 sm:order-2 lg:order-3 lg:w-full sm:pr-5 lg:pr-0">
                    <h2 class="text-zinc-800 py-3 text-sm">{side_article.excerpt}</h2>
                    <h3 class="text-zinc-600 text-sm">
                        By
                        {#each side_article.authors as author, i}
                            <a href="/staff/{author.author.url_slug}">{author.author.name}</a>{", "}
                        {/each}
                        <Datetime dateStyle={'medium'} class="text-sm text-zinc-600" datetime={side_article.datetime} />
                    </h3>
                </div>
            </div>
            {#if data.poems.length > 0}
                <div class="mt-5">
                    <h2 class="font-extrabold text-zinc-800 text-xl mb-1 border-slate-200 border-b-2 pb-2">Featured Poems</h2>
                    {#each data.poems as article}
                        <div class="pb-3 mt-2 border-b-2 border-slate-200">
                            {#each article.tags as tag, i}
                                <a class="text-xs font-bold uppercase" href="/tags?tag={tag.tag.url_slug}">{tag.tag.name}</a>{#if i != article.tags.length - 1}{", "}{/if}
                            {/each}
                            <a href="/articles/{article.url_slug}" class="block text-zinc-800 font-medium">{article.title}</a>
                            <h3 class="text-zinc-600 text-sm">
                                By
                                {#each article.authors as author, i}
                                    <a href="/staff/{author.author.url_slug}">{author.author.name}</a>{", "}
                                {/each}
                                <Datetime dateStyle={'medium'} class="text-sm text-zinc-600" datetime={article.datetime} />
                            </h3>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>
<section class="flex justify-center lg:mt-10 pb-10">
    <div class="custom-container">
        <div class="order-2 w-full md:w-3/12 lg:order-1 lg:w-2/12 lg:pr-5">
            <FollowUs />
            <div class="mb-10 bg-slate-600 rounded-md pb-5">
                <img src="/donate_img.jpeg" alt="Members of WoodinvilleNow at a meeting." class="rounded-t-md">
                <div class="text-center">
                    <p class="px-1 xl:px-4 text-zinc-50 text-center mt-5 text-md xl:text-lg"><span class="font-bold">WoodinvilleNow</span> needs <span class="font-bold">your</span> help.</p>
                    <a target="_blank" href="/donate" class="inline-block text-center py-1 max-w-[164px] w-[90%] mt-5 bg-emerald-600 text-zinc-50 font-bold rounded-md hover:text-zinc-50 hover:bg-emerald-500">Donate</a>
                </div>
            </div>
            <div class="mb-5 md:mb-10">
                <h2 class="font-extrabold text-zinc-800 text-lg mb-1">Contact Us</h2>
                <p class="text-sm">We are dedicated to presenting accurate information and will correct any content that is false or misleading. If you have any questions, ideas, or feedback, please <a href="/contact" class="underline">contact us</a>.</p>
            </div>
            <JoinUs />
        </div>
        <div class="order-1 w-full md:w-9/12 pr-5 lg:order-2 lg:w-7/12 lg:pr-0 lg:pl-5">
            {#each data.articles as article}
                <div class="flex pb-5 mb-5 border-b-2 border-slate-200">
                    <div class="w-9/12 xl:w-10/12 pr-5">
                        {#each article.tags as tag, i}
                            <a class="text-xs font-bold uppercase" href="/tags?tag={tag.tag.url_slug}">{tag.tag.name}</a>{#if i != article.tags.length - 1}{", "}{/if}
                        {/each}
                        <a href="/articles/{article.url_slug}" class="block text-md sm:text-xl text-zinc-800 font-extrabold">{article.title}</a>
                        <h2 class="hidden sm:block text-zinc-800 py-1 text-sm lg:text-base">{article.excerpt}</h2>
                        <h3 class="text-zinc-600 text-sm">
                            By
                            {#each article.authors as author, i}
                                <a href="/staff/{author.author.url_slug}">{author.author.name}</a>{", "}
                            {/each}
                            <Datetime dateStyle={'medium'} class="text-sm text-zinc-600" datetime={article.datetime} />
                        </h3>
                    </div>
                    {#if article.cover_img !== ''}
                        <div class="w-3/12 xl:w-2/12">
                            <a href="/articles/{article.url_slug}"><img src="{article.cover_img}" alt="{article.cover_img_caption}" class="square w-full"></a>
                        </div>
                    {/if}
                </div>
            {/each}
            <LoadOnScroll load={loadArticles} />
        </div>
        <div class="w-full order-3 lg:w-3/12 lg:pr-0 lg:pl-5">
            <StayUpToDate />
            <MostReadArticles />
        </div>
    </div>
</section>
<style lang="scss">
    img {
        object-fit: cover;
    }
</style>