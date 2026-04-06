<script lang="ts">
  import type { Pig } from "../../shared/types/schemas.ts";
  type Props = {
    pig: Pick<Pig, "_id" | "show">;
  };

  const { pig }: Props = $props();
</script>

{#if pig.show}
  <div class="show-info">
    <span class="show-label">Upcoming Show:</span>
    <p class="show-name">{pig.show.name ?? "Not Set"}</p>
    {#if pig.show.date}
      <p class="show-date">
        {new Date(pig.show.date).toLocaleDateString()}
      </p>
    {/if}
  </div>
{/if}

<style>
  /* Show Info Section */
  .show-info {
    margin-top: auto; /* Pushes show info to the bottom */
    background: #f9fafb;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .show-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9ca3af;
  }

  .show-name {
    margin: 0.25rem 0 0 0;
    font-weight: bold;
    color: #374151;
  }

  .show-date {
    margin: 0;
    color: #6b7280;
  }
</style>
