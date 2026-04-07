<script lang="ts">
  import { onMount } from "svelte";
  interface Props {
    serverUrl: string;
  }

  let { serverUrl }: Props = $props();
  let events = $state<any[]>([]);
  let loading = $state(true);
  let errorMsg = $state("");
  const baseUrl = new URL(window.location.href).origin;

  onMount(async () => {
    try {
      const response = await fetch(`${serverUrl}/events`);
      const data = await response.json();
      events = Array.isArray(data) ? data : data.events || [];
    } catch (error) {
      errorMsg = "Failed to load events!";
      console.error(error);
    } finally {
      loading = false;
    }
  });
</script>

<div class="event-grid">
  <h1>Upcoming Events</h1>
  <ul class="event-ul">
    {#if loading}
      <p>Loading events...</p>
    {:else if !!errorMsg}
      <p class="error">{errorMsg}</p>
    {:else if events.length > 0}
      {#each events as event (event._id)}
        <li class="event-card" id={`${event._id}`}>
          <a href={`${baseUrl}/details?id=${event._id}`} class="card-link">
            <div class="card-content">
              <h2 class="event-name">{event.label}</h2>
              <div class="divider"></div>
              <p><strong>Event ID:</strong> {event._id}</p>
              <p class="event-detail">
                <strong>Date:</strong>
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </a>
        </li>
      {/each}
    {:else}
      <p>No events found.</p>
    {/if}
  </ul>
</div>

<style>
  .event-detail {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .event-ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    list-style: none;
  }

  /* The "Island" Card */
  .event-card {
    border: 2px solid transparent;
    background: white !important;
    color: inherit;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  /* Hover Effects */
  .event-card:hover {
    border-color: #3b82f6;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  /* Make the entire card clickable */
  .card-link {
    color: inherit;
    text-decoration: none;
    display: block;
    height: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
  }

  .event-name {
    margin: 0;
    font-size: 1.25rem;
    color: #1a1a1a;
  }

  .divider {
    height: 2px;
    background: #f0f0f0;
    margin: 0.75rem 0;
  }

  .event-detail {
    color: #4b5563;
    margin: 0.25rem 0;
  }

  /* Status Messages */
  .error {
    color: #ef4444; /* A nice readable red */
    font-weight: 500;
  }
</style>
