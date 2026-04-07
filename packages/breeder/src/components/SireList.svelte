<script lang="ts">
  import { onMount } from "svelte";

  function getApiBase() {
    const raw =
      import.meta.env.PUBLIC_API_URL ??
      import.meta.env.PUBLIC_SERVER_URL ??
      "http://localhost:3000";
    const clean = raw.replace(/\/+$/, "");
    return clean.replace(/\/api$/i, "");
  }

  function getBaseUrl() {
    return import.meta.env.BASE_URL || "/breed-and-show-pro/breeder";
  }

  const API_BASE = getApiBase();
  const BASE_URL = getBaseUrl();

  type Pig = {
    _id: string;
    name: string;
    earNotch: string;
    status: string;
    sex: string;
  };

  let activeSires: Pig[] = [];
  let loading = true;
  let error = "";

  async function loadSires() {
    loading = true;
    error = "";
    try {
      const res = await fetch(`${API_BASE}/api/pigs`);
      if (res.status === 429)
        throw new Error("Too many pig requests; please wait a minute.");
      if (!res.ok) throw new Error(`Failed to load pigs: ${res.statusText}`);
      const pigs = await res.json();
      activeSires = pigs.filter(
        (pig: Pig) => pig.status === "active" && pig.sex === "boar",
      );
    } catch (err) {
      console.error(err);
      error = err instanceof Error ? err.message : "Unknown error";
      activeSires = [];
    } finally {
      loading = false;
    }
  }

  onMount(loadSires);
</script>

{#if loading}
  <p>Loading sires...</p>
{:else if error}
  <p class="error">{error}</p>
{:else if activeSires.length === 0}
  <p class="message">No active sires at this time.</p>
{:else}
  <div class="animals-list">
    {#each activeSires as sire}
      <a href={`${BASE_URL}/herd/sire/${sire._id}`} class="animal-card">
        <div class="animal-info">
          <h2>{sire.name}: {sire.earNotch}</h2>
        </div>
        <img
          class="right-arrow"
          src={`${BASE_URL}/right-arrow.png`}
          alt="Right Arrow"
        />
      </a>
    {/each}
  </div>
{/if}

<style>
  .error {
    color: #d32f2f;
  }
  .message {
    color: #666;
  }
  .animals-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px auto;
    width: 90%;
  }
  .animal-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: #333;
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-left: 3px solid #f2af29ff;
    padding: 10px 12px;
    border-radius: 4px;
    transition: all 0.2s;
  }
  .animal-card:hover {
    background-color: #fff3e0;
    box-shadow: 0 2px 6px rgba(255, 165, 0, 0.2);
  }
  .animal-info h2 {
    margin: 0;
    font-size: var(--step-1);
    font-weight: 600;
  }
</style>
