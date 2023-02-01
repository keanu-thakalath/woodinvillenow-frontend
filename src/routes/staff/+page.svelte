<script lang="ts">
    import FollowUs from "$lib/components/FollowUs.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    import StayUpToDate from "$lib/components/StayUpToDate.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import Head from "$lib/components/Head.svelte";
    import type { PageData } from './$types';

    export let data: PageData;
    let authors = {
        'administration': [],
        'editors': [],
        'authors': [],
        'graphic design': []
    };
    data.authors.forEach(author => {
        if (author.active) {
            authors[author.group].push(author);
        }
    });
</script>

<Head title={'Staff'} description='Meet the hardworking team at WoodinvilleNow!' url={'/staff'} />

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-5xl font-bold border-b-2 border-slate-200 py-3 mb-10">Meet the Team</h1>
        <div class="flex flex-wrap">
            <section class="md:w-10/12 md:pr-10">
                {#each Object.keys(authors) as group}
                    <div class="pb-10">
                        <h2 class="text-2xl font-bold text-center py-3 capitalize">{group}</h2>
                        <div class="flex flex-wrap justify-center">
                            {#each authors[group] as author}
                                <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                                    <h3><a href="/staff/{author.url_slug}"><img class="author p-3" src="{author.profile_pic}" alt="{author.name}"></a></h3>
                                    <a href="/staff/{author.url_slug}" class="block text-lg font-semibold mx-3">{author.name}</a>
                                    <p class="block font-semibold text-zinc-600 mx-3">{author.title}</p>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </section>
            <section class="md:w-2/12">
                <FollowUs />
                <JoinUs />
                <StayUpToDate />
                <MostReadArticles />
            </section>
        </div>
    </div>
</div>

<style lang="scss">
    img.author {
        aspect-ratio: 1 / 1;
        filter: grayscale(100%);
        object-fit: cover;
        transition: .1s ease-out;
        &:hover {
            padding: .5rem;
            filter: none;
        }
    }
</style>
