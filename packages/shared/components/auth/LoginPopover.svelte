<script lang="ts">
  import { Popover } from "bits-ui";
</script>

<Popover.Root>
  <Popover.Trigger class="btn-secondary">Login with Email</Popover.Trigger>

  <Popover.Portal>
    <Popover.Content class="login-popover" sideOffset={8}>
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>

<style>
  :global(.login-popover) {
    position: relative;
    z-index: 20000;
    background-color: white;
    border: solid 2px black;
    border-radius: 10px;
  }

  form {
    padding: 0.5rem;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    text-align: center;
  }

  input {
    width: calc(100% - 24px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: 0.3s;
  }

  input:focus {
    border-color: #4facfe;
    box-shadow: 0 0 5px rgba(79, 172, 254, 0.5);
  }

  button {
    width: 100%;
    padding: 10px;
    background: #4facfe;
    border: none;
    color: white;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: #00c6ff;
  }
</style>
