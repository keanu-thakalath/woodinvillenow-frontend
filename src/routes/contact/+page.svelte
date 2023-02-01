<script lang="ts">
    import StayUpToDate from "$lib/components/StayUpToDate.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import Head from "$lib/components/Head.svelte";
</script>

<Head title={`Contact Us`} url={`/contact`} description={'WoodinvilleNow is dedicated to presenting accurate information. If you have any questions, ideas, or feedback, don\'t be afraid to talk to us!'} />

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-5xl font-bold border-b-2 border-slate-200 py-3 mb-10">Contact Us</h1>
        <div class="flex flex-wrap">
            <section class="md:w-9/12 md:pr-10">
                <p class="text-lg mb-10">We meet at Woodinville High School every Tuesday in Room 235. If you'd like to join our club, just show up!</p>
                <p class="text-lg">We are dedicated to presenting accurate information and will correct any content that is false or misleading. If you have any questions, ideas, or feedback, please use the resources below to contact us.</p>
                <h2 class="text-3xl font-semibold mt-16 mb-8 font-serif">Email</h2>
                <a href="mailto:woodinvillenow@gmail.com" class="text-xl mt-10 text-blue-400 hover:underline">woodinvillenow@gmail.com</a>
                <h2 class="text-3xl font-semibold mt-16 mb-8 font-serif">Instagram</h2>
                <a target="_blank" rel="noreferrer" href="https://instagram.com/woodinvillenow" class="text-xl mt-10 text-blue-400 hover:underline">@woodinvillenow</a>
            </section>
            <section class="md:w-3/12 mt-10 md:mt-0">
                <StayUpToDate />
                <MostReadArticles />
            </section>
        </div>
    </div>
</div>
