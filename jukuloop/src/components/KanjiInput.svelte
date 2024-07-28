<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import * as wanakana from "wanakana";

    export let type: "input" | "textarea" = "input"

    export let value = ""
    let _value: string = value

    let ref: HTMLTextAreaElement | HTMLInputElement

    $: v = _value && dispatch("input", _value)

    const dispatch = createEventDispatcher()

    const sendValue = (value) => {
        dispatch("input",wanakana.toKana(value, {IMEMode: true}))
    }
    onMount(() => {
        wanakana.bind(ref)
    })
</script>
<style>
    input {
        width: 60%;
        border-style: solid;
        border-radius: 5em;
        border-color: var(--border-color, black);
        background: var(--background-color, white);
        color: var(--font-color, black);
        font-size: 1.5em;
        margin-bottom: 1em;
    }
    textarea {
        border-style: solid;
        border-color: var(--border-color, black);
        background: var(--background-color, white);
        color: var(--font-color, black);
        height: 50px;
        resize: none;
        width: 100%;
    }
</style>
{#if type === "input"}
    <input value={_value} bind:this={ref} on:input={ it => sendValue(it.target.value)}/>
{/if}
{#if type === "textarea"}
    <textarea bind:value={_value} bind:this={ref}/>
{/if}