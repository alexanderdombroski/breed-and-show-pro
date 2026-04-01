<script lang="ts">
  interface UpcomingDate {
    date: string;
    type: 'heat' | 'farrowing' | 'task' | 'confirm';
    title: string;
    description?: string;
    animalName?: string;
  }

  let { upcomingDates }: { upcomingDates: UpcomingDate[] } = $props();
  
  type FilterType = 'all' | 'heat' | 'farrowing' | 'task' | 'confirm';
  let selectedFilter = $state<FilterType>('all');
  
  // Filter dates based on selected type
  const filteredDates = $derived(() => {
    if (selectedFilter === 'all') return upcomingDates;
    return upcomingDates.filter(date => date.type === selectedFilter);
  });
  
  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
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
      case 'heat': return 'badge-heat';
      case 'farrowing': return 'badge-farrowing';
      case 'task': return 'badge-task';
      case 'confirm': return 'badge-confirm';
      default: return '';
    }
  }
</script>

<div class="filter-buttons">
  <button 
    class:active={selectedFilter === 'all'} 
    onclick={() => selectedFilter = 'all'}
  >
    All
  </button>
  <button 
    class:active={selectedFilter === 'heat'} 
    onclick={() => selectedFilter = 'heat'}
  >
    Heat Dates
  </button>
  <button 
    class:active={selectedFilter === 'farrowing'} 
    onclick={() => selectedFilter = 'farrowing'}
  >
    Farrowing
  </button>
  <button 
    class:active={selectedFilter === 'confirm'} 
    onclick={() => selectedFilter = 'confirm'}
  >
    Confirm Breeding
  </button>
  <button 
    class:active={selectedFilter === 'task'} 
    onclick={() => selectedFilter = 'task'}
  >
    Tasks
  </button>
</div>

{#if filteredDates().length === 0}
  <p class="message">No upcoming dates found.</p>
{:else}
  <div class="dates-list">
    {#each filteredDates() as upcomingDate}
      <div class="date-card">
        <div class="date-header">
          <span class={`type-badge ${getTypeBadgeClass(upcomingDate.type)}`}>
            {upcomingDate.type.toUpperCase()}
          </span>
          <span class="days-until">
            {getDaysUntil(upcomingDate.date) === 0 
              ? 'Today' 
              : getDaysUntil(upcomingDate.date) === 1 
              ? 'Tomorrow'
              : `In ${getDaysUntil(upcomingDate.date)} days`
            }
          </span>
        </div>
        <h2>{upcomingDate.title}</h2>
        <p class="date-display">{formatDate(upcomingDate.date)}</p>
        {#if upcomingDate.description}
          <p class="description">{upcomingDate.description}</p>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  .filter-buttons {
    display: flex;
    gap: 10px;
    margin: 30px 0 20px 0;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .filter-buttons button {
    padding: 10px 20px;
    border: 2px solid #f2af29ff;
    background-color: white;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.2s;
  }
  
  .filter-buttons button:hover {
    background-color: #fff3e0;
  }
  
  .filter-buttons button.active {
    background-color: #f2af29ff;
    color: white;
    font-weight: bold;
  }
  
  .dates-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .date-card {
    border: 1px solid #ddd;
    border-left: 4px solid #f2af29ff;
    padding: 15px 20px;
    border-radius: 5px;
    background-color: white;
    transition: box-shadow 0.2s;
    cursor: pointer;
  }
  
  .date-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .date-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .type-badge {
    font-size: 0.7rem;
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
    font-size: 0.9rem;
    font-weight: bold;
    color: #666;
  }
  
  .date-card h2 {
    margin: 0 0 8px 0;
    font-size: 1.3em;
    color: #333;
  }
  
  .date-display {
    margin: 0 0 8px 0;
    font-size: 1rem;
    font-weight: 600;
    color: #f2af29ff;
  }
  
  .description {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
  }
  
  .message {
    text-align: center;
    font-size: 1.2em;
    color: #555;
    margin-top: 40px;
  }
</style>
