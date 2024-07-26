<script lang="ts">

    export let reading: string
    export let furigana: string | null = null

</script>

<style>
    ruby {
        color: var(--reading-color, black);
        font-size: 1.5em;
    }
</style>

<ruby>
    {reading}
    {#if furigana}
        <rt>{furigana}</rt>
    {/if}
</ruby>