
<script lang="ts">
    let { widgets } = $props();
</script>

<section>
{#each widgets as widget}
    <a href="/">
        <div class="container">
            <p>Widget {widget}</p>
        </div>
    </a>
{/each}
</section>

<style>
    section {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        align-content: center;
        row-gap: 10px;
    }
    a {
        text-decoration: none;
        color: inherit;
        &:hover{
            color: orange;
        }
    }
    .container {
        border: 1px solid orange;
        padding: 50px 100px;
        margin: 20px 0;
    }

</style>