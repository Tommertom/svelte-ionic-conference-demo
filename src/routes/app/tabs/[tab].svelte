<script lang="ts">
  import About from "$components/About.svelte";

  import Map from "$components/Map.svelte";

  import Schedule from "$components/Schedule.svelte";
  import SpeakerList from "$components/SpeakerList.svelte";

  import IonTab from "$lib/ionic/svelte/components/IonTabs.svelte";
  import { params } from "@roxi/routify";

  let tab = $params.tab;

  const myTabs = [
    {
      label: "Schedule",
      icon: "calendar",
      tab: "schedule",
      component: Schedule,
    },
    { label: "Speakers", icon: "people", tab: "speakers", component: SpeakerList },
    { label: "Map", icon: "location", tab: "map", component: Map },
    { label: "About", icon: "informationCircle", tab: "about", component: About },
  ];

  console.log("Tabs", tab, myTabs);

  const logStuff = (event) => {
    console.log(">", event?.detail?.tab, event?.type);
  };

  // styles won't apply
</script>

<IonTab
  slot="bottom"
  tabs={myTabs}
  selected={tab}
  ionTabsWillChange={logStuff}
  ionNavWillLoad={logStuff}
  ionTabsDidChange={logStuff}
/>

<style>
  .tabbar {
    justify-content: center;
  }

  .tab-button {
    max-width: 200px;
  }
</style>
