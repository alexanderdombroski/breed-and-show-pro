<script lang="ts">
  import { onMount } from "svelte";
  import "../styles/breeder-pages.css";

  const baseUrl = import.meta.env.BASE_URL;
  const API_BASE = import.meta.env.PUBLIC_SERVER_URL;

  let pigs: any[] = [];

  let openCount = 0;
  let bredCount = 0;
  let farrowedCount = 0;
  let siresCount = 0;
  let archivedCount = 0;

  $: openCount = pigs.filter(
    (pig: any) => pig.status === "open" && pig.sex === "sow",
  ).length;
  $: bredCount = pigs.filter(
    (pig: any) => pig.status === "bred" && pig.sex === "sow",
  ).length;
  $: farrowedCount = pigs.filter(
    (pig: any) => pig.status === "farrowed" && pig.sex === "sow",
  ).length;
  $: siresCount = pigs.filter(
    (pig: any) => pig.status === "active" && pig.sex === "boar",
  ).length;
  $: archivedCount = pigs.filter((pig: any) => pig.isArchived === true).length;

  onMount(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/pigs`, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        pigs = await res.json();
      } else {
        console.error(
          "Failed to fetch pigs for HerdWidget:",
          res.status,
          res.statusText,
        );
      }
    } catch (error) {
      console.error("HerdWidget API fetch error:", error);
    }
  });
</script>

<section class="widget-container">
  <div class="title">
    <a href={`${baseUrl}/herd/`} class="widget-link">
      <h3>Herd</h3>
    </a>
  </div>

  <div class="herd-container">
    <a href={`${baseUrl}/herd/open`} class="herd-button">
      <span>({openCount}) Open</span>
      <img
        src={`${baseUrl}/right-arrow.png`}
        alt="right-arrow"
        class="right-arrow"
      />
    </a>
    <a href={`${baseUrl}/herd/bred`} class="herd-button">
      <span>({bredCount}) Bred</span>
      <img
        src={`${baseUrl}/right-arrow.png`}
        alt="right-arrow"
        class="right-arrow"
      />
    </a>
    <a href={`${baseUrl}/herd/farrowed`} class="herd-button">
      <span>({farrowedCount}) Farrow</span>
      <img
        src={`${baseUrl}/right-arrow.png`}
        alt="right-arrow"
        class="right-arrow"
      />
    </a>
    <a href={`${baseUrl}/herd/sires`} class="herd-button">
      <span>({siresCount}) Sires</span>
      <img
        src={`${baseUrl}/right-arrow.png`}
        alt="right-arrow"
        class="right-arrow"
      />
    </a>
    <a href={`${baseUrl}/herd/pastLitters`} class="herd-button">
      <span>Past Litters</span>
      <img
        src={`${baseUrl}/right-arrow.png`}
        alt="right-arrow"
        class="right-arrow"
      />
    </a>
    <a href={`${baseUrl}/herd/archived`} class="herd-button">
      <span>({archivedCount}) Archived</span>
      <img
        src={`${baseUrl}/right-arrow.png`}
        alt="right-arrow"
        class="right-arrow"
      />
    </a>
  </div>
</section>

<style>
  .herd-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 10px;
  }

  .herd-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    font-size: var(--step-0);
    color: #333;
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-left: 3px solid #f2af29ff;
    padding: 16px 20px;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .herd-button:hover {
    background-color: #fff3e0;
    box-shadow: 0 2px 6px rgba(255, 165, 0, 0.2);
  }

  .right-arrow {
    width: 16px;
    height: 16px;
    margin-left: 10px;
  }
</style>
