<script lang="ts">
  import Card from "./Card.svelte";
  let breedingDate = $state("");
  let confirmBredDate = $state("");
  let farrowingDate = $state("");
  let sixMonthDate = $state("");

  function addDays(valueDate: string, days: number): string {
    if (!valueDate) return "";

    const [year, month, day] = valueDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function formatDisplayDate(valueDate: string): string {
    if (!valueDate) return "";
    const [year, month, day] = valueDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  $effect(() => {
    if (!breedingDate) {
      confirmBredDate = "";
      farrowingDate = "";
      sixMonthDate = "";
      return;
    }
    confirmBredDate = addDays(breedingDate, 30);
    farrowingDate = addDays(breedingDate, 144);
    sixMonthDate = addDays(breedingDate, 327);
  });

  $effect(() => {
    if (!farrowingDate) {
      breedingDate = "";
      confirmBredDate = "";
      sixMonthDate = "";
      return;
    }
    breedingDate = addDays(farrowingDate, -144);
    confirmBredDate = addDays(breedingDate, 30);
    sixMonthDate = addDays(breedingDate, 327);
  });

  $effect(() => {
    if (!sixMonthDate) {
      breedingDate = "";
      farrowingDate = "";
      return;
    }
    breedingDate = addDays(sixMonthDate, -327);
    confirmBredDate = addDays(breedingDate, 30);
    farrowingDate = addDays(breedingDate, 144);
  });

  $effect(() => {
    if (!confirmBredDate) {
      breedingDate = "";
      farrowingDate = "";
      sixMonthDate = "";
      return;
    }
    breedingDate = addDays(confirmBredDate, -30);
    farrowingDate = addDays(breedingDate, 144);
    sixMonthDate = addDays(breedingDate, 327);
  });
</script>

<section>
  <div class="container">
    <Card
      bind:value={breedingDate}
      label="breeding-date"
      title="Breeding Date"
    />
    <div class="dateDisplay">{formatDisplayDate(breedingDate)}</div>
  </div>

  <div class="container">
    <Card
      bind:value={confirmBredDate}
      label="confirm-bred-date"
      title="Confirm Bred Date"
    />
    <div class="dateDisplay">{formatDisplayDate(confirmBredDate)}</div>
  </div>

  <div class="container">
    <Card
      bind:value={farrowingDate}
      label="farrowing-due-date"
      title="Farrowing Due Date"
    />
    <div class="dateDisplay">{formatDisplayDate(farrowingDate)}</div>
  </div>

  <div class="container">
    <Card
      bind:value={sixMonthDate}
      label="six-months-old"
      title="6 Months Old"
    />
    <div class="dateDisplay">{formatDisplayDate(sixMonthDate)}</div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .container {
    background: rgb(248, 245, 228);
    border-radius: 8px;
    margin: 20px 10px;
    padding: 1em 0.75em;
    border-left: 8px solid #f9ee9b;
    min-width: 300px;
  }
  .dateDisplay {
    margin-top: 0.5em;
    font-size: var(--step-1);
    color: #555;
  }
</style>
