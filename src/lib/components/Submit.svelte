<script lang="ts">
    export let value: string;
    export let styles = 'mt-5 text-center w-full p-4 bg-emerald-700 text-zinc-50 uppercase text-lg font-bold disabled:bg-emerald-900 disabled:cursor-default hover:bg-emerald-900 hover:cursor-pointer'
    export let disabled = false;
    export let onclick = () => {};
    let inpValue = value;
    let inp: HTMLInputElement;
    let loading = false;

    export function disable() {
        inp.disabled = true;
        inpValue = '';
        loading = true;
    }
    export function enable() {
        inp.disabled = false;
        inpValue = value;
        loading = false;
    }
</script>

<input bind:this={inp} class="{loading ? 'loading': ''} {styles}" type="submit" value="{inpValue}" {disabled} on:click={onclick}>

<style lang="scss">
    .loading {
        background-image: url("/spinner.gif");
        background-size: 25px 25px;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>