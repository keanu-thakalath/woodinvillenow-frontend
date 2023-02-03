<script lang="ts">
    import "../app.scss";
    import { afterNavigate } from '$app/navigation';
    import type { AfterNavigate } from "@sveltejs/kit";
    let navInp: HTMLInputElement;
    afterNavigate((navigation: AfterNavigate) => {
        navInp.checked = false;
    });
</script>

<header>
    <div id="top-menu" class="flex justify-center">
        <div class="custom-container block">
            <div id="menu-opts" class="flex items-center">
                <input bind:this={navInp} id="menu-inp" type="checkbox" class="opacity-0 w-0">
                <label role="button" class=" z-20" id="menu-inp-label" for="menu-inp"><span></span></label>
                <a class="mx-auto z-20" href="/"><img class="w-36 lg:w-48" src="/logo.png" alt=""></a>
                <a href="/donate" class="text-center w-14 text-xs order-3 z-20 py-1 md:w-auto md:text-base md:px-12 bg-emerald-600 text-zinc-50 font-bold rounded-sm hover:text-zinc-50 hover:bg-emerald-500">Donate</a>
                <nav id="full-nav">
                    <div class="flex justify-center">
                        <div class="flex flex-wrap w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                            <form action="/search" method="get" class="flex justify-center w-full px-5 lg:mt-20">
                                <input name="query" type="text" placeholder="Search" class="p-1 text-xl w-full pl-5 border-zinc-300 border-2 outline-none hover:border-zinc-400 rounded-md focus:border-zinc-400">
                            </form>
                            <div class="flex flex-wrap mt-10">
                                <div class="w-1/2 mb-5">
                                    <h3>Categories</h3>
                                    <ul>
                                        <li><a href="/categories/society">Society</a></li>
                                        <li><a href="/categories/school">School</a></li>
                                        <li><a href="/categories/media">Media</a></li>
                                        <li><a href="/categories/creative">Creative</a></li>
                                        <li><a href="/categories/poetry">Poetry</a></li>
                                    </ul>
                                </div>
                                <div class="w-1/2 mb-5">
                                    <h3>Tags</h3>
                                    <ul>
                                        <li><a href="/tags?tag=woodinville-high-school">Woodinville High School</a></li>
                                        <li><a href="/tags?tag=modern-issues">Modern Issues</a></li>
                                        <li><a href="/tags?tag=op-ed">Op-Ed</a></li>
                                        <li><a href="/tags?tag=sports">Sports</a></li>
                                        <li><a href="/tags">More...</a></li>
                                    </ul>
                                </div>
                                <div class="w-1/2 mb-5">
                                    <h3>Info</h3>
                                    <ul>
                                        <li><a href="/about">About Us</a></li>
                                        <li><a href="/contact">Contact Us</a></li>
                                        <li><a href="/staff">Staff</a></li>
                                        <li><a href="/newsletter">Newsletter</a></li>
                                        <li><a href="/donate">Donate</a></li>
                                    </ul>
                                </div>
                                <div class="w-1/2 mb-5">
                                    <h3>Social Media</h3>
                                    <ul>
                                        <li><a target="_blank" rel="noreferrer" href="https://instagram.com/woodinvillenow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="inline mr-1" viewBox="0 0 16 16">
                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                        </svg> Instagram</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</header>

<main>
    <slot></slot>
</main>