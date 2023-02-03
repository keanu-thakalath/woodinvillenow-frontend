<script lang="ts">
    import Datetime from '$lib/components/Datetime.svelte'
    import Submit from '$lib/components/Submit.svelte';
    import type { PageData } from './$types';
    import './page.scss';
    import Head from '$lib/components/Head.svelte';
    import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';
    import StayUpToDate from '$lib/components/StayUpToDate.svelte';
    import { page } from '$app/stores';

    export let data: PageData;

    let comments = [];
    let similar_articles = [];

    page.subscribe(async () => {
        comments = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles/${data.article.url_slug}/comments`).then(res => res.json());
        similar_articles = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles?category=${data.article.categories[0].category.url_slug}&sort_by=views&limit=6`).then(res => res.json());
        for (let i = 0; i < similar_articles.length; i++) {
            if (similar_articles[i].id === data.article.id) {
                similar_articles.splice(i, 1);
                break;
            }
        }

        await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/analytics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                article: data.article.url_slug,
                views: true
            })
        });
	});

    let submit: Submit;
    let name: String;
    let content: String;
    let fail = '';

    async function handleCommentSubmit(e: SubmitEvent) {
        submit.disable();
        fail = '';

        const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles/${data.article.url_slug}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, content })
        });
        const comment = await res.json();
        submit.enable();
        if (res.status == 201) {
            name = '';
            content = '';
            comments = [comment, ...comments];
        }
        else if (res.status == 400) {
            fail = comment.message;
        }
        else {
            fail = 'Something went wrong. Please try again later.';
        }
    }
    
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': data.article.title,
        'description': data.article.excerpt,
        'image': [
            data.article.cover_img
        ],
        'datePublished': data.article.datetime,
        'author': data.article.authors.map(({ author }) => {
            return {
                '@type': 'Person',
                'name': author.name,
                'url': `https://woodinvillenow.org/staff/${author.url_slug}`
            };
        })
    };
    let jsonLdScript = `
        <script type="application/ld+json">
        ${JSON.stringify(schema)}
        ${'<'}/script>
    `;
</script>

<Head title={`${data.article.title}`} url={`/articles/${data.article.url_slug}`} description={data.article.excerpt} image={data.article.cover_img} type={'article'} />

<svelte:head>
    {@html jsonLdScript}
</svelte:head>

