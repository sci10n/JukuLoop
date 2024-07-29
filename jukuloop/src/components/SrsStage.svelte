<script lang="ts">

    import {type SRS, Stage} from "../types/Srs";
    import {stage_color, stage_name} from "../utils/srs";

    export let stage: Stage
    export let srs: SRS | null
</script>
<style>
</style>

<p style="color: {stage_color(stage)}"> {stage_name(stage)} </p>
