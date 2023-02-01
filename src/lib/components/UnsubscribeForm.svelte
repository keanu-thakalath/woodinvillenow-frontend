<script lang="ts">
    import { PUBLIC_BACKEND_DOMAIN } from "$env/static/public";
    import Submit from "./Submit.svelte";

    export let auth_token;

    let submit: Submit;
    let success = '';
    let fail = '';

    async function handleSubmit(e: SubmitEvent) {
        submit.disable();
        success = '';
        fail = '';

        const res = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/newsletteremail`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                auth_token: auth_token
            })
        });
        const json = await res.json();
        submit.enable();
        if (res.status == 200) {
            success = 'You\'ve been removed from our mailing list. We hope to see you again soon!';
        }
        else if (res.status == 404) {
            fail = json.message;
        }
        else {
            fail = 'Something went wrong. Please try again later and send us an email if the problem persists.';
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="mt-5">
    <Submit bind:this={submit} value="Unsubscribe" styles="mt-5 text-center w-full p-4 bg-emerald-700 text-zinc-50 uppercase text-lg font-bold disabled:bg-emerald-900 disabled:cursor-default hover:bg-emerald-900 hover:cursor-pointer"/>
    <p class="{success.length > 0 ? '' : 'hidden'} text-sm text-emerald-500">{success}</p>
    <p class="{fail.length > 0 ? '' : 'hidden'} text-sm text-red-500">{fail}</p>
</form>