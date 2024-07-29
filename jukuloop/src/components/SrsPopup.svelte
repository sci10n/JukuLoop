<script lang="ts">
    import {fade, fly} from "svelte/transition";
    import {createEventDispatcher} from "svelte";
    import {stage_color, stage_name} from "../utils/srs";
    import type {Stage} from "../types/Srs";

    const dispatch = createEventDispatcher()
    export let stage: Stage
    export let animateUp: boolean = false

    const hidePopup = () => {
        dispatch('hide')
    }

    setTimeout(hidePopup, 1000)
</script>
<div class="popup" transition:fly={animateUp ? { y: 50} : { y: -50}}>
    <p style="color: {stage_color(stage)}">
        {stage_name(stage)}
    </p>
</div>

<style>
    .popup {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        border-radius: 5px;
        padding-left: 1em;
        padding-right: 1em;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 1000; /* Ensure it hovers above other elements */
    }
</style>