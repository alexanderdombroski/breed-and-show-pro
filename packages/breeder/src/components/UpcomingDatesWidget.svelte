<script lang="ts">
  import { BreederMockData } from "../BreederMockData.js";
  import "../styles/breeder-pages.css";

  const BREEDER_BASE_URL = import.meta.env.BASE_URL || "/breed-and-show-pro/breeder";

  interface UpcomingDate {
    date: string;
    type: "heat" | "farrowing" | "task" | "confirm";
    title: string;
    description?: string;
    animalName?: string;
  }

  // Helper to check if date is in the future
  const isFutureDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  // Collect all upcoming dates
  const upcomingDates: UpcomingDate[] = [];

  // Add heat dates from animals
  BreederMockData.animals.forEach(animal => {
    if (animal.nextHeatDate && isFutureDate(animal.nextHeatDate)) {
      upcomingDates.push({
        date: animal.nextHeatDate,
        type: "heat",
        title: `${animal.name} - Heat Expected`,
        animalName: animal.name,
        description: `${animal.breed} sow (${animal.earNotch})`
      });
    }
  });

  // Add farrowing dates from animals
  BreederMockData.animals.forEach(animal => {
    if (animal.expectedFarrowDate && isFutureDate(animal.expectedFarrowDate)) {
      upcomingDates.push({
        date: animal.expectedFarrowDate,
        type: "farrowing",
        title: `${animal.name} - Expected Farrowing`,
        animalName: animal.name,
        description: `${animal.breed} sow (${animal.earNotch})`
      });
    }
  });

  // Add confirmation dates (21 days after breeding)
  BreederMockData.animals.forEach(animal => {
    if (animal.status === "bred" && animal.breedingDate) {
      const breedingDate = new Date(animal.breedingDate);
      const confirmDate = new Date(breedingDate);
      confirmDate.setDate(confirmDate.getDate() + 21);
      const confirmDateString = confirmDate.toISOString().split("T")[0];
      
      if (isFutureDate(confirmDateString)) {
        upcomingDates.push({
          date: confirmDateString,
          type: "confirm",
          title: `${animal.name} - Confirm Breeding`,
          animalName: animal.name,
          description: `Check if breeding was successful (${animal.breed} ${animal.earNotch})`
        });
      }
    }
  });

  // Add task due dates
  BreederMockData.tasks.forEach(task => {
    if (task.dueDate && !task.completed && isFutureDate(task.dueDate)) {
      upcomingDates.push({
        date: task.dueDate,
        type: "task",
        title: task.title,
        description: task.description
      });
    }
  });

  // Sort by date (earliest first)
  upcomingDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  type FilterType = "all" | "heat" | "farrowing" | "task" | "confirm";
  let selectedFilter = $state<FilterType>("all");
  
  // Filter dates based on selected type
  const filteredDates = $derived(() => {
    if (selectedFilter === "all") return upcomingDates;
    return upcomingDates.filter(date => date.type === selectedFilter);
  });
  
  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
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
    switch(type) {
      case "heat": return "badge-heat";
      case "farrowing": return "badge-farrowing";
      case "task": return "badge-task";
      case "confirm": return "badge-confirm";
      default: return "";
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
      onclick={() => selectedFilter = "all"}
    >
      All
    </button>
    <button 
      class:active={selectedFilter === "heat"} 
      onclick={() => selectedFilter = "heat"}
    >
      Heat
    </button>
    <button 
      class:active={selectedFilter === "farrowing"} 
      onclick={() => selectedFilter = "farrowing"}
    >
      Farrow
    </button>
    <button 
      class:active={selectedFilter === "confirm"} 
      onclick={() => selectedFilter = "confirm"}
    >
      Confirm
    </button>
    <button 
      class:active={selectedFilter === "task"} 
      onclick={() => selectedFilter = "task"}
    >
      Tasks
    </button>
  </div>

  {#if filteredDates().length === 0}
    <p class="no-message">No upcoming dates found.</p>
  {:else}
    <div class="dates-list">
      {#each filteredDates() as upcomingDate}
        <div class="date-card">
          <div class="date-header">
            <span class={`type-badge ${getTypeBadgeClass(upcomingDate.type)}`}>
              {upcomingDate.type === "heat" ? "HEAT" : upcomingDate.type === "farrowing" ? "FARROW" : upcomingDate.type === "confirm" ? "CONFIRM" : "TASK"}
            </span>
            <span class="days-until">
              {getDaysUntil(upcomingDate.date) === 0 
                ? "Today" 
                : getDaysUntil(upcomingDate.date) === 1 
                ? "Tomorrow"
                : `${getDaysUntil(upcomingDate.date)}d`
              }
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
    font-size: 0.85rem;
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
    font-size: 0.65rem;
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
  
  .days-until {
    font-size: 0.8rem;
    font-weight: bold;
    color: #666;
  }
  
  .date-card h4 {
    margin: 0 0 4px 0;
    font-size: 1em;
    color: #333;
    line-height: 1.2;
  }
  
  .date-display {
    margin: 0 0 6px 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: #f2af29ff;
  }
  
  .description {
    margin: 0;
    font-size: 0.75rem;
    color: #666;
    line-height: 1.3;
  }
</style>
