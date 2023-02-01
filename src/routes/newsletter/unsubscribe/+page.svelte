<script lang="ts">
    import Datetime from "$lib/components/Datetime.svelte";
    import FollowUs from "$lib/components/FollowUs.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import UnsubscribeForm from "$lib/components/UnsubscribeForm.svelte";
    import Head from "$lib/components/Head.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<Head title={`Unsubscribe`} url={`/newsletter/unsubscribe`}/>

<svelte:head>
    <meta name="robots" content="noindex">
</svelte:head>

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-2xl md:text-5xl font-bold border-b-2 border-slate-200 py-3 mb-10">Unsubscribe from our newsletter</h1>
        <div class="flex flex-wrap">
            <section class="md:w-9/12 md:pr-10">
                <p class="text-md sm:text-lg md:text-xl mb-2 md:mb-5 font-serif">Dear loyal patron of WoodinvilleNow,</p>
                <p class="text-md sm:text-lg md:text-xl font-serif">you subscribed to our newsletter <Datetime showDateAfterDay={false} datetime={data.email.datetime} />. Since then, we've been through so much. Ups and downs, wild stories, mild stories, good times, hard times, peaks, and valleys. We've had so much fun together, sharing articles, comments, and joy. Now that it's down to the final hour, we must ask: are you sure you want to unsubscribe <span class="text-zinc-500">{data.email.email}</span> from our newsletter? <a class="underline" href="/">Click here</a> to go home instead.</p>
                <UnsubscribeForm auth_token={data.auth_token} />
            </section>
            <section class="md:w-3/12 mt-10 md:mt-0">
                <FollowUs />
                <JoinUs />
                <MostReadArticles />
            </section>
        </div>
    </div>
</div>