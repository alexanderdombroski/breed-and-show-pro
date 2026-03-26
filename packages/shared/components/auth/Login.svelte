<!-- src/routes/login.svelte -->
<script lang="ts">
  import { authClient } from "./auth.svelte";

  function login() {
    authClient.signIn.social({
      provider: "google",
    });
  }
</script>

<button class="google-btn" onclick={login}>
  <img
    class="google-logo"
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google logo"
  />
  <span>Sign in with Google</span>
</button>

<style>
  .google-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: white;
    color: #444;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: box-shadow 0.2s ease;
  }

  .google-btn:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .google-logo {
    width: 18px;
    height: 18px;
  }
</style>
