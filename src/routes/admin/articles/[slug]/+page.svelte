<script lang="ts">
    import Alert from '$lib/components/Alert.svelte'
    import Submit from '$lib/components/Submit.svelte';
    import MultiSelect from '$lib/components/MultiSelect.svelte';
    import type { PageData } from './$types';
    import { get_auth_header } from '$lib/client/auth';
    import { PUBLIC_BACKEND_DOMAIN } from '$env/static/public';

    export let data: PageData;

    let authorOptions = data.authors.map((author: { id: number; name: string; }) => { return {value: author.id, name: author.name} });
    let authorSelected = data.article.authors.map((author: {author: {id: number, name: string}}) => { return {value: author.author.id, name: author.author.name } });
    let categoryOptions = data.categories.map((category: { id: number; name: string; }) => { return {value: category.id, name: category.name} });
    let categorySelected = data.article.categories.map((category: {category: {id: number, name: string}}) => { return {value: category.category.id, name: category.category.name } });
    let tagOptions = data.tags.map((tag: { id: number; name: string; }) => { return {value: tag.id, name: tag.name} });
    let tagSelected = data.article.tags.map((tag: {tag: {id: number, name: string}}) => { return {value: tag.tag.id, name: tag.tag.name } });

    let authorSelect: MultiSelect;
    let categorySelect: MultiSelect;
    let tagSelect: MultiSelect;
    let alert: Alert;
    let submit: Submit;
    let deleteSubmit: Submit;

    let draft = data.article.draft.toString();

    async function handleDeleteSubmit(e: SubmitEvent) {
        deleteSubmit.disable();

        const res = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/articles/${data.article.url_slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            }
        });
        const article = await res.json();
        if (res.status == 200) {
            location.href = `/admin/articles`;
        }
        else {
            alert.show(article.message);
            deleteSubmit.enable();
        }
    }

    async function handleSubmit(e: SubmitEvent) {
        submit.disable();
        

        const res = await fetch(`http://${PUBLIC_BACKEND_DOMAIN}/api/articles/${data.article.url_slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': get_auth_header()
            },
            body: JSON.stringify({
                title: data.article.title,
                excerpt: data.article.excerpt,
                cover_img: data.article.cover_img,
                cover_img_caption: data.article.cover_img_caption,
                cover_img_style: data.article.cover_img_style,
                content: data.article.content,
                draft: draft === 'true',
                author_ids: authorSelect.getSelected().map((option) => option.value),
                category_ids: categorySelect.getSelected().map((option) => option.value),
                tag_ids: tagSelect.getSelected().map((option) => option.value)
            })
        });
        const article = await res.json();
        if (res.status == 200) {
            location.href = `/admin/articles`;
        }
        else {
            alert.show(article.message);
            submit.enable();
        }
    }
</script>

<Alert bind:this={alert} />

<section class="flex justify-center pt-10">
    <div class="w-full max-w-xl bg-gray-100 text-gray-900 rounded-md px-10 py-2">
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
                <div class="relative mt-1">
                    <textarea bind:value={data.article.title} rows=3 placeholder="Title"></textarea>
                    <svg class="top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <textarea bind:value={data.article.excerpt} rows=3 placeholder="Excerpt"></textarea>
                    <svg class="top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <input bind:value={data.article.cover_img} type="text" placeholder="Cover Image">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <textarea bind:value={data.article.cover_img_caption} rows=3 placeholder="Cover Image Caption"></textarea>
                    <svg class="top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <select bind:value={data.article.cover_img_style}>
                        <option value="full">Full</option>
                        <option value="normal">Normal</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <textarea bind:value={data.article.content} rows=20 placeholder="Content"></textarea>
                    <svg class="top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <select bind:value={draft}>
                        <option value="true">Draft</option>
                        <option value="false">Published</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <MultiSelect bind:this={authorSelect} selected={authorSelected} options={authorOptions} placeholder={"Authors"} />
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <MultiSelect bind:this={categorySelect} selected={categorySelected} options={categoryOptions} placeholder={"Categories"} />
                </div>
            </div>
            <div>
                <div class="relative mt-1">
                    <MultiSelect bind:this={tagSelect} selected={tagSelected} options={tagOptions} placeholder={"Tags"} />
                </div>
            </div>
            <Submit bind:this={submit} value="Update Article"/>
        </form>
        
        <form on:submit|preventDefault={handleDeleteSubmit} class="space-y-4">
            <Submit bind:this={deleteSubmit} value="Delete Article"/>
        </form>
    </div>
</section>