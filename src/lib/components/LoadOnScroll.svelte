<script lang="ts">
    export let load: Function;
    let loading = false;

    let div: HTMLDivElement;

    function inView (el: HTMLElement) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        }

    async function checkPosition() {
        if (inView(div) && !loading) {
            loading = true;
            await load();
            loading = false;
        }
    }
</script>

<div bind:this={div}>
</div>

<svelte:window on:scroll={checkPosition} />