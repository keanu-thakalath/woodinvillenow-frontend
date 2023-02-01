<script lang="ts">
    interface Option {
        value: number;
        name: string;
    }
    function equals(option: Option, other: Option) {
        return option.value === other.value;
    }
    export let options: Option[];
    export let selected: Option[];
    export let placeholder: string;
    
    selected.forEach((option) => {
        options = options.filter(item => !equals(item, option))
    });

    export function getSelected() {
        return selected;
    }

    selected.forEach((option) => {
        options = options.filter(item => !equals(item, option));
    });

    let shownOptions: Option[] = [];

    let input: HTMLInputElement;
    async function handleInputChange() {
        input.size = Math.max(input.value.length + 1, 6);
        shownOptions = [];
        if (input.value) {
            options.forEach((option) => {
                if (option.name.toLowerCase().includes(input.value)) {
                    shownOptions = [...shownOptions, option];
                }
            });
        }
    }

    function select_option(option: Option) {
        return () => {
            selected = [...selected, option];
            options = options.filter(item => item !== option);
            input.value = "";
            handleInputChange();
        };
    }

    function unselect_option(option: Option) {
        return () => {
            options = [...options, option];
            selected = selected.filter(item => item !== option);
            handleInputChange();
        };
    }
</script>

<div class="p-4 w-full rounded pl-10 text-sm focus:outline-none border border-gray-200 focus:border-red-400 bg-white">
    {#each selected as option}
        <span class="rounded-lg bg-blue-600 px-2 py-1 text-gray-200 mr-2"><button on:click={unselect_option(option)} type="button">X</button> {option.name}</span>
    {/each}
    <input on:input={handleInputChange} bind:this={input} class="inline border-none focus:outline-none bg-gray pl-2" type="text" autocomplete="off" spellcheck="false" placeholder="{placeholder}" size="6" value="">
</div>
<ul>
    {#each shownOptions as option}
        <li on:keydown={select_option(option)} on:click={select_option(option)} class="border-gray-200 bg-white w-full rounded p-2 hover:bg-blue-500 hover:text-gray-50 hover:cursor-pointer" data-value="{option.value}">{option.name}</li>
    {/each}
</ul>