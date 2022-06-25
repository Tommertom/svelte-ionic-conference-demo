<script lang="ts">
  import { goto } from "@roxi/routify";

  function navigate(url) {
    console.log("Navigate url", url);
    $goto(url);
  }
  navigate("/tabs/tab1");
</script>
