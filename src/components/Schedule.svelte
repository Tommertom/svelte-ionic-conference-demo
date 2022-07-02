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

  import {
    alertController,
    isPlatform,
    loadingController,
    modalController,
    toastController,
  } from "$ionic/svelte";
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { conferenceService } from "$services/conference.service";
  import { userService } from "$services/user.service";

  let showSearchbar = false;
  let ios = isPlatform("ios");
  let queryText = "";
  let scheduleList;
  let slidingItem;
  let fab;
  let groups = [{ hide: false, time: "", sessions: [] }];
  let dayIndex = 0;
  let segment = "all";
  let excludeTracks: any = [];
  let shownSessions: any = [];
  let confDate: string;

  const updateSchedule = (event?) => {
    console.log("EVENT", event);
    // Close any open sliding items when the schedule updates
    if (scheduleList) {
      scheduleList.closeSlidingItems();
    }

    conferenceService.getTimeline(dayIndex, queryText, excludeTracks, segment).then((data: any) => {
      shownSessions = data.shownSessions;
      groups = data.groups;
    });
  };

  const presentFilter = async (event) => {
    console.log("asdsdas", event);
    const modal = await modalController.create({
      component: Map, // ScheduleFilterPage,
      swipeToClose: true,
      //   presentingElement: routerOutlet.nativeEl,
      componentProps: { excludedTracks: excludeTracks },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      excludeTracks = data;
      updateSchedule();
    }
  };

  const openSocial = async (network) => {
    console.log("SOCOSC", network);
    const loading = await loadingController.create({
      message: `Posting to ${network}`,
      duration: Math.random() * 1000 + 500,
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  };

  const addFavorite = async (slidingItem: HTMLIonItemSlidingElement, sessionData: any) => {
    console.log("adsadas", slidingItem, sessionData);
    if (userService.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      removeFavorite(slidingItem, sessionData, "Favorite already added");
    } else {
      // Add as a favorite
      userService.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await toastController.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [
          {
            text: "Close",
            role: "cancel",
          },
        ],
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }
  };

  const removeFavorite = async (
    slidingItem: HTMLIonItemSlidingElement,
    sessionData: any,
    title: string
  ) => {
    const alert = await alertController.create({
      header: title,
      message: "Would you like to remove this session from your favorites?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          },
        },
        {
          text: "Remove",
          handler: () => {
            // they want to remove this session from their favorites
            userService.removeFavorite(sessionData.name);
            updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  };
</script>

<IonPage route="/tabs/schedule">
  <ion-header translucent="true">
    <ion-toolbar>
      {#if !showSearchbar}
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
      {/if}

      {#if ios}
        <ion-segment on:ionChange={updateSchedule} value="all">
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
</IonPage>
