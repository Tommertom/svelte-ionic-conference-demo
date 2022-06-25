<script lang="ts">
  import Menu from "$components/Menu.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    // defineCustomElements(window);
  });
</script>

<ion-app>
  <ion-split-pane content-id="main">
    <Menu />
    <div class="ion-page" id="main">
      <slot />
    </div>
  </ion-split-pane>
</ion-app>
