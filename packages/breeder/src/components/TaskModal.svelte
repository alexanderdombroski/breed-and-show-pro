<script>
  // import { BreederMockData } from "../BreederMockData";
  // const tasks = BreederMockData.tasks;
  const baseURL = import.meta.env.PUBLIC_SERVER_URL;

  let showModal = $state(false);

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = {
      _type: 'task',
      title: formData.get('title'),
      description: formData.get('description'),
      dueDate: formData.get('dueDate')
    };

    const response = await fetch(`${baseURL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Task successfully created:', data);
      // Reload page to show new task
      window.location.reload();
    } else {
      console.error('Failed to create task:', data);
    }
    
    // Close modal and reset form
    closeModal();
    event.target.reset();
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleBackdropKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<button class="create-task-btn" onclick={openModal}>
  + Create New Task
</button>

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
        <h2>Create New Task</h2>
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
            required 
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            id="description"
            name="description"
            placeholder="Enter task description (optional)" 
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="dueDate">Due Date (optional)</label>
          <input 
            type="date" 
            id="dueDate"
            name="dueDate"
          />
        </div>

        <p class="required-message">* items are required</p>

        <div class="form-actions">
          <button type="button" class="cancel-btn" onclick={closeModal}>
            Cancel
          </button>
          <button type="submit" class="submit-btn">
            Add Task
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
    font-size: 1em;
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
    font-size: 1.5em;
    color: #333;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 2em;
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
    font-size: 0.95em;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1em;
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
