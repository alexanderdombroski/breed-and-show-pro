<script lang="ts">
  import { Popover } from "bits-ui";
  import type { Pig } from "../../shared/types/schemas.ts";

  type Props = {
    pig: Pick<Pig, "_id" | "show">;
  };

  const { pig }: Props = $props();
  let showDate = $state(new Date());
  $effect(() => {
    showDate = new Date(pig.show?.date ?? new Date());
  });
</script>

<div class="show-info">
  <span class="show-label">Upcoming Show:</span>
  <Popover.Root>
    <Popover.Trigger aria-label="edit" class="edit">
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
    </Popover.Trigger>
    <Popover.Content>
      <form class="edit-form" onsubmit={(e) => e.preventDefault()}>
        <label for="show-name">Show Name:</label>
        <input type="text" name="show-name" id="show-name" required />
        <label for="show-date">Show Date:</label>
        <input type="text"  />
        <input
          type="date"
          value={`${showDate.getFullYear()}-${String(showDate.getMonth() + 1).padStart(2, "0")}-${String(showDate.getDate()).padStart(2, "0")}`}
          name="show-date" id="show-date" required
        />
        <button>Save</button>
      </form>
    </Popover.Content>
  </Popover.Root>
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

  :global(.edit) {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background-color: transparent;
    border: none;
    color: black;

    & svg {
      fill: black;
      width: 2rem;
      height: 2rem;

      &:hover {
        fill: #f2af29ff;
        cursor: pointer;
      }
    }
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

  /* Show Form */
  .edit-form {
    position: relative;
    background-color: white;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 0.25rem;
    padding: 0.5rem;
    border: solid lightgray 0.25rem;
    border-radius: 1rem;
    corner-shape: squircle;

    input {
      padding: 0.5rem 0.75rem;
      font-size: 0.95rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: #fff;
      color: #333;
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }
  
    input:hover {
      border-color: #bbb;
    }
  
    input:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.15);
    }
  
    input:disabled {
      background: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }

    button {
      border-radius: 0.5rem;
      background-color: transparent;
      height: 2rem;
      width: 100%;

      &:hover {
        cursor: pointer;
        background-color: #f2af29ff;
      }
    }
  }
</style>
