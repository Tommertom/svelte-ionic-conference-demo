<script lang="ts">
  import IonTab from "$lib/ionic/svelte/components/IonTabs.svelte";
  import { params } from "@roxi/routify";

  // import { pin, images, square } from "ionicons/icons";

  import Tab1 from "$components/Tab1.svelte";
  import Tab2 from "$components/Tab2.svelte";
  import Tab3 from "$components/Tab3.svelte";

  let tabs = $params.tabs;
  let tab = tabs[0];

  const myTabs = [
    {
      label: "Tab One",
      icon: "pin",
      tab: "tab1",
      component: Tab1,
    },
    { label: "Photos", icon: "images", tab: "tab2", component: Tab2 },
    { label: "Tab three", icon: "square", tab: "tab3", component: Tab3 },
  ];

  console.log("Tabs", tab, myTabs);

  const logStuff = (event) => {
    console.log(">", event?.detail?.tab, event?.type);
  };
</script>

<IonTab
  slot="bottom"
  tabs={myTabs}
  selected={tab}
  ionTabsWillChange={logStuff}
  ionNavWillLoad={logStuff}
  ionTabsDidChange={logStuff}
/>
