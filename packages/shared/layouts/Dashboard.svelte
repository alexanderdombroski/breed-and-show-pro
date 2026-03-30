
<script lang="ts">
    // let { widgets } = $props();
    import TasksWidget from "../../breeder/src/components/TasksWidget.svelte";
</script>

<section>
<!-- {#each widgets as widget}
    <a href="/">
        <div class="container">
            <p>Widget {widget}</p>
            {widget}
        </div>
    </a>
{/each} -->
<div class="container">
    <TasksWidget />
</div>

<div class="container">
    <TasksWidget />
</div>

<div class="container">
    <TasksWidget />
</div>

<div class="container">
    <TasksWidget />
</div>
</section>


<style>
    section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        align-content: center;
        row-gap: 10px;
    }
    /* a {
        text-decoration: none;
        color: inherit;
        &:hover{
            color: orange;
        }
    } */
    .container {
        /* border: 1px solid orange;
        padding: 50px 100px;
        margin: 20px 0; */
        width: 300px;
        height: 400px;
    }

</style>