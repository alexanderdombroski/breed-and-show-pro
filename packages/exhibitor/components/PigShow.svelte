<script lang="ts">
  import type { Pig } from "../../shared/types/schemas.ts";
  type Props = {
    pig: Pick<Pig, "_id" | "show">;
  };

  const { pig }: Props = $props();
</script>

<div class="show-info">
  <span class="show-label">Upcoming Show:</span>
  <button aria-label="edit" class="edit">
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ><g data-name="Layer 2"
        ><g data-name="edit"
          ><rect width="24" height="24" opacity="0" /><path
            d="M19.4 7.34L16.66 4.6A2 2 0 0 0 14 4.53l-9 9a2 2 0 0 0-.57 1.21L4 18.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 20h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71zM9.08 17.62l-3 .28.27-3L12 9.32l2.7 2.7zM16 10.68L13.32 8l1.95-2L18 8.73z"
          /></g
        ></g
      ></svg
    >
  </button>
  <p class="show-name">{pig.show?.name ?? "Not Set"}</p>
  {#if pig.show?.date}
    <p class="show-date">
      {new Date(pig.show.date).toLocaleDateString()}
    </p>
  {/if}
</div>

<style>
  /* Show Info Section */
  .show-info {
    position: relative;
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

  .edit {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background-color: transparent;
    border: none;
    color: black;
  }

  .edit svg {
    color: black;
    fill: black;
    width: 2rem;
    height: 2rem;
  }

  .edit svg:hover {
    fill: #f2af29ff;
    cursor: pointer;
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
