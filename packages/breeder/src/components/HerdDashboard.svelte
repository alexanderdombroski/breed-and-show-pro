<script lang="ts">
  import { onMount } from "svelte";

  const API_BASE = import.meta.env.PUBLIC_SERVER_URL;

  type Pig = {
    _id: string;
    name: string;
    earNotch: string;
    breed: string;
    sex: string;
    status: string;
    isArchived?: boolean;
    birthDate?: string;
  };

  type Litter = {
    _id: string;
    farrowDate?: string;
    weanedDate?: string;
  };

  let pigs: Pig[] = [];
  let litters: Litter[] = [];
  let loading = true;
  let error = "";

  async function loadData() {
    loading = true;
    error = "";

    try {
      const [pigsResp, littersResp] = await Promise.all([
        fetch(`${API_BASE}/api/pigs`),
        fetch(`${API_BASE}/api/litters`),
      ]);

      if (pigsResp.status === 429)
        throw new Error("Too many pig requests; wait a minute and retry.");
      if (littersResp.status === 429)
        throw new Error("Too many litter requests; wait a minute and retry.");
      if (!pigsResp.ok)
        throw new Error(`Failed to load pigs: ${pigsResp.statusText}`);
      if (!littersResp.ok)
        throw new Error(`Failed to load litters: ${littersResp.statusText}`);

      pigs = await pigsResp.json();
      litters = await littersResp.json();
    } catch (err) {
      console.error(err);
      error = err instanceof Error ? err.message : "Unknown error";
      pigs = [];
      litters = [];
    } finally {
      loading = false;
    }
  }

  onMount(loadData);

  function countByStatus(status: string) {
    return pigs.filter((pig) => pig.status === status).length;
  }

  function countSires() {
    return pigs.filter((pig) => pig.status === "active" && pig.sex === "boar")
      .length;
  }

  function countArchived() {
    return pigs.filter((pig) => pig.isArchived === true).length;
  }

  function countPastLitters() {
    const today = new Date();
    return litters.filter((litter) => {
      if (litter.weanedDate) return true;
      if (litter.farrowDate) {
        const farrowDate = new Date(litter.farrowDate);
        farrowDate.setDate(farrowDate.getDate() + 30);
        return farrowDate <= today;
      }
      return false;
    }).length;
  }

  function refresh() {
    loadData();
  }
</script>

<section class="herd-dashboard">
  <div class="dashboard-header">
    <h3>Herd Summary</h3>
    <button class="refresh-btn" on:click={refresh} disabled={loading}
      >Refresh</button
    >
  </div>

  {#if loading}
    <p>Loading herd counts...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <div class="herd-grid">
      <div class="tile">Open: {countByStatus("open")}</div>
      <div class="tile">Bred: {countByStatus("bred")}</div>
      <div class="tile">Farrowed: {countByStatus("farrowed")}</div>
      <div class="tile">Sires: {countSires()}</div>
      <div class="tile">Past Litters: {countPastLitters()}</div>
      <div class="tile">Archived: {countArchived()}</div>
    </div>
  {/if}
</section>

<style>
  .herd-dashboard {
    width: 90%;
    max-width: 960px;
    margin: 0 auto;
  }
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .refresh-btn {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    background: #f2af29ff;
    cursor: pointer;
  }
  .herd-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    gap: 0.8rem;
  }
  .tile {
    padding: 0.9rem;
    border: 1px solid #e0e0e0;
    border-left: 4px solid #f2af29ff;
    border-radius: 4px;
    font-weight: 700;
  }
  .error {
    color: #d32f2f;
  }
</style>
