<script lang="ts">
  export let heatDates: string[] = [];

  let newDate: string = "";

  function addDate(): void {
    if (newDate) {
      heatDates = [...heatDates, newDate];
      newDate = "";
      // saved to local array
    }
  }

  $: lastHeat = heatDates.length > 0 ? heatDates[heatDates.length - 1] : null;

  $: nextHeat = lastHeat
    ? new Date(
        new Date(lastHeat).setDate(new Date(lastHeat).getDate() + 21),
      ).toLocaleDateString()
    : "N/A";
</script>

<div class="heat-dates-widget">
  {#if heatDates.length > 0}
    <div class="heat-list">
      <h4>Heat Dates</h4>
      <ul>
        {#each heatDates as date}
          <li>{new Date(date).toLocaleDateString()}</li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="add-heat">
    <label for="new-heat-date">Add Heat Date:</label>
    <input type="date" id="new-heat-date" bind:value={newDate} />
    <button on:click={addDate} disabled={!newDate}>Add</button>
  </div>

  <div class="next-heat">
    <p><strong>Next Expected Heat:</strong> {nextHeat}</p>
  </div>
</div>

<style>
  .heat-dates-widget {
    margin-top: 10px;
  }

  .heat-list h4 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: var(--step-0);
  }

  .heat-list ul {
    margin: 0 0 15px 0;
    padding-left: 20px;
  }

  .heat-list li {
    margin: 3px 0;
  }

  .add-heat {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .add-heat label {
    font-weight: 600;
    color: #333;
  }

  .add-heat input {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .add-heat button {
    padding: 5px 10px;
    background-color: #f2af29ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .add-heat button:hover:not(:disabled) {
    background-color: #e0a028;
  }

  .add-heat button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .next-heat p {
    margin: 0;
    font-size: var(--step--1);
  }
</style>
