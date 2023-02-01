<script lang="ts">
    import NewsletterForm from "./NewsletterForm.svelte";
</script>

<div class="bg-slate-600 rounded-md pb-5 mb-10">
    <img src="/donate_img.jpeg" alt="Members of WoodinvilleNow at a meeting." class="rounded-t-md">
    <div class="px-4">
        <h2 class="text-zinc-50 mt-5 text-lg font-bold">Stay up to date</h2>
        <p class="text-zinc-300">Join our newsletter and be the <span class="font-bold">first</span> to read about news in Woodinville</p>
        <NewsletterForm compact={true} />
    </div>
</div>