<script lang="ts">
  import { onMount } from "svelte";

  export let id: string;
  export let expectedSex: "sow" | "boar" | undefined;

  function getApiBase() {
    const raw = import.meta.env.PUBLIC_API_URL ?? import.meta.env.PUBLIC_SERVER_URL ?? "http://localhost:3000";
    const clean = raw.replace(/\/+$/, "");
    return clean.replace(/\/api$/i, "");
  }

  function getBaseUrl() {
    return import.meta.env.BASE_URL || "/breed-and-show-pro/breeder";
  }

  const API_BASE = getApiBase();
  const BASE_URL = getBaseUrl();

  let pig: any = null;
  let loading = true;
  let error = "";
  let sireName: string = "Unknown";

  function formatDate(dateString: string): string {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US");
  }

  function formatHeatDates(heatDates: string[] | undefined): string {
    if (!heatDates || heatDates.length === 0) return "None recorded";
    return heatDates.map(d => formatDate(d)).join(", ");
  }

  async function fetchSireName(sireId: number | undefined) {
    if (!sireId) return;
    try {
      const res = await fetch(`${API_BASE}/api/pigs/${sireId}`);
      if (res.ok) {
        const sire = await res.json();
        sireName = sire.name || "Unknown";
      }
    } catch (err) {
      console.error("Failed to fetch sire name:", err);
    }
  }

  onMount(async () => {
    loading = true;
    error = "";
    pig = null;
    sireName = "Unknown";

    try {
      const res = await fetch(`${API_BASE}/api/pigs/${id}`);
      if (res.status === 429) {
        error = "Too many pig requests; wait a minute before trying again.";
        return;
      }
      if (!res.ok) {
        if (res.status === 404) {
          error = "Pig not found";
          return;
        }
        throw new Error(`Failed to load pig: ${res.statusText}`);
      }
      pig = await res.json();
      if (expectedSex && pig.sex !== expectedSex) {
        error = `This pig is not a ${expectedSex}.`;
      }
      // Fetch sire name if pig has a sireId
      if (pig.sireId) {
        await fetchSireName(pig.sireId);
      }
    } catch (err) {
      console.error(err);
      error = err instanceof Error ? err.message : "Error loading pig";
    } finally {
      loading = false;
    }
  });

  async function deletePig() {
    if (!confirm("Are you sure you want to delete this pig?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/pigs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete pig: ${res.statusText}`);
      // On success, navigate back
      window.location.href = `${BASE_URL}/herd/`;
    } catch (err) {
      console.error(err);
      error = err instanceof Error ? err.message : "Error deleting pig";
    }
  }
</script>

{#if loading}
  <p>Loading pig data...</p>
{:else if error}
  <p class="message">{error}</p>
{:else if !pig}
  <p class="message">No pig data found.</p>
{:else}
  <div class="animal-detail">
    <div class="animal-info">
      <h1>{pig.name}</h1>

      <div class="info-section">
        <h3>Basic Information</h3>
        <p><strong>Ear Notch:</strong> {pig.earNotch}</p>
        <p><strong>Breed:</strong> {pig.breed}</p>
        <p><strong>Date of Birth:</strong> {formatDate(pig.birthDate)}</p>
        <p><strong>Sex:</strong> {pig.sex}</p>
        <p><strong>Status:</strong> {pig.status}</p>
      </div>

      {#if pig.status === "open" && pig.sex === "sow"}
        <div class="info-section">
          <h3>Heat Information</h3>
          <p><strong>Next Heat Date:</strong> {formatDate(pig.nextHeatDate)}</p>
          {#if pig.heatDates}
            <p><strong>Recent Heat Dates:</strong> {formatHeatDates(pig.heatDates)}</p>
          {/if}
        </div>
      {/if}

      {#if pig.status === "bred" && pig.sex === "sow"}
        <div class="info-section">
          <h3>Breeding Information</h3>
          <p><strong>Breeding Date:</strong> {formatDate(pig.breedingDate)}</p>
          <p><strong>Expected Farrow Date:</strong> {formatDate(pig.expectedFarrowDate)}</p>
          {#if pig.sireId}
            <p><strong>Sire:</strong> {sireName}</p>
          {/if}
        </div>
      {/if}

      {#if pig.status === "farrowed" && pig.sex === "sow"}
        <div class="info-section">
          <h3>Farrowing Information</h3>
          <p><strong>Last Farrow Date:</strong> {formatDate(pig.lastFarrowDate)}</p>
          {#if pig.litterNumber}
            <p><strong>Last Litter Number:</strong> {pig.litterNumber}</p>
          {/if}
          {#if pig.sireId}
            <p><strong>Last Sire:</strong> {sireName}</p>
          {/if}
          {#if pig.nextHeatDate}
            <p><strong>Next Heat Date:</strong> {formatDate(pig.nextHeatDate)}</p>
          {/if}
        </div>
      {/if}

      {#if pig.notes}
        <div class="info-section">
          <h3>Notes</h3>
          <p>{pig.notes}</p>
        </div>
      {/if}

      <div class="actions">
        <button class="delete-btn" on:click={deletePig}>Delete Pig</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .message { color: #666; }
  .animal-detail { max-width: 800px; margin: 20px auto; width: 90%; }
  .animal-info h1 { margin: 0 0 20px; }
  .info-section { margin-bottom: 15px; padding: 15px 20px; background: white; border: 1px solid #e0e0e0; border-left: 4px solid #f2af29ff; border-radius: 8px; }
  .info-section h3 { margin: 0 0 10px; color: #f2af29ff; }
  .actions { margin-top: 20px; }
  .delete-btn { background: #d32f2f; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
  .delete-btn:hover { background: #b71c1c; }
</style>