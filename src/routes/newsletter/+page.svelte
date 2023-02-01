<script lang="ts">
    import FollowUs from "$lib/components/FollowUs.svelte";
    import Head from "$lib/components/Head.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import NewsletterForm from "$lib/components/NewsletterForm.svelte";
</script>

<Head title={`Newsletter`} url={`/newsletter`} description={'Be the first to read the latest news on what\'s been happening around Woodinville!'}/>

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-5xl font-extrabold border-b-2 border-slate-200 py-3 mb-10">Newsletter</h1>
        <div class="flex flex-wrap">
            <section class="md:w-9/12 md:pr-10">
                <p class="text-xl">Be the first to read what's been happening around Woodinville! Sign up below, and if you change your mind, you can unsubscribe at any time.</p>
                <NewsletterForm />
            </section>
            <section class="md:w-3/12 mt-10 md:mt-0">
                <FollowUs />
                <JoinUs />
                <MostReadArticles />
            </section>
        </div>
    </div>
</div>