<script lang="ts">
    import FollowUs from "$lib/components/FollowUs.svelte";
    import JoinUs from "$lib/components/JoinUs.svelte";
    import StayUpToDate from "$lib/components/StayUpToDate.svelte";
    import MostReadArticles from "$lib/components/MostReadArticles.svelte";
    import Head from "$lib/components/Head.svelte";
</script>

<Head title={`About Us`} url={`/about`} />

<div class="flex justify-center mt-10 pb-10">
    <div class="custom-container">
        <h1 class="text-5xl font-bold border-b-2 border-slate-200 py-3 mb-10">About Us</h1>
        <div class="flex flex-wrap">
            <section class="md:w-9/12 md:pr-10">
                <h2 class="text-3xl font-semibold mb-8 font-serif">Our Mission</h2>
                <p class="text-xl italic font-serif border-b-2 border-slate-200 pb-5">To provide the opportunity for Woodinville High School students to share what is important to them with their community at Woodinville High School and Woodinville at large. We believe there is no fair education without enlightenment, honesty, accuracy, and fairness.</p>
                <p class="text-xl mt-10">Our club takes on the responsibility of sharing multiple viewpoints and encourages the spread of ideas, information, and civil dialogue. We are dedicated to presenting accurate information and will correct any content that is false or misleading. If you have any questions, ideas, or feedback, please <a href="/contact" class="underline">contact us</a>.</p>
                <h2 class="text-3xl font-semibold mt-16 mb-8 font-serif">Message From the Advisor</h2>
                <p class="text-lg mt-10">Conceived in September, 2018, by a few passionate students, the elephant-like gestation time of Woodinville Now is a testament to the courage and persistence of both the founder, Lily Pell (2019), and the current editorial, writing and design team.</p>
                <p class="text-lg mt-10">Journalism in democracies is ideally considered the voice of the people in holding its government accountable. In reality, its roles vary widely, from mouthpiece for government to dismantler of corruption; from propaganda machine to deep respect for evidence.  When journalists are murdered and disappeared regularly around the world, choosing truth over the easy habit of accepting and disseminating lies, is an act of profound agency and a vote for the basic dignity of humanity.  It can also be a dangerous calling—one that takes guts and adherence to strict principles.  Journalism is not a job for just anyone—it is a job for the very brave amongst us. </p>
                <p class="text-lg mt-10">At the high school level, journalism is often about what's on students' minds, what's happening at school, who scored at the game, or who needs to be recognized.  It's a place where student voices are free from adult judgment and adult-driven content.  It is a place for students to influence school culture, to ask questions of the adults who direct their learning, and to comment on what they are being compelled to learn. It is also a place to make mistakes, to perhaps fail to report in a fair way, and a place to address and take responsibility for those failings publicly.</p>
                <p class="text-lg mt-10">Woodinville Now is the result of students at Woodinville High School exercising their rights to speech, committing to the highest ethical standards of journalism, and engaging their peers in dialogue about the place they call home ten months a year, five days a week, eight hours a day. I am honored to serve as their primary advisor.</p>
                <p class="signature text-3xl md:text-5xl my-20">Christine Traxler</p>
            </section>
            <section class="md:w-3/12">
                <FollowUs />
                <JoinUs />
                <StayUpToDate />
                <MostReadArticles />
            </section>
        </div>
    </div>
</div>

<style lang="scss">
    @import url('https://fonts.cdnfonts.com/css/claster-oleander-signature');
    .signature {
        font-family: 'Claster Oleander Signature', sans-serif;
    }
</style>