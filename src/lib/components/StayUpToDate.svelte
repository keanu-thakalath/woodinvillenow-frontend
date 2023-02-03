<script lang="ts">
    import NewsletterForm from "./NewsletterForm.svelte";

    export let compact = false;
</script>

<div class="{compact ? '' : 'bg-slate-600'} rounded-md mb-10 stay-up-to-date">
    {#if !compact }<img src="/donate_img.jpeg" alt="Members of WoodinvilleNow at a meeting." class="rounded-t-md">{/if}
    <div class="px-4 pb-5">
        {#if !compact }<h2 class="text-zinc-50 mt-5 text-lg font-bold">Stay up to date</h2>{/if}
        <p class="{compact ? 'pt-3 font-semibold text-zinc-600 text-center' : 'text-zinc-300'}">Join our newsletter and be the <span class="font-bold {compact ? 'text-emerald-600' : ''}">first</span> to read about news in Woodinville.</p>
        <NewsletterForm compact={true} />
    </div>
</div>