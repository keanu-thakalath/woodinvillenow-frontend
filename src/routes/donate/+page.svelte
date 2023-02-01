<script lang="ts">
    import FollowUs from "$lib/components/FollowUs.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    import StayUpToDate from "$lib/components/StayUpToDate.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import Head from "$lib/components/Head.svelte";
</script>

<Head title={`Donate`} url={`/donate`} />

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container max-w-7xl">
        <h1 class="text-3xl md:text-5xl font-extrabold border-b-2 border-slate-200 py-3 mb-10">Support Student Journalism</h1>
        <div class="flex flex-wrap">
            <section class="md:w-9/12 md:pr-10">
                <p class="donate-text text-lg mb-10">WoodinvilleNow is a nonprofit organization. That means all of our expenses are covered by fundraisers and donations. If you like our work, please visit our district's donation page below and select <span>Woodinville High School</span> under <span>School</span> and <span>ASB JOURNALISM TOUCHBASE LITE DONATIONS</span> under <span>Item</span>, then enter the amount you want to donate and click <span>Buy</span>, then <span>Checkout</span>.</p>
                <a target="_blank" rel="noreferrer" class="block w-full p-3 my-5 bg-emerald-700 text-zinc-50 text-center text-xl font-bold hover:text-zinc-50 hover:bg-emerald-600" href="https://wa-northshore-lite.intouchreceipting.com/">Click here to donate</a>
                <img class="w-full rounded" src="/donate_img_big.jpeg" alt="Members of WoodinvilleNow at a meeting.">
                <h2 class="text-3xl mt-5 text-center">Thank you for your generosity!</h2>
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

<style lang="scss">
    .donate-text span {
        @apply text-base text-emerald-700;
    }
</style>
