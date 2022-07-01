<script lang="ts">
  import {
    search,
    shareSocial,
    logoVimeo,
    logoFacebook,
    logoTwitter,
    logoInstagram,
    options,
  } from "ionicons/icons";

  let showSearchbar = false;
  let ios = true;
  let segment;
  let queryText = "";
  let scheduleList;
  let slidingItem;
  let fab;
  let shownSessions = 2;
  let groups = [{ hide: false, time: "", sessions: [] }];

  const updateSchedule = (event) => {
    console.log("EVENT", event);
  };

  const presentFilter = (event) => {
    console.log("asdsdas", event);
  };

  const openSocial = (social) => {
    console.log("SOCOSC", social);
  };

  const addFavorite = (x, y) => {
    console.log("adsadas", x, y);
  };

  const removeFavorite = (x, y, z) => {};
</script>

<ion-header translucent="true">
  <ion-toolbar>
    {#if !showSearchbar}
      <ion-buttons slot="start">
        <ion-menu-button />
      </ion-buttons>
    {/if}

    {#if ios}
      <ion-segment on:ionChange={updateSchedule}>
        <ion-segment-button value="all"> All </ion-segment-button>
        <ion-segment-button value="favorites"> Favorites </ion-segment-button>
      </ion-segment>
    {/if}

    {#if !ios && !showSearchbar}
      <ion-title>Schedule</ion-title>
    {/if}

    {#if showSearchbar}
      <ion-searchbar
        showCancelButton="always"
        on:ionChange={updateSchedule}
        on:ionCancel={(showSearchbar = false)}
        placeholder="Search"
      />
    {/if}
    <ion-buttons slot="end">
      {#if !ios && !showSearchbar}
        <ion-button
          on:click={() => {
            showSearchbar = true;
          }}
        >
          <ion-icon slot="icon-only" icon={search} />
        </ion-button>
      {/if}

      {#if !showSearchbar}
        <ion-button
          on:click={() => {
            presentFilter;
          }}
        >
          {#if ios}
            <span>Filter</span>
          {:else}
            <span>
              <ion-icon slot="icon-only" icon={options} />
            </span>
          {/if}
        </ion-button>
      {/if}
    </ion-buttons>
  </ion-toolbar>

  {#if !ios}
    <ion-toolbar>
      <ion-segment on:ionChange={updateSchedule}>
        <ion-segment-button value="all"> All </ion-segment-button>
        <ion-segment-button value="favorites"> Favorites </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
  {/if}
</ion-header>

<ion-content fullscreen="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Schedule</ion-title>
    </ion-toolbar>
    <ion-toolbar>
      <ion-searchbar on:ionChange={updateSchedule} placeholder="Search" />
    </ion-toolbar>
  </ion-header>

  <ion-list bind:this={scheduleList} hidden={shownSessions === 0}>
    {#each groups as group}
      <ion-item-group hidden={group.hide}>
        <ion-item-divider sticky>
          <ion-label>
            {group.time}
          </ion-label>
        </ion-item-divider>

        {#each group.sessions as session}
          <ion-item-sliding bind:this={slidingItem} hidden={session.hide}>
            <ion-item>
              <ion-label>
                <h3>{session.name}</h3>
                <p>
                  {session.timeStart} &mdash; {session.timeEnd}: {session.location}
                </p>
              </ion-label>
            </ion-item>
            <ion-item-options>
              {#if segment === "favorites"}
                <ion-item-option
                  color="favorite"
                  on:click={() => {
                    () => {
                      addFavorite(slidingItem, session);
                    };
                  }}
                >
                  Favorite
                </ion-item-option>
              {/if}
              {#if segment === "favorites"}
                <ion-item-option
                  color="danger"
                  on:click={() => {
                    () => {
                      removeFavorite(slidingItem, session, "Remove Favorite");
                    };
                  }}
                >
                  Remove
                </ion-item-option>
              {/if}
            </ion-item-options>
          </ion-item-sliding>
        {/each}
      </ion-item-group>
    {/each}
  </ion-list>

  <ion-list-header hidden={shownSessions > 0}> No Sessions Found </ion-list-header>

  <ion-fab slot="fixed" vertical="bottom" horizontal="end" bind:this={fab}>
    <ion-fab-button>
      <ion-icon icon={shareSocial} />
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button
        color="vimeo"
        on:click={() => {
          openSocial("Vimeo");
        }}
      >
        <ion-icon icon={logoVimeo} />
      </ion-fab-button>
      <ion-fab-button
        color="instagram"
        on:click={() => {
          openSocial("Instagram");
        }}
      >
        <ion-icon icon={logoInstagram} />
      </ion-fab-button>
      <ion-fab-button
        color="twitter"
        on:click={() => {
          openSocial("Twitter");
        }}
      >
        <ion-icon icon={logoTwitter} />
      </ion-fab-button>
      <ion-fab-button
        color="facebook"
        on:click={() => {
          openSocial("Facebook");
        }}
      >
        <ion-icon icon={logoFacebook} />
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</ion-content>
