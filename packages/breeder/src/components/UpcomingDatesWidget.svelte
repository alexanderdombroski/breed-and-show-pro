<script lang="ts">
  import "../styles/breeder-pages.css";
  import { onMount } from "svelte";

  const BREEDER_BASE_URL =
    import.meta.env.BASE_URL || "/breed-and-show-pro/breeder";
  const API_BASE = import.meta.env.PUBLIC_SERVER_URL;

  interface UpcomingDate {
    date: string;
    type:
      | "heat"
      | "farrowing"
      | "task"
      | "confirm"
      | "breed"
      | "weaning"
      | "vaccination";
    title: string;
    description?: string;
  }

  // State for upcoming dates
  let upcomingDates = $state<UpcomingDate[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);

  // Fetch upcoming dates from API
  async function fetchUpcomingDates() {
    try {
      isLoading = true;
      error = null;

      const response = await fetch(`${API_BASE}/api/upcoming-dates`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch upcoming dates: ${response.statusText}`,
        );
      }

      const apiDates = await response.json();

      console.info("📅 Widget received upcoming dates:", apiDates);

      // Use API dates directly (already sorted by backend)
      upcomingDates = apiDates.map((item: any) => ({
        date: item.date,
        type: item.type,
        title: item.title,
        description: item.description,
      }));
    } catch (err) {
      console.error("Error fetching upcoming dates:", err);
      error =
        err instanceof Error ? err.message : "Failed to load upcoming dates";
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchUpcomingDates();
  });

  type FilterType = "all" | "heat" | "farrowing" | "task" | "confirm";
  let selectedFilter = $state<FilterType>("all");

  // Filter dates based on selected type
  const filteredDates = $derived(() => {
    if (selectedFilter === "all") return upcomingDates;
    return upcomingDates.filter((date) => date.type === selectedFilter);
  });

  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  // Get days until date
  function getDaysUntil(dateString: string): number {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Get type badge color
  function getTypeBadgeClass(type: string): string {
    switch (type) {
      case "heat":
        return "badge-heat";
      case "farrowing":
        return "badge-farrowing";
      case "task":
        return "badge-task";
      case "confirm":
        return "badge-confirm";
      case "breed":
        return "badge-breed";
      case "weaning":
        return "badge-weaning";
      case "vaccination":
        return "badge-vaccination";
      default:
        return "";
    }
  }

  // Get type display label
  function getTypeLabel(type: string): string {
    switch (type) {
      case "heat":
        return "HEAT";
      case "farrowing":
        return "FARROW";
      case "task":
        return "TASK";
      case "confirm":
        return "CONFIRM";
      case "breed":
        return "BREED";
      case "weaning":
        return "WEAN";
      case "vaccination":
        return "VAX";
      default:
        return type.toUpperCase();
    }
  }
</script>

<section class="widget-container">
  <div class="title">
    <a href={`${BREEDER_BASE_URL}/upcomingDates/`} class="widget-link">
      <h3>Upcoming Dates</h3>
    </a>
  </div>

  <div class="filter-buttons">
    <button
      class:active={selectedFilter === "all"}
      onclick={() => (selectedFilter = "all")}
    >
      All
    </button>
    <button
      class:active={selectedFilter === "heat"}
      onclick={() => (selectedFilter = "heat")}
    >
      Heat
    </button>
    <button
      class:active={selectedFilter === "farrowing"}
      onclick={() => (selectedFilter = "farrowing")}
    >
      Farrow
    </button>
    <button
      class:active={selectedFilter === "confirm"}
      onclick={() => (selectedFilter = "confirm")}
    >
      Confirm
    </button>
    <button
      class:active={selectedFilter === "task"}
      onclick={() => (selectedFilter = "task")}
    >
      Tasks
    </button>
  </div>

  {#if isLoading}
    <p class="no-message">Loading upcoming dates...</p>
  {:else if error}
    <p class="error-message">{error}</p>
  {:else if filteredDates().length === 0}
    <p class="no-message">No upcoming dates found.</p>
  {:else}
    <div class="dates-list">
      {#each filteredDates() as upcomingDate}
        <div class="date-card">
          <div class="date-header">
            <span class={`type-badge ${getTypeBadgeClass(upcomingDate.type)}`}>
              {getTypeLabel(upcomingDate.type)}
            </span>
            <span class="days-until">
              {getDaysUntil(upcomingDate.date) === 0
                ? "Today"
                : getDaysUntil(upcomingDate.date) === 1
                  ? "Tomorrow"
                  : `${getDaysUntil(upcomingDate.date)}d`}
            </span>
          </div>
          <h4>{upcomingDate.title}</h4>
          <p class="date-display">{formatDate(upcomingDate.date)}</p>
          {#if upcomingDate.description}
            <p class="description">{upcomingDate.description}</p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  .filter-buttons {
    display: flex;
    gap: 5px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  .filter-buttons button {
    padding: 6px 12px;
    border: 1px solid #e0e0e0;
    background-color: white;
    color: #333;
    font-size: var(--step--1);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    flex: 1;
    min-width: 60px;
  }

  .filter-buttons button:hover {
    background-color: #fff3e0;
    border-color: #f2af29ff;
  }

  .filter-buttons button.active {
    background-color: #f2af29ff;
    border-color: #f2af29ff;
    color: white;
    font-weight: bold;
  }

  .dates-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .date-card {
    border: 1px solid #e0e0e0;
    border-left: 3px solid #f2af29ff;
    padding: 10px;
    border-radius: 4px;
    background-color: #fafafa;
    transition: all 0.2s;
    cursor: pointer;
  }

  .date-card:hover {
    background-color: #fff3e0;
    box-shadow: 0 2px 6px rgba(255, 165, 0, 0.2);
  }

  .date-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .type-badge {
    font-size: var(--step--2);
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .badge-heat {
    background-color: #ffebee;
    color: #c62828;
  }

  .badge-farrowing {
    background-color: #e8f5e9;
    color: #2e7d32;
  }

  .badge-confirm {
    background-color: #e3f2fd;
    color: #1565c0;
  }

  .badge-task {
    background-color: #fff3e0;
    color: #ef6c00;
  }

  .badge-breed {
    background-color: #f3e5f5;
    color: #7b1fa2;
  }

  .badge-weaning {
    background-color: #e0f2f1;
    color: #00695c;
  }

  .badge-vaccination {
    background-color: #e1f5fe;
    color: #0277bd;
  }

  .days-until {
    font-size: var(--step--2);
    font-weight: bold;
    color: #666;
  }

  .date-card h4 {
    margin: 0 0 4px 0;
    font-size: var(--step-0);
    color: #333;
    line-height: 1.2;
  }

  .date-display {
    margin: 0 0 6px 0;
    font-size: var(--step--1);
    font-weight: 600;
    color: #f2af29ff;
  }

  .description {
    margin: 0;
    font-size: var(--step--2);
    color: #666;
    line-height: 1.3;
  }

  .error-message {
    color: #d32f2f;
    font-size: 0.9rem;
    padding: 10px;
    background-color: #ffebee;
    border-radius: 4px;
    text-align: center;
  }
</style>
