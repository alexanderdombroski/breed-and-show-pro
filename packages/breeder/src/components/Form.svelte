<script lang="ts">
import Card from "./Card.svelte";
let breedingDate = $state("");
let confirmBredDate = $state("");
let farrowingDate = $state("");
let sixMonthDate = $state("");

function addDaysToBreedingDate(breedingDate: string, days = 30): string {
    if (!breedingDate) return "";

    const [year, month, day] = breedingDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
}

$effect(() => {
    confirmBredDate = addDaysToBreedingDate(breedingDate, 30);
});

</script>

<section class="container">
    <Card bind:value={breedingDate} label="breeding-date" title="Breeding Date"/>
    <div>Value: {breedingDate}</div>
</section>

<section class="container">
    <Card bind:value={confirmBredDate} label="confirm-bred-date" title="Confirm Bred Date"/>
    <div>Value: {confirmBredDate}</div> 
</section>

<section class="container">
    <Card bind:value={farrowingDate} label="farrowing-due-date" title="Farrowing Due Date"/>
    <div>Value: {farrowingDate}</div>
</section>

<section class="container">
    <Card bind:value={sixMonthDate} label="six-months-old" title="6 Months Old"/>
    <div>Value: {sixMonthDate}</div>
</section>

<style>
    .container {
        background: rgb(248, 245, 228);
        border-radius: 8px;
        margin: 20px 10px;
        padding: 1em 0.75em;
        border-left: 8px solid #f9ee9b;
        min-width: 300px;
    }
</style>