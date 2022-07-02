<script lang="ts">
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { conferenceService } from "$services/conference.service";
  import { actionSheetController } from "@ionic/core";
  import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

  import {
    logoTwitter,
    logoGithub,
    logoInstagram,
    callOutline,
    shareOutline,
  } from "ionicons/icons";

  let speaker;
  const inAppBrowser = new InAppBrowser();

  const ionViewWillEnter = () => {
    conferenceService.load().then((data: any) => {
      const speakerId = "sss"; // route.snapshot.paramMap.get('speakerId');
      if (data && data.speakers) {
        for (const speakerI of data.speakers) {
          if (speakerI && speakerI.id === speakerId) {
            speaker = speakerI;
            break;
          }
        }
      }
    });
  };

  const openExternalUrl = (url: string) => {
    inAppBrowser.create(url, "_blank");
  };

  const openSpeakerShare = async () => {
    const actionSheet = await actionSheetController.create({
      header: "Share " + speaker.name,
      buttons: [
        {
          text: "Copy Link",
          handler: () => {
            console.log("Copy link clicked on https://twitter.com/" + speaker.twitter);
            if ((window as any).cordova && (window as any).cordova.plugins.clipboard) {
              (window as any).cordova.plugins.clipboard.copy(
                "https://twitter.com/" + speaker.twitter
              );
            }
          },
        },
        {
          text: "Share via ...",
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });

    await actionSheet.present();
  };

  const openContact = async () => {
    const mode = "ios"; // config.get('mode');

    const actionSheet = await actionSheetController.create({
      header: "Contact " + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== "ios" ? "mail" : null,
          handler: () => {
            window.open("mailto:" + speaker.email);
          },
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== "ios" ? "call" : null,
          handler: () => {
            window.open("tel:" + speaker.phone);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });

    await actionSheet.present();
  };
</script>

<IonPage route="speakerdetail" {ionViewWillEnter}>
  <ion-content class="speaker-detail">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/app/tabs/speakers" />
        </ion-buttons>

        {#if speaker}
          <ion-buttons slot="end">
            <ion-button on:click={openContact}>
              <ion-icon slot="icon-only" icon={callOutline} />
            </ion-button>
            <ion-button on:click={openSpeakerShare}>
              <ion-icon slot="icon-only" icon={shareOutline} />
            </ion-button>
          </ion-buttons>
        {/if}
      </ion-toolbar>
    </ion-header>

    <div class="speaker-background">
      <img src={speaker?.profilePic} alt={speaker?.name} />
      <h2>{speaker?.name}</h2>
    </div>

    <div class="ion-padding speaker-detail">
      <p>{speaker?.about} Say hello on social media!</p>

      <hr />

      <ion-chip
        color="twitter"
        button
        on:click={() => {
          openExternalUrl("https://twitter.com/" + speaker.twitter);
        }}
      >
        <ion-icon icon={logoTwitter} />
        <ion-label>Twitter</ion-label>
      </ion-chip>

      <ion-chip
        color="dark"
        button
        on:click={() => {
          openExternalUrl("https://github.com/ionic-team/ionic");
        }}
      >
        <ion-icon icon={logoGithub} />
        <ion-label>GitHub</ion-label>
      </ion-chip>

      <ion-chip
        color="instagram"
        button
        on:click={() => {
          openExternalUrl("https://instagram.com/ionicframework");
        }}
      >
        <ion-icon icon={logoInstagram} />
        <ion-label>Instagram</ion-label>
      </ion-chip>
    </div>
  </ion-content>
</IonPage>

<style>
  /*
 * Speaker Background
 */

  ion-toolbar {
    position: absolute;

    top: 0;
    left: 0;
    right: 0;

    --background: transparent;
    --color: white;
  }

  ion-toolbar ion-button,
  ion-toolbar ion-back-button,
  ion-toolbar ion-menu-button {
    --color: white;
  }

  .speaker-background {
    position: relative;

    display: flex;

    padding-top: var(--ion-safe-area-top);

    align-items: center;
    justify-content: center;

    flex-direction: column;

    height: calc(250px + var(--ion-safe-area-top));

    background: center / cover url(/assets/img/speaker-background.png) no-repeat;
  }

  .speaker-background img {
    width: 70px;
    border-radius: 50%;
    margin-top: calc(-1 * var(--ion-safe-area-top));
  }

  .speaker-background h2 {
    position: absolute;

    bottom: 10px;

    color: white;
  }

  .md .speaker-background {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  }

  .ios .speaker-background {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 16px;
  }

  /*
 * Speaker Details
 */

  .speaker-detail p {
    margin-left: 6px;
    margin-right: 6px;
  }

  .speaker-detail hr {
    margin-top: 20px;
    margin-bottom: 20px;

    background: var(--ion-color-step-150, #d7d8da);
  }
</style>
