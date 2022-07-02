<script lang="ts">
  import { modalController } from "$lib/ionic/svelte";

  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { isPlatform } from "$lib/ionic/svelte/platform";
  import { conferenceService } from "$services/conference.service";

  let ios = isPlatform("ios");

  interface Track {
    name: string;
    icon: string;
    isChecked: boolean;
  }
  let tracks: Track[] = [];
  let excludeTracks = [];
  let excludedTrackNames = [];

  const dismiss = (data?: any) => {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    modalController.dismiss(data);
  };

  const applyFilters = () => {
    const excludedTrackNames = this.tracks.filter((c) => !c.isChecked).map((c) => c.name);
    this.dismiss(excludedTrackNames);
  };

  const ionViewWillEnter = async () => {
    // const excludedTrackNames = this.navParams.get('excludedTracks');
    conferenceService.getTracks().then((tracks: any[]) => {
      tracks.forEach((track) => {
        this.tracks.push({
          name: track.name,
          icon: track.icon,
          isChecked: excludedTrackNames.indexOf(track.name) === -1,
        });
      });
    });
  };

  const selectAll = (check: boolean) => {
    // set all to checked or unchecked
    tracks.forEach((track) => {
      track.isChecked = check;
    });
  };
</script>

<IonPage route="/tabs/schedulefilter" {ionViewWillEnter}>
  <ion-header translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        {#if ios}
          <ion-button on:click={dismiss}>Cancel</ion-button>
        {:else}
          <ion-button
            on:click={() => {
              selectAll(false);
            }}>Reset</ion-button
          >
        {/if}
      </ion-buttons>

      <ion-title> Filter Sessions </ion-title>

      <ion-buttons slot="end">
        <ion-button on:click={applyFilters} strong>Done</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list lines={ios ? "inset" : "full"}>
      <ion-list-header>Tracks</ion-list-header>

      {#each tracks as track}
        <ion-item>
          {#if ios}
            <ion-icon slot="start" icon={track.icon} color="medium" />
          {/if}
          <ion-label>{track.name}</ion-label>
          <ion-checkbox />
        </ion-item>
      {/each}
    </ion-list>
  </ion-content>

  {#if ios}
    <ion-footer translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button
            on:click={() => {
              selectAll(false);
            }}>Deselect All</ion-button
          >
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button
            on:click={() => {
              selectAll(true);
            }}>Select All</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  {/if}
</IonPage>

<style>
  /*
 * Material Design
 */

  .md ion-toolbar ion-button {
    text-transform: capitalize;
    letter-spacing: 0;
  }

  .md ion-checkbox {
    --background-checked: transparent;
    --border-color: transparent;
    --border-color-checked: transparent;
    --checkmark-color: var(--ion-color-primary);
  }

  .md ion-list {
    background: inherit;
  }

  /*
 * iOS
 */

  .ios ion-list-header {
    margin-top: 10px;
  }

  .ios ion-label {
    color: var(--ion-color-primary);
  }
</style>
