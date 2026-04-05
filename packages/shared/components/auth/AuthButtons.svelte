<script lang="ts">
    import { authClient, logout } from "./auth.svelte";
    import LoginPopover from "./LoginPopover.svelte";
    import Login from "./Login.svelte";
    import { Popover } from "bits-ui";
    import { onDestroy } from "svelte";

    let loggedIn = $state(false);

    const session = authClient.useSession();
    const stopListener = session.listen((s) => {
        loggedIn = !!s.data?.session;
    });
    onDestroy(stopListener);
</script>

<Popover.Root>
    <Popover.Trigger style="background-color: transparent; border: none;">
        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg width="800px" height="800px" viewBox="0 -0.05 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <g id="Group_7" data-name="Group 7" transform="translate(-247 -205)">
            <path id="Path_8" data-name="Path 8" d="M281,219a2,2,0,0,0,0-4h-5.1l-2.3-8.1a2.672,2.672,0,0,0-2.5-1.9h-12a2.807,2.807,0,0,0-2.5,1.9l-2.3,8.1H249a2,2,0,0,0,0,4h4.2a12.063,12.063,0,0,0,2.9,6H253a2.807,2.807,0,0,0-2.5,1.9l-3,12.1a1.431,1.431,0,0,0,1.5,1.9h32a1.458,1.458,0,0,0,1.5-1.9l-3-12.1A2.672,2.672,0,0,0,277,225h-3.1a12.063,12.063,0,0,0,2.9-6Zm-16,6a8.039,8.039,0,0,1-7.7-6h15.5A8.25,8.25,0,0,1,265,225Zm-5-16h10l1.7,6H258.3Zm-7.9,28,2-8H257v8Zm8.9,0v-8h8v8Zm16.9,0H273v-8h2.9Z" />
        </g>
        </svg>
    </Popover.Trigger>
    <Popover.Content>
        <div class="auth-buttons">
            {#if loggedIn}
                <button onclick={logout} class="btn-secondary">Logout</button>
            {:else}
                <LoginPopover />
                <Login className="btn-primary" loginText="Login with Google" />
            {/if}
        </div>
    </Popover.Content>
</Popover.Root>


<style>
    svg {
        width: 3rem;
        height: 3rem;
        color: #222;
        cursor: pointer;

        &:hover {
            color: #f2af29ff;
        }
    }

  .auth-buttons {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    align-items: center;
    gap: 20px;
    background-color: #fff;
    border: black solid 0.125rem;
  }

</style>