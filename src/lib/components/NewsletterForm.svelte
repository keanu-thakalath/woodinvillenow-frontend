<script lang="ts">
    import { PUBLIC_BACKEND_DOMAIN } from "$env/static/public";
    import Submit from "./Submit.svelte";

    export let compact = false;

    let input: HTMLInputElement;
    let submit: Submit;
    let disabled = true;
    let success = '';
    let fail = '';
    function handleInputChange() {
        if (!compact) {
            if (input.value) {
                disabled = false;
            }
            else {
                disabled = true;
            }
        }
    }

    async function handleSubmit(e: SubmitEvent) {
        if (!compact) submit.disable();
        input.disabled = true;
        success = '';
        fail = '';

        const res = await fetch(`${PUBLIC_BACKEND_DOMAIN}/api/newsletter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: input.value
            })
        });
        const json = await res.json();
        if (!compact) submit.enable();
        input.disabled = false;
        if (res.status == 201) {
            success = 'Awesome! You\'ve been added to our mailing list.';
        }
        else if (res.status == 400) {
            fail = json.message;
        }
        else {
            fail = 'Something went wrong. Please try again later and send us an email if the problem persists.';
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="mt-5">
    <div class="relative">
        <input on:input={handleInputChange} bind:this={input} class="{compact ? 'pl-10 text-sm' : 'pl-12 text-lg'} w-full p-2 rounded focus:outline-none border border-gray-200 focus:border-emerald-400" type="email" placeholder="Email">
        <svg class="{compact ? 'w-4 h-4' : 'w-6 h-6'} absolute top-0 m-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        <p class="{success.length > 0 ? '' : 'hidden'} text-sm text-emerald-500">{success}</p>
        <p class="{fail.length > 0 ? '' : 'hidden'} text-sm text-red-500">{fail}</p>
    </div>
    {#if !compact}
        <Submit bind:this={submit} value="Sign Up" disabled={disabled} />
    {/if}
</form>