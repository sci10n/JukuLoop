<script lang="ts">

    import Reading from "./Reading.svelte";

    export let readings: string[] = []
    export let furigana: string[] = []
    export let colors: string[] = []
</script>

<div>
    {#each readings as reading, i}
        <Reading reading={reading} furigana={furigana[i]} --reading-color="{colors[i]}"/>
    {/each}
</div>