<script lang="ts">
  import { userData } from "./auth.svelte";

  const baseUrl = import.meta.env.BASE_URL;

  const { user: profile } = $derived(userData);
</script>

<a class="back-link" href={baseUrl}>Back to Dashboard</a>
{#if profile?.name}
  <div class="profile-card">
    <div
      style="border: solid black 1rem; border-radius: 50%; margin-bottom: 1rem; object-fit: cover; overflow: hidden;"
    >
      {#if profile.image}
        <img src={profile.image} alt="Profile" style="width: 100%;" />
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          ><g data-name="Layer 2"
            ><g data-name="person"
              ><rect width="24" height="24" opacity="0" /><path
                d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
              /><path
                d="M12 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z"
              /></g
            ></g
          ></svg
        >
      {/if}
    </div>
    <!-- <h2>{profile.farmName}</h2> -->
    <h2>Hello, {profile.name}</h2>
    <p>Email: {profile.email}</p>
  </div>
{:else}
  <p>Failed to fetch profile. Ensure you are logged in.</p>
{/if}

<style>
  .profile-card {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin-top: 30px;
    margin: 0 auto;
    margin-bottom: 30px;
    text-align: center;
  }

  .profile-card h2 {
    margin: 0;
    font-size: 1.5em;
  }

  /* .profile-card h3 {
    margin: 5px 0 5px 0;
    color: #555;
  } */

  .profile-card p {
    margin: 0 0 15px 0;
  }

  p {
    text-align: center;
    font-size: large;
  }
</style>
