<script lang="ts">

    import {type SRS, Stage} from "../types/Srs";
    import {stage_color, stage_name} from "../utils/srs";

    export let stage: Stage
    export let srs: SRS | null

    $: timeUntilNextReview = srs ? Math.round((new Date(srs.nextReview) - Date.now()) / 1000 / 60) : null
    $: reviewText = timeUntilNextReview !== null ? timeUntilNextReview > 0 ? `${timeUntilNextReview} minutes` : "Now" : null
</script>
<style>
</style>

<p style="color: {stage_color(stage)}"> {stage_name(stage)} {#if timeUntilNextReview} - {reviewText} {/if}</p>