<article class="{data.article.cover_img_style === 'full' ? 'cover': ''}">
    {#if data.article.cover_img_style === 'normal'}
        <header class="flex justify-center mt-10">
            <div class="custom-container justify-center">
                <div class="w-full max-w-3xl">
                    {#each data.article.categories as category, i}
                        <a class="text-xl font-semibold text-blue-400 hover:underline" href="/categories/{category.category.url_slug}">{category.category.name}</a>{#if i != data.article.categories.length - 1}{", "}{/if}
                    {/each}
                    <h1 class="w-full text-2xl lg:text-5xl text-zinc-800 font-extrabold pb-4">{data.article.title}</h1>
                    <h2 class="w-full lg:text-lg text-zinc-500 font-semibold py-3">{data.article.excerpt}</h2>
                    <img src="{data.article.cover_img}" alt="{data.article.cover_img_caption}" class="max-w-full mt-10 ml-auto mr-auto">
                    <p class="mt-2 text-zinc-400 text-sm">{data.article.cover_img_caption}</p>
                    <h3 class="w-full text-zinc-800 font-bold pt-10">
                        By
                        {#each data.article.authors as author, i}
                            <a class="hover:underline text-blue-400" href="/staff/{author.author.url_slug}">{author.author.name}</a>{#if i != data.article.authors.length - 1}{", "}{/if}
                        {/each}
                    </h3>
                    <Datetime class="text-zinc-600" datetime={data.article.datetime} />
                </div>
            </div>
        </header>
    {:else if data.article.cover_img_style === 'full'}
        <header>
            <div class="hero-container">
                <div class="hero">
                    <div class="meta">
                        <h1 class="text-2xl lg:text-5xl text-gray-100 font-extrabold">{data.article.title}</h1>
                        <h3 class="text-gray-100 font-bold pt-10">
                            By
                            {#each data.article.authors as author, i}
                                <a class="hover:underline text-blue-400" href="/staff/{author.author.url_slug}">{author.author.name}</a>{#if i != data.article.authors.length - 1}{", "}{/if}
                            {/each}
                        </h3>
                        <Datetime class="text-zinc-300" datetime={data.article.datetime} />
                    </div>
                    <img src="{data.article.cover_img}" alt="{data.article.cover_img_caption}">
                </div>
            </div>
            <div class="">
                <p class="w-1/3 mt-2 pl-10 text-zinc-400 text-sm">{data.article.cover_img_caption}</p>
                <div class="flex justify-center mt-10">
                    <div class="custom-container justify-center">
                        <h2 class="w-full max-w-3xl lg:text-lg font-semibold text-zinc-600">{data.article.excerpt}</h2>
                    </div>
                </div>
            </div>
        </header>
    {:else}
        <header class="flex justify-center mt-10">
            <div class="custom-container justify-center">
                <div class="w-full max-w-3xl">
                    {#each data.article.categories as category, i}
                        <a class="text-xl font-semibold text-blue-400 hover:underline" href="/categories/{category.category.url_slug}">{category.category.name}</a>{#if i != data.article.categories.length - 1}{", "}{/if}
                    {/each}
                    <h1 class="w-full text-4xl text-zinc-800 font-bold pb-1">{data.article.title}</h1>
                    <h2 class="w-full text-lg text-zinc-500 font-medium py-3">{data.article.excerpt}</h2>
                    <h3 class="w-full text-zinc-800 font-bold pt-4">
                        By
                        {#each data.article.authors as author, i}
                            <a class="hover:underline text-blue-400" href="/staff/{author.author.url_slug}">{author.author.name}</a>{#if i != data.article.authors.length - 1}{", "}{/if}
                        {/each}
                    </h3>
                    <Datetime class="text-zinc-600" datetime={data.article.datetime} />
                </div>
            </div>
        </header>
    {/if}
    <div class="flex flex-wrap justify-center">
        <div class="custom-container justify-center max-w-5xl">
            <div class="max-w-3xl">
                <aside class="my-5 italic text-zinc-400">This article was produced by Woodinville High School's nonprofit journalism club. If you want to see more stories like these, please consider <a class="text-zinc-800 hover:underline" target="_blank" href="/donate">donating</a> or joining our <a class="text-zinc-800 hover:underline" target="_blank" href="/newsletter">newsletter</a>!</aside>
                <section class="text-zinc-900 content mt-5">
                    {#each data.article.content as content}
                        {#if content === '<StayUpToDate />'}
                            <div class="ml-auto mr-auto max-w-lg">
                                <StayUpToDate compact={true} />
                            </div>
                        {:else}
                            {@html content}
                        {/if}
                    {/each}
                </section>
                <aside>
                    {#each data.article.authors as author}
                        <section class="border-zinc-300 border-t-2 py-5 flex">
                            {#if author.author.profile_pic !== ''}
                                <div class="w-3/12 pr-4">
                                    <a href="/staff/{author.author.url_slug}"><img class="rounded-lg square object-cover" src="{author.author.profile_pic}" alt="{author.author.name}"></a>
                                </div>
                            {/if}
                            <div class="w-9/12">
                                <a class="text-zinc-700 text-xl font-semibold" href="/staff/{author.author.url_slug}">{author.author.name}, {author.author.title}</a>
                                <p class="text-zinc-600">{author.author.bio.length > 0 ? author.author.bio.split('.')[0] + '.' : ''}</p>
                            </div>
                        </section>
                    {/each}
                </aside>
            </div>
            
            <footer class="w-full max-w-5xl mt-10">
                <h3 class="text-xl font-semibold">Similar Articles</h3>
                <div class="flex flex-wrap mb-10 mt-5 py-4 border-y-2 border-slate-200">
                    <div class="md:border-b-2 flex flex-wrap border-slate-200">
                        {#each similar_articles.slice(0, 2) as article, i}
                            <div class="flex w-full md:w-1/2 {i % 2 == 0 ? 'md:pr-3 md:border-r-2' : 'md:pl-3'} border-slate-200 mb-2 md:mb-5">
                                <h2 class="w-4/5 sm:w-11/12 md:w-1/2 pr-2"><a href="/articles/{article.url_slug}" class="font-bold block sm:text-lg lg:text-xl">{article.title}</a></h2>
                                <a href="/articles/{article.url_slug}" class="w-1/5 sm:w-1/12 md:w-1/2"><img src="{article.cover_img}" alt="{article.cover_img_caption}" class="square md:landscape object-cover w-full"></a>
                            </div> 
                        {/each}
                    </div>
                    {#each similar_articles.slice(2, 5) as article, i}
                        <div class="mt-2 md:mt-5 flex w-full md:w-1/3 {i < 2 ? 'md:pr-3 md:border-r-2' : ''} {i > 0 ? 'md:pl-3': ''} border-slate-200 pt-5">
                            <h2 class="w-4/5 sm:w-11/12 md:w-4/5 pr-2"><a href="/articles/{article.url_slug}" class="font-bold block">{article.title}</a></h2>
                            <a href="/articles/{article.url_slug}" class="w-1/5 sm:w-1/12 md:w-1/5"><img src="{article.cover_img}" alt="{article.cover_img_caption}" class="square object-cover w-full"></a>
                        </div> 
                    {/each}
                </div>
                <div class="my-10 pb-10 border-b-2 border-slate-200">
                    <h3 class="text-2xl font-bold">Leave a comment</h3>
                    <form on:submit|preventDefault={handleCommentSubmit} class="w-full mt-5">
                        <div class="relative">
                            <input required bind:value={name} class="pl-12 text-lg w-full p-2 rounded-sm focus:outline-none border border-gray-200 focus:border-emerald-400" type="text" placeholder="Name">
                            <svg class="w-6 h-6 absolute top-0 m-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <div class="relative mt-5">
                            <textarea required bind:value={content} class="pl-12 text-lg w-full p-2 rounded-sm focus:outline-none border border-gray-200 focus:border-emerald-400" rows=5 placeholder="Comment"></textarea>
                            <svg class="w-6 h-6 absolute top-0 m-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                        </div>
                        <Submit value={'Add Comment'} bind:this={submit} />
                        <p class="{fail.length > 0 ? '' : 'hidden'} text-sm text-red-500">{fail}</p>
                    </form>
                </div>
                <div class="pb-10 my-10">
                    {#each comments as comment}
                        <div class="flex my-7 border-b-2 border-slate-200 pb-7">
                            <div class="mr-2">
                                <p class="py-3 px-5 rounded-full bg-slate-200 uppercase text-2xl">{comment.name.charAt(0)}</p>
                            </div>
                            <div>
                                <p class="text-lg text-zinc-400"><span class="text-xl text-zinc-800 font-semibold">{comment.name}</span> • <Datetime datetime={comment.datetime} /></p>
                                <p class="text-lg mt-1">{comment.content}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </footer>
        </div>
    </div>
</article>