<script lang="ts">
    import Submit from "./Submit.svelte";

    export let load: Function;
    export let page: number;

    let div: HTMLDivElement;

    let innerWidth: number;

    let submit: Submit;
    let loading = false;

    function inView (el: HTMLElement) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        }

    async function checkPosition(clicked: boolean) {
        if (clicked || innerWidth >= 1024) {
            if (inView(div) && !loading) {
                loading = true;
                submit.disable();
                await load();
                loading = false;
                submit.enable();
            }
        }
    }
</script>

<div bind:this={div} class="flex flex-wrap justify-center w-full">
    <div class="w-full flex justify-center">
        <Submit bind:this={submit} value={"Load More"} styles={((page !== -1 && innerWidth < 1024) ? '' : 'opacity-0') + " w-full bg-emerald-700 text-zinc-50 p-4 font-bold disabled:bg-emerald-900 disabled:cursor-default hover:bg-emerald-900 hover:cursor-pointer"} onclick={() => checkPosition(true)}/>
    </div>
    <img class="{(loading && innerWidth >= 1024) ? '' : 'opacity-0'}" src="/spinner.gif" alt="loading" width="50px" height="50px">
</div>

<svelte:window on:scroll={() => checkPosition(false)} bind:innerWidth={innerWidth} />
