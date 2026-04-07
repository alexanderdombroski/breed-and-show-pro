<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    serverUrl: string;
    baseUrl: string;
  }

  let { serverUrl, baseUrl }: Props = $props();

  let event = $state<any>(null);
  let pig = $state<any>(null);
  let loading = $state(true);
  let errorMsg = $state("");

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      errorMsg = "No Event ID provided in the URL.";
      loading = false;
      return;
    }

    try {
      const response = await fetch(`${serverUrl}/events/${id}`);
      if (!response.ok) throw new Error("Failed to fetch event");
      event = await response.json();

      const pigResponse = await fetch(`${serverUrl}/pigs/${event.pigId}`);
      if (!pigResponse.ok) throw new Error("Failed to fetch pig");
      pig = await pigResponse.json();
    } catch (error) {
      console.error(error);
      errorMsg = "Failed to load event details. Please try again.";
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="event-details">
    <h2>Loading details...</h2>
  </div>
{:else if errorMsg}
  <div class="event-details error-state">
    <h2>{errorMsg}</h2>
  </div>
{:else if event && pig}
  <div class="event-details">
    <h1>{event.label}</h1>
    <p><strong>Event ID:</strong> {event._id}</p>
    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
    <p>
      <strong>Pig:</strong>
      <a href={`${baseUrl}/pigs/${pig._id}`} class="pig-link">{pig.name}</a>
    </p>
  </div>
{/if}

<style>
  .event-details {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: system-ui, sans-serif;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    padding: 3%;
    border-radius: 8px;
  }

  .error-state {
    text-align: center;
    color: #ef4444; /* Red color for errors */
  }

  .pig-link {
    color: #007acc;
    text-decoration: none;
    font-weight: 500;
  }

  .pig-link:hover {
    text-decoration: underline;
    color: #005999;
  }
</style>
