
<script lang="ts">
    import TasksWidget from "../../breeder/src/components/TasksWidget.svelte";
</script>

<section>
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
    .container {
        width: 300px;
        height: 400px;
    }

</style>