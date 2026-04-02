<script lang="ts">
let { label, title, value = $bindable() } = $props();
</script>
 
<label for={label}>{title}</label>
<hr>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"> <!--Font Awesome Pro v7.2.0 by @fontawesome Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>
<input type="date" id={label} name={label} bind:value={value} />
<style>
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5em;
    }
    input {
        padding: 0.5em;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: rgb(255, 252, 243);
    }
    svg {
        width: 1.5em;
        height: 1.5em;
        fill: #555;
        vertical-align: middle;
        margin-right: 0.5em;
    }
</style>