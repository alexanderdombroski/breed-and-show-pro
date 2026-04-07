<script>
  // import { BreederMockData } from "../BreederMockData";
  // const tasks = BreederMockData.tasks;
  const baseURL = import.meta.env.PUBLIC_SERVER_URL;

  let { isEdit = false, taskData = null, onTaskUpdated = () => {} } = $props();

  let showModal = $state(false);
  let title = $state("");
  let description = $state("");
  let dueDate = $state("");

  // Update form values when taskData changes
  $effect(() => {
    if (taskData) {
      title = taskData.title || "";
      description = taskData.description || "";
      dueDate = taskData.dueDate
        ? new Date(taskData.dueDate).toISOString().split("T")[0]
        : "";
    } else {
      title = "";
      description = "";
      dueDate = "";
    }
  });

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    if (!isEdit) {
      // Reset form for create mode
      title = "";
      description = "";
      dueDate = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      _type: "task",
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate") || null,
    };

    const url = isEdit
      ? `${baseURL}/api/tasks/${taskData._id}`
      : `${baseURL}/api/tasks`;
    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = isEdit ? await response.json() : await response.json();

      console.info(
        `Task successfully ${isEdit ? "updated" : "created"}:`,
        data,
      );
      // Notify parent component
      onTaskUpdated();
      closeModal();
      // Reload page to show updated task
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error(
        `Failed to ${isEdit ? "update" : "create"} task:`,
        errorData,
      );
    }

    if (!isEdit) {
      event.target.reset();
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleBackdropKeydown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
</script>

{#if !isEdit}
  <button class="create-task-btn" onclick={openModal}>
    + Create New Task
  </button>
{/if}

{#if showModal}
  <div
    class="modal-backdrop"
    role="button"
    tabindex="0"
    onclick={handleBackdropClick}
    onkeydown={handleBackdropKeydown}
  >
    <div class="modal-content">
      <div class="modal-header">
        <h2>{isEdit ? "Edit Task" : "Create New Task"}</h2>
        <button class="close-btn" onclick={closeModal}>&times;</button>
      </div>

      <form class="task-form" onsubmit={handleSubmit}>
        <div class="form-group">
          <label for="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            bind:value={title}
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter task description (optional)"
            bind:value={description}
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="dueDate">Due Date (optional)</label>
          <input type="date" id="dueDate" name="dueDate" bind:value={dueDate} />
        </div>

        <p class="required-message">* items are required</p>

        <div class="form-actions">
          <button type="button" class="cancel-btn" onclick={closeModal}>
            Cancel
          </button>
          <button type="submit" class="submit-btn">
            {isEdit ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .create-task-btn {
    background-color: #f2af29ff;
    color: black;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    font-size: var(--step--1);
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .create-task-btn:hover {
    background-color: #d99a1f;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e0e0e0;
  }

  .modal-header h2 {
    margin: 0;
    font-size: var(--step-1);
    color: #333;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: var(--step-3);
    color: #666;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    margin-left: auto;
    margin-right: 1px;
  }

  .close-btn:hover {
    color: #333;
  }

  .task-form {
    padding: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #333;
    font-size: var(--step--1);
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: var(--step--1);
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #f2af29ff;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  .required-message {
    font-size: 0.9em;
    color: #666;
    margin-top: -12px;
    margin-bottom: 12px;
  }

  .cancel-btn,
  .submit-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .cancel-btn {
    background-color: #e0e0e0;
    color: #333;
  }

  .cancel-btn:hover {
    background-color: #d0d0d0;
  }

  .submit-btn {
    background-color: #f2af29ff;
    color: white;
  }

  .submit-btn:hover {
    background-color: #d99a1f;
  }
</style>
