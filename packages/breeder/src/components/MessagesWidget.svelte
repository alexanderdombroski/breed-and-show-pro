<script>
    import "../styles/breeder-pages.css";
    let messages = [
        { 
            name: "John Doe", 
            text: "Hey breeder, I'm interested in buying a pig for grant county fair." 
        },
        { 
            name: "Sarah Smith", 
            text: "Hello, I wanted to ask about the availability of pigs for the upcoming fair." 
        }
    ];
</script>

<section class="widget-container">
  <div class="title">
    <a href="/messages/" class="widget-link">
        <h3>Messages</h3>
    </a>
  </div>

  <div class="messages-container">
    {#if messages.length > 0}
      {#each messages as message}
        <div class="message">
          <div class="contact-name">{message.name}</div>
          <p>{message.text}</p>
        </div>
      {/each}
    {:else}
      <p class="no-messages">No messages available.</p>
    {/if}
  </div>
</section>

<style>
  .messages-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 10px;
  }

  .message {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s ease;
  }

  .message:hover {
    background-color: #f2f2f2;
  }

  .contact-name {
    font-weight: 600;
    color: #f2af29ff;
    margin-bottom: 6px;
    font-size: 1rem;
  }

  .message p {
    margin: 0;
    color: #333;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  .no-messages {
    color: #999;
    text-align: center;
    padding: 20px;
    font-style: italic;
  }

</style>
