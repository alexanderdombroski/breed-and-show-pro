<script lang="ts">
  import { onMount } from "svelte";

  export let id: string;
  export let expectedSex: "sow" | "boar" | undefined;

  function getApiBase() {
    const raw = import.meta.env.PUBLIC_API_URL ?? import.meta.env.PUBLIC_SERVER_URL ?? "http://localhost:3000";
    const clean = raw.replace(/\/+$/, "");
    return clean.replace(/\/api$/i, "");
  }

  const API_BASE = getApiBase();

  let pig: any = null;
  let loading = true;
  let error = "";

  onMount(async () => {
    loading = true;
    error = "";
    pig = null;

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
      window.location.href = "/herd/";
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
        <p><strong>Date of Birth:</strong> {new Date(pig.birthDate).toLocaleDateString()}</p>
        <p><strong>Sex:</strong> {pig.sex}</p>
        <p><strong>Status:</strong> {pig.status}</p>
      </div>

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
  .info-section { margin-bottom: 15px; padding: 15px 20px; border: 1px solid #e0e0e0; border-left: 4px solid #f2af29ff; border-radius: 8px; }
  .info-section h3 { margin: 0 0 10px; color: #f2af29ff; }
  .actions { margin-top: 20px; }
  .delete-btn { background: #d32f2f; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
  .delete-btn:hover { background: #b71c1c; }
</style>