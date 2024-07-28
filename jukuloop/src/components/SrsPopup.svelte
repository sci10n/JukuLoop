<script lang="ts">
    import {fade, fly} from "svelte/transition";
    import {createEventDispatcher} from "svelte";
    import {stage_color, stage_name} from "../utils/srs";
    import type {Stage} from "../types/Srs";

    const dispatch = createEventDispatcher()
    export let stage: Stage

    const hidePopup = () => {
        dispatch('hide')
    }

    setTimeout(hidePopup, 2000)
</script>
<div class="popup" transition:fade>
    <p style="color: {stage_color(stage)}">
        {stage_name(stage)}
    </p>
</div>

<style>
    .popup {
        position: absolute;
        bottom: 50%; /* Position above the input field */
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