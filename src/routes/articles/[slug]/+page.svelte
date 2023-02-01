<script lang="ts">
    import Datetime from '$lib/components/Datetime.svelte'
    import Submit from '$lib/components/Submit.svelte';
    import type { PageData } from './$types';
	import { onMount } from 'svelte';
    import './page.scss';
    import Head from '$lib/components/Head.svelte';
    import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

    export let data: PageData;

    let comments = [];

    onMount(async () => {
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

        comments = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/articles/${data.article.url_slug}/comments`).then(res => res.json());
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
            <div class="custom-container max-w-3xl">
                {#each data.article.categories as category, i}
                    <a class="text-xl font-semibold text-blue-400 hover:underline" href="/categories/{category.category.url_slug}">{category.category.name}</a>{#if i != data.article.categories.length - 1}{", "}{/if}
                {/each}
                <h1 class="w-full text-3xl lg:text-5xl text-zinc-800 font-extrabold pb-4">{data.article.title}</h1>
                <h2 class="w-full text-lg text-zinc-500 font-medium py-3">{data.article.excerpt}</h2>
                <img src="{data.article.cover_img}" alt="{data.article.cover_img_caption}" class="w-full mt-10">
                <p class="mt-2 text-zinc-400 text-sm">{data.article.cover_img_caption}</p>
                <h3 class="w-full text-zinc-800 font-bold pt-10">
                    By
                    {#each data.article.authors as author, i}
                        <a class="hover:underline text-blue-400" href="/staff/{author.author.url_slug}">{author.author.name}</a>{#if i != data.article.authors.length - 1}{", "}{/if}
                    {/each}
                </h3>
                <Datetime class="text-zinc-600" datetime={data.article.datetime} />
            </div>
        </header>
    {:else if data.article.cover_img_style === 'full'}
        <header>
            <div class="hero-container">
                <div class="hero">
                    <div class="meta">
                        <h1 class="text-3xl lg:text-5xl text-gray-100 font-extrabold">{data.article.title}</h1>
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
                    <h2 class="custom-container max-w-3xl text-lg font-bold text-zinc-600">{data.article.excerpt}</h2>
                </div>
            </div>
        </header>
    {:else}
        <header class="flex justify-center mt-10">
            <div class="custom-container max-w-3xl">
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
        </header>
    {/if}
    <div class="flex justify-center">
        <div class="custom-container max-w-3xl">
            <div>
                <div class="border-b-2 border-slate-200">
                    <aside class="my-5 italic text-zinc-400">This article was produced by Woodinville High School's nonprofit journalism club. If you want to see more stories like these, please consider <a class="text-zinc-800 hover:underline" target="_blank" href="/donate">donating</a> or joining our <a class="text-zinc-800 hover:underline" target="_blank" href="/newsletter">newsletter</a>!</aside>
                    <section class="text-zinc-900 content font-sans mt-5">{@html data.article.content}</section>
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
            </div>
            <footer class="w-full">
                <div class="my-10">
                    <div class="w-full pb-10 border-b-2 border-slate-200">
                        <h3 class="text-2xl font-bold">Leave a comment</h3>
                        <form on:submit|preventDefault={handleCommentSubmit} class="w-full mt-5">
                            <div class="relative">
                                <input required bind:value={name} class="pl-12 text-lg w-full p-2 rounded-sm focus:outline-none border border-gray-200 focus:border-emerald-400" type="text" placeholder="Name">
                                <svg class="w-6 h-6 absolute top-0 m-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div class="relative mt-5">
                                <textarea required bind:value={content} class="pl-12 text-lg w-full p-2 rounded-sm focus:outline-none border border-gray-200 focus:border-emerald-400" rows=5 placeholder="Comment"></textarea>
                                <svg class="w-6 h-6 absolute top-0 m-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                            </div>
                            <Submit value={'Add Comment'} bind:this={submit} />
                            <p class="{fail.length > 0 ? '' : 'hidden'} text-sm text-red-500">{fail}</p>
                        </form>
                    </div>
                </div>
                <div class="my-10">
                    <div class="w-full pb-10">
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
                </div>
            </footer>
        </div>
    </div>
</article>

<style lang='scss'>
    article.cover {
        margin-top: -100px;
    }
</style>