<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    serverUrl: string;
  }

  let { serverUrl }: Props = $props();

  let pigId = $state("");
  let pig = $state<any>(null);
  let note = $state<any>(null);
  let loading = $state(true);
  let errorMsg = $state("");
  let weightInput = $state<number | "">("");
  let notesInput = $state("");
  let hasNote = $state(false);

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      errorMsg = "No Pig ID provided in the URL.";
      loading = false;
      return;
    }
    pigId = id;

    try {
      const [pigRes, noteRes] = await Promise.all([
        fetch(`${serverUrl}/pigs/${pigId}`),
        fetch(`${serverUrl}/notes/${pigId}`),
      ]);

      if (pigRes.ok) pig = await pigRes.json();

      if (noteRes.ok) {
        const noteData = await noteRes.json();
        note = noteData || {};

        weightInput = note.weight || "";
        notesInput = note.notes || "";
        hasNote = !!note.notes;
      }
    } catch (error) {
      console.error(error);
      errorMsg = "Failed to load pig details.";
    } finally {
      loading = false;
    }
  });

  // Handle Form Submission
  async function saveNote(e: SubmitEvent) {
    e.preventDefault();

    const payload = {
      pigId: pigId,
      notes: notesInput,
      weight: weightInput === "" ? undefined : Number(weightInput),
    };

    const method = hasNote ? "PUT" : "POST";
    const url = hasNote ? `${serverUrl}/notes/${pigId}` : `${serverUrl}/notes`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`Note successfully ${hasNote ? "updated" : "added"}!`);
        hasNote = true;
        note = { ...note, notes: notesInput, weight: weightInput };
      } else {
        alert("Failed to save note.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function deleteNote() {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const response = await fetch(`${serverUrl}/notes/${pigId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Note deleted successfully!");
        // Clear local state
        note = null;
        weightInput = "";
        notesInput = "";
        hasNote = false;
      } else {
        alert("Failed to delete note.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
</script>

{#if loading}
  <div class="pig-detail">
    <h2>Loading details...</h2>
  </div>
{:else if errorMsg}
  <div class="pig-detail">
    <h2 class="error">{errorMsg}</h2>
  </div>
{:else if pig}
  <div class="pig-detail">
    <h2 class="pig-name">{pig.name}</h2>
    <p><strong>Breed:</strong> {pig.breed}</p>
    <p><strong>Breeding Status:</strong> {pig.status}</p>
    <p><strong>Sex:</strong> {pig.sex}</p>
    <p><strong>Weight:</strong> {note?.weight || "N/A"} lbs</p>
    <p>
      <strong>Notes:</strong>
      <span id="note-display">{note?.notes || `No notes for ${pig.name}`}</span>
    </p>

    {#if hasNote}
      <button class="btn-delete" onclick={deleteNote}>Delete Note</button>
    {/if}

    <br />
    <br />

    <div class="note-form">
      <h3>{hasNote ? "Update" : "Add"} Notes for {pig.name}</h3>
      <form onsubmit={saveNote}>
        <label for="weight">Weight (lbs)</label>
        <input
          type="number"
          id="weight"
          class="weight-input"
          step="0.1"
          min="0"
          placeholder="e.g., 250"
          bind:value={weightInput}
          required
        />

        <label for="content">Notes</label>
        <textarea
          id="content"
          rows="4"
          placeholder="Enter your note here..."
          bind:value={notesInput}
          required
        ></textarea>

        <div class="form-actions">
          <button class="add-btn" type="submit">
            {hasNote ? "Update Note" : "Add Note"}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  /* All your exact styles mapped cleanly! */
  .btn-delete {
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      transform 0.1s ease;
  }

  .btn-delete:hover {
    background-color: #fa1212;
  }

  .pig-detail {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: system-ui, sans-serif;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    padding: 4%;
    border-radius: 8px;
  }

  .pig-detail h2 {
    margin-bottom: 1rem;
  }
  .pig-detail p {
    margin: 0.5rem 0;
  }

  h2 {
    margin: 0 0 1.5rem 0;
    color: #0f172a;
    font-size: 1.75rem;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 0.75rem;
  }
  h3 {
    margin: 0 0 1rem 0;
    color: #0f172a;
    font-size: 1.25rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
  }

  .weight-input {
    width: 30%;
    box-sizing: border-box;
    padding: 0.875rem;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1;
    transition: all 0.2s ease;
    background-color: #f8fafc;
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.875rem;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.5;
    resize: vertical;
    min-height: 120px;
    transition: all 0.2s ease;
    background-color: #f8fafc;
  }

  textarea:focus {
    outline: none;
    background-color: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  .form-actions {
    display: flex;
    justify-content: flex-start;
  }

  .add-btn {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      transform 0.1s ease;
  }

  .add-btn:hover {
    background-color: #2563eb;
  }
  .add-btn:active {
    transform: translateY(1px);
  }
  .error {
    color: #ef4444;
  }
</style>
