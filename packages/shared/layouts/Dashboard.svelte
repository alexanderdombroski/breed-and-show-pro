
<script lang="ts">
    import TasksWidget from "../../breeder/src/components/TasksWidget.svelte";
    import HerdWidget from "../../breeder/src/components/HerdWidget.svelte";
    import UpcomingDatesWidget from "../../breeder/src/components/UpcomingDatesWidget.svelte";
</script>

<section>
    <div class="container">
        <TasksWidget />
    </div>

    <div class="container">
        <HerdWidget />
    </div>

    <div class="container">
        <UpcomingDatesWidget />
    </div>

    <div class="container">
        <TasksWidget />
    </div>
</section>

<style>
    section {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 30px 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

</style>