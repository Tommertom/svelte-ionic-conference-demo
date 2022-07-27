<script lang="ts" context="module">
  import { Router, router } from "../.routify/instance.default.js";
  import { pwaStatusStream } from "$lib/pwa";
  import type { PWAStatus } from "$lib/pwa";

  /* Theme variables */
  import "./theme/variables.css";

  pwaStatusStream.subscribe((status: PWAStatus) => {
    console.log("PWA status", status);

    if (status.updateFunction) {
      console.log("PWA updating itself in 4 secs......");
      setTimeout(() => {
        status.updateFunction();
      }, 4000);
    }
  });
</script>

<Router {router} />
