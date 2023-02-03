<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

</script>

<section class="flex justify-center pt-40">
    <div class="w-9/12 bg-gray-100 text-gray-900 rounded-md px-10 py-2">
        <h1 class="font-bold text-2xl my-10">Comments for <a href="/articles/{data.slug}">{data.slug}</a></h1>
        <div class="my-3 flex justify-between items-center border-b-2 py-5 border-gray-300">
            <p class="w-1/3 font-bold">ID</p>
            <p class="w-1/3">Name</p>
            <p class="w-1/3">Datetime</p>
        </div>
        {#each data.comments as comment}
            <div class="my-3 flex justify-between items-center border-b-2 py-5 border-gray-300">
                <p class="w-1/3"><a href="/admin/articles/{data.slug}/comments/{comment.id}">{comment.id}</a></p>
                <p class="w-1/3">{comment.name}</p>
                <p class="w-1/3">{comment.datetime}</p>
            </div>
        {/each}
    </div>
</section>

