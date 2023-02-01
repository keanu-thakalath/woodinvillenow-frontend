<script>
    import { page } from '$app/stores';
</script>

<section class="flex flex-col justify-center h-[60vh] items-center">
        <h2 class="mb-10 text-center text-7xl font-extrabold text-red-600">Oops...</h2>
        <div><img class="" src="/falcon.png" alt=""></div>
        <h1 class="mt-10 text-center text-5xl font-bold">{$page.status == 404 ? 'We couldn\'t find that page.' : $page.error.message}</h1>
        <a class="text-lg underline mt-5" href="/">Click here to go home.</a>
</section>