<script lang="ts">
  import { BreederMockData } from "../BreederMockData.js";
  
  const tasks = BreederMockData.tasks;
  // const incompleteTasks = tasks.filter(t => !t.completed);
  
  // Use same date logic as task page
  const isDatePast = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };
  
  // const overdueTasks = incompleteTasks.filter(t => {
  //   if (!t.dueDate) return false;
  //   return isDatePast(t.dueDate);
  // });
</script>

<section class="widget-container">
  <div class="title">
    <a href="/task/" class="widget-link">
        <h3>Tasks</h3>
    </a>
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
    margin-bottom: 15px;
    position: sticky;
    top: 0;
    background-color: #f2af29ff;
    z-index: 10;
    padding: 10px 15px;
    margin: -10px -15px 15px -15px;
    border-radius: 8px 8px 0 0;
  }

  .widget-link {
    text-decoration: none;
    color: white;
  }
  
  .widget-link:hover h3 {
    color: black;
  }
  
  .widget-container {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0px 10px 15px 10px;
    height: 410px;
    width: 400px;
    overflow: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: white;
  }
  
  .checkbox {
    margin-right: 15px;
    transform: scale(1.5);
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .task-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-left: 3px solid #f2af29ff;
    background-color: #fafafa;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .task-card:hover {
    background-color: #fff3e0;
    box-shadow: 0 2px 6px rgba(255, 165, 0, 0.2);
  }

  .task-info h2 {
    margin: 0 0 4px 0;
    font-size: 1em;
    line-height: 1.2;
    text-align: left;
    color: #333;
  }

  .task-info p {
    margin: 0;
    font-size: 0.8em;
    text-align: left;
  }
  
  .description {
    line-height: 1.2;
    color: #666;
  }

  .due-date {
    font-weight: 600;
    font-size: 0.75rem;
  }

  .past-date {
    color: #d32f2f;
  }

  .future-date {
    color: #2e7d32;
  }

  .message {
    text-align: center;
    font-size: 1.2em;
    color: #888;
    margin-top: 40px;
  }

</style>