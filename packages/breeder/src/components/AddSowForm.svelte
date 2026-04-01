<script>
  let showModal = $state(false);

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const sowData = {
      name: formData.get("name"),
      earNotch: formData.get("earNotch"),
      breed: formData.get("breed"),
      sex: "sow",
      status: "open",
      birthDate: formData.get("birthDate"),
      lastHeatDate: formData.get("lastHeatDate") || undefined,
      notes: formData.get("notes") || undefined
    };
    
    // TODO: Send sowData to backend API
    // eslint-disable-next-line no-console
    console.log("New sow:", sowData);
    
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
    if (event.key === "Escape") {
      closeModal();
    }
  }
</script>

<button class="create-btn" onclick={openModal}>
  + Add New Sow
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
        <h2>Add New Sow</h2>
        <button class="close-btn" onclick={closeModal}>&times;</button>
      </div>
      
      <form class="pig-form" onsubmit={handleSubmit}>
        <div class="form-group">
          <label for="name">Name *</label>
          <input 
            type="text" 
            id="name"
            name="name"
            placeholder="Enter sow name" 
            required 
          />
        </div>

        <div class="form-group">
          <label for="earNotch">Ear Notch *</label>
          <input 
            type="text" 
            id="earNotch"
            name="earNotch"
            placeholder="e.g., 3-2" 
            required 
          />
        </div>

        <div class="form-group">
          <label for="breed">Breed *</label>
          <select 
            id="breed"
            name="breed"
            required
          >
            <option value="">Select breed</option>
            <option value="Yorkshire">Yorkshire</option>
            <option value="Duroc">Duroc</option>
            <option value="Hampshire">Hampshire</option>
            <option value="Berkshire">Berkshire</option>
            <option value="Landrace">Landrace</option>
            <option value="Crossbred">Crossbred</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="birthDate">Birth Date *</label>
          <input 
            type="date" 
            id="birthDate"
            name="birthDate"
            required
          />
        </div>

        <div class="form-group">
          <label for="lastHeatDate">Last Heat Date (optional)</label>
          <input 
            type="date" 
            id="lastHeatDate"
            name="lastHeatDate"
          />
        </div>

        <div class="form-group">
          <label for="notes">Notes</label>
          <textarea 
            id="notes"
            name="notes"
            placeholder="Enter any additional notes (optional)" 
            rows="4"
          ></textarea>
        </div>

        <p class="required-message">* items are required</p>

        <div class="form-actions">
          <button type="button" class="cancel-btn" onclick={closeModal}>
            Cancel
          </button>
          <button type="submit" class="submit-btn">
            Add Sow
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .create-btn {
    background-color: #f2af29ff;
    color: black;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
    white-space: nowrap;
  }

  .create-btn:hover {
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
  }

  .close-btn:hover {
    color: #333;
  }

  .pig-form {
    padding: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
    box-sizing: border-box;
    font-family: inherit;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #f2af29ff;
    box-shadow: 0 0 0 2px rgba(242, 175, 41, 0.2);
  }

  .required-message {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 20px;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  .cancel-btn,
  .submit-btn {
    padding: 10px 24px;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .cancel-btn {
    background-color: #f0f0f0;
    color: #333;
  }

  .cancel-btn:hover {
    background-color: #e0e0e0;
  }

  .submit-btn {
    background-color: #f2af29ff;
    color: black;
  }

  .submit-btn:hover {
    background-color: #d99a1f;
  }
</style>
