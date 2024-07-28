<script lang="ts">

    import Reading from "./Reading.svelte";

    export let readings: string[] = []
    export let furigana: string[] = []
    export let colors: string[] = []
    export let readingFontSize: string = "1.5em"
</script>

<div>
    {#each readings as reading, i}
        <Reading reading={reading}
                 furigana={furigana[i]}
                 --reading-color="{colors[i]}"
                 --reading-font-size="{readingFontSize}"
        />
    {/each}
</div>