<script lang="ts">
  import { BreederMockData } from "../BreederMockData.js";
  
  const tasks = BreederMockData.tasks;
  const incompleteTasks = tasks.filter(t => !t.completed);
  
  // Use same date logic as task page
  const isDatePast = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };
  
  const overdueTasks = incompleteTasks.filter(t => {
    if (!t.dueDate) return false;
    return isDatePast(t.dueDate);
  });
</script>

<section class="widget-container">
  <div class="title">
    <a href="/task/" class="widget-link">
        <h3>Tasks</h3>
    </a>
    <div class="stats">
      {#if overdueTasks.length > 0}
          <div class="stat-item overdue">
          <span class="number">{overdueTasks.length}</span>
          <span class="label">Overdue</span>
          </div>
      {/if}
      <div class="stat-item">
        <span class="number">{incompleteTasks.length}</span>
        <span class="label">Pending</span>
      </div>
    </div>
  </div>

  {#if tasks.length > 0}
    <div class="tasks-list">
        {#each tasks as task}
            <div class="task-card">
                <input class="checkbox" type="checkbox" />
                <div class="task-info">
                    <h2>{task.title}</h2>
                    {#if task.dueDate}
                        <p class={`due-date ${isDatePast(task.dueDate) ? "past-date" : "future-date"}`}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
  {/if}
</section>

<style>
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 5;
    padding: 5px 0;
  }

  .widget-link {
    text-decoration: none;
    color: inherit;
  }
  
  .widget-link:hover {
    color: orange;
  }
  
  .widget-container {
    border: 1px solid orange;
    padding: 10px 15px;
    margin: 20px 0;
    height: 400px;
    width: 320px;
    overflow: auto;
  }
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .stats {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  
  .stat-item .number {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
  }
  
  .stat-item .label {
    font-size: 0.75rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1;
  }
  
  .stat-item.overdue .number {
    color: #d32f2f;
  }
  
  .stat-item.overdue .label {
    color: #d32f2f;
  }

  .checkbox {
    margin-right: 15px;
    transform: scale(1.5);
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 10px;
  }

  .task-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #f2af29ff;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .task-card:hover {
    background-color: #f0b746cc;
  }

  .task-info h2 {
    margin: 0 0 5px 0;
    font-size: 1em;
    line-height: 1.2;
    text-align: left;
  }

  .task-info p {
    margin: 0;
    font-size: 0.8em;
    text-align: left;
  }

  .description {
    line-height: 1.2;
  }

  .due-date {
    font-weight: bold;
  }

  .past-date {
    color: rgb(170, 0, 0);
  }

  .future-date {
    color: rgb(1, 83, 1);
  }

  .message {
    text-align: center;
    font-size: 1.2em;
    color: #555;
    margin-top: 40px;
  }

</style>