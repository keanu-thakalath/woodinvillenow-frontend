<script lang="ts">
    export let title = '';
    export let description = 'WoodinvilleNow is a club at Woodinville High School that reports on local and global issues.';
    export let url = '';
    export let image = 'https://woodinvillenow.org/logo.png';
    export let type = 'website';
</script>

<svelte:head>
    <title>{title + (title === '' ? 'WoodinvilleNow — Local News by Woodinville High School' : ' — WoodinvilleNow')}</title>
    <meta name="title" content="{title}">
    <meta name="description" content="{description}">

    <meta property="og:type" content="{type}">
    <meta property="og:url" content="https://woodinvillenow.org{url}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:image" content="{image}">

    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://woodinvillenow.org{url}">
    <meta property="twitter:title" content="{title}">
    <meta property="twitter:description" content="{description}">
    <meta property="twitter:image" content="{image}">
</svelte:head>