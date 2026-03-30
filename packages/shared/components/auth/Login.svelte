<script lang="ts">
  import { login } from "./auth.svelte";

  type Props = {
    redirect?: string;
    loginText?: string;
    className?: string;
    
  };

  const { redirect, loginText, className }: Props = $props();
</script>

<button class={`${className || "google-btn"}`} onclick={() => login(redirect ?? "/")}>
  <img
    class="google-logo"
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google logo"
  />
  <span>{loginText || "Sign in with Google"}</span>
</button>

<style>
  
</style>
