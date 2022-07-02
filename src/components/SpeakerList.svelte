<script lang="ts">
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { conferenceService } from "$services/conference.service";

  let speakers = [];

  const ionViewDidEnter = async () => {
    speakers = await conferenceService.getSpeakers();
  };
</script>

<IonPage route="speakerlist" {ionViewDidEnter}>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button />
      </ion-buttons>
      <ion-title>Speakers</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Speakers</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-grid fixed>
      <ion-row>
        {#each speakers as speaker}
          <ion-col size="12" size-md="6">
            <ion-card class="speaker-card">
              <ion-card-header>
                <ion-item
                  detail="false"
                  lines="none"
                  class="speaker-item"
                  routerLink="/app/tabs/speakers/speaker-details/{speaker.id}"
                >
                  <ion-avatar slot="start">
                    <img src={speaker.profilePic} alt={speaker.name + " profile picture"} />
                  </ion-avatar>
                  <ion-label>
                    <h2>{speaker.name}</h2>
                    <p>{speaker.title}</p>
                  </ion-label>
                </ion-item>
              </ion-card-header>

              <ion-card-content>
                <ion-list lines="none">
                  {#each speaker.sessions as session}
                    <ion-item detail="false" routerLink="/app/tabs/speakers/session/{session.id}">
                      <ion-label>
                        <h3>{session.name}</h3>
                      </ion-label>
                    </ion-item>
                  {/each}
                  <ion-item
                    detail="false"
                    routerLink="/app/tabs/speakers/speaker-details/{speaker.id}"
                  >
                    <ion-label>
                      <h3>About {speaker.name}</h3>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        {/each}
      </ion-row>
    </ion-grid>
  </ion-content>
</IonPage>

<style>
  .speaker-card {
    display: flex;
    flex-direction: column;
  }

  /* Due to the fact the cards are inside of columns the margins don't overlap
 * properly so we want to remove the extra margin between cards
 */
  ion-col:not(:last-of-type) .speaker-card {
    margin-bottom: 0;
  }

  .speaker-card .speaker-item {
    --min-height: 85px;
  }

  .speaker-card .speaker-item h2 {
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .speaker-card .speaker-item p {
    font-size: 13px;
    letter-spacing: 0.02em;
  }

  .speaker-card ion-card-header {
    padding: 0;
  }

  .speaker-card ion-card-content {
    flex: 1 1 auto;

    padding: 0;
  }

  .ios ion-list {
    margin-bottom: 10px;
  }

  .md ion-list {
    border-top: 1px solid var(--ion-color-step-150, #d7d8da);

    padding: 0;
  }
</style>
