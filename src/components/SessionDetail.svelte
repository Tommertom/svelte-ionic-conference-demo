<script lang="ts">
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { userService } from "$services/user.service";
  import { star, starOutline } from "ionicons/icons";

  let session: any;
  let isFavorite = false;

  const ionViewWillEnter = async () => {};

  const sessionClick = (item: string) => {
    console.log("Clicked", item);
  };

  const shareSession = () => {
    console.log("Clicked share session");
  };

  const toggleFavorite = () => {
    if (userService.hasFavorite(session.name)) {
      userService.removeFavorite(session.name);
      isFavorite = false;
    } else {
      userService.addFavorite(session.name);
      isFavorite = true;
    }
  };
</script>

<IonPage route="sessiondetail" {ionViewWillEnter}>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button />
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button on:click={toggleFavorite}>
          <ion-icon
            style:visibility={!isFavorite ? "hidden" : "visible"}
            slot="icon-only"
            icon={starOutline}
          />
          <ion-icon
            style:visibility={isFavorite ? "hidden" : "visible"}
            slot="icon-only"
            icon={star}
          />
        </ion-button>
        <ion-button on:click={shareSession}>
          <ion-icon slot="icon-only" name="share" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <div class="ion-padding">
      <h1>{session.name}</h1>
      {#each session?.tracks as track}
        <span class={"session-track-" + track.toLowerCase()}>{track}</span>
      {/each}
      <p>{session.description}</p>
      <ion-text color="medium">
        {session.timeStart} &ndash; {session.timeEnd}
        <br />
        {session.location}
      </ion-text>
    </div>

    <ion-list>
      <ion-item
        on:click={() => {
          sessionClick("watch");
        }}
        button
      >
        <ion-label color="primary">Watch</ion-label>
      </ion-item>
      <ion-item
        on:click={() => {
          sessionClick("add to calendar");
        }}
        button
      >
        <ion-label color="primary">Add to Calendar</ion-label>
      </ion-item>
      <ion-item
        on:click={() => {
          sessionClick("mark as unwatched");
        }}
        button
      >
        <ion-label color="primary">Mark as Unwatched</ion-label>
      </ion-item>
      <ion-item
        on:click={() => {
          sessionClick("download video");
        }}
        button
      >
        <ion-label color="primary">Download Video</ion-label>
        <ion-icon slot="end" color="primary" size="small" name="cloud-download" />
      </ion-item>
      <ion-item
        on:click={() => {
          sessionClick("leave feedback");
        }}
        button
      >
        <ion-label color="primary">Leave Feedback</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</IonPage>

<style>
  .session-track-ionic {
    color: var(--ion-color-primary);
  }

  .session-track-angular {
    color: var(--ion-color-angular);
  }

  .session-track-communication {
    color: var(--ion-color-communication);
  }

  .session-track-tooling {
    color: var(--ion-color-tooling);
  }

  .session-track-services {
    color: var(--ion-color-services);
  }

  .session-track-design {
    color: var(--ion-color-design);
  }

  .session-track-workshop {
    color: var(--ion-color-workshop);
  }

  .session-track-food {
    color: var(--ion-color-food);
  }

  .session-track-documentation {
    color: var(--ion-color-documentation);
  }

  .session-track-navigation {
    color: var(--ion-color-navigation);
  }

  /* Favorite Icon
 * --------------------------------------------------------
 */

  .show-favorite {
    position: relative;
  }

  .icon-heart-empty,
  .icon-heart {
    --border-radius: 50%;
    --padding-start: 0;
    --padding-end: 0;

    position: absolute;

    top: 5px;
    right: 5px;

    width: 48px;
    height: 48px;

    font-size: 16px;

    transition: transform 300ms ease;
  }

  .icon-heart-empty {
    transform: scale(1);
  }

  .icon-heart {
    transform: scale(0);
  }

  .show-favorite .icon-heart {
    transform: scale(1);
  }

  .show-favorite .icon-heart-empty {
    transform: scale(0);
  }

  h1 {
    margin: 0;
  }
</style>
