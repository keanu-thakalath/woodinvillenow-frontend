<script lang="ts">
    let opacity = '0%';
    let message = '';
    let div: HTMLDivElement;

    export function show(m: string) {
        message = m;
        opacity = '90%';
        div.classList.remove('-z-50');
        div.classList.add('z-50');
    }
    async function handleClick() {
        opacity = '0%';
        div.classList.add('-z-50');
        div.classList.remove('z-50');
    }
</script>

<div bind:this={div} class="flex justify-center absolute w-full -z-50" style="opacity: {opacity};">
    <div class="bg-red-100 border-l-4 w-96 border-red-500 text-red-700 p-4 m-5" role="alert">
        <div class="flex justify-between">
            <div>
                <p class="font-bold">Oops!</p>
                <p>{message}</p>
            </div>
            <div class="flex items-center">
                <button on:click={handleClick} type="button" aria-label="close"><svg class="w-6 h-6 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
        </div>
    </div>
</div>