<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import * as wanakana from "wanakana";

    const dispatch = createEventDispatcher()

    export let value: string

    $: if(value) {
        dispatch('input', value)
    }
    let ref: HTMLTextAreaElement | HTMLInputElement

    $: if (ref) {
        ref && wanakana.bind(ref)
        ref.addEventListener('input', (event) => {
            value = (event.target as HTMLInputElement).value
        })
    }

    onMount(() => {
        wanakana.bind(ref)
        ref.addEventListener('input', (event) => {
            value = (event.target as HTMLInputElement).value
        })

        ref.value = value
    })
</script>
<style>
    input {
        width: 100%;
    }
</style>
<input value={value} bind:this={ref}/>

