<script lang="ts">
  import { popoverController } from "$lib/ionic/svelte";
  import PopoverPage from "./PopoverPage.svelte";

  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { ellipsisHorizontal } from "ionicons/icons";

  const location = "madison";
  const conferenceDate = "2047-05-17";

  const selectOptions = {
    header: "Select a Location",
  };
  const presentPopover = async (event) => {
    const popover = await popoverController.create({
      component: PopoverPage,
      event,
    });
    await popover.present();
  };
</script>

<IonPage route="about">
  <ion-content>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button
            on:click={(event) => {
              presentPopover(event);
            }}
          >
            <ion-icon slot="icon-only" icon={ellipsisHorizontal} />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="about-header">
      <!-- Instead of loading an image each time the select changes, use opacity to transition them  [ngStyle]="location === 'madison' && {'opacity': '1'}" -->
      <div class="about-image madison" />
      <div class="about-image austin" />
      <div class="about-image chicago" />
      <div class="about-image seattle" />
    </div>

    <div class="about-info">
      <h3 class="ion-padding-top ion-padding-start">About</h3>

      <p class="ion-padding-start ion-padding-end">
        The Ionic Conference is a one-day conference on {conferenceDate} featuring talks from the Ionic
        team. It is focused on Ionic applications being built with Ionic Framework. This includes migrating
        apps to the latest version of the framework, Angular concepts, Webpack, Sass, and many other
        technologies used in Ionic 2. Tickets are completely sold out, and we’re expecting more than
        1000 developers – making this the largest Ionic conference ever!
      </p>

      <h3 class="ion-padding-top ion-padding-start">Details</h3>

      <ion-list lines="none">
        <ion-item>
          <ion-label> Location </ion-label>
          <ion-select interfaceOptions={selectOptions}>
            <ion-select-option value="madison">Madison, WI</ion-select-option>
            <ion-select-option value="austin">Austin, TX</ion-select-option>
            <ion-select-option value="chicago">Chicago, IL</ion-select-option>
            <ion-select-option value="seattle">Seattle, WA</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item button="true" id="open-date-input">
          <ion-label> Date </ion-label>
          <ion-text slot="end">{conferenceDate}</ion-text>
          <ion-popover
            id="date-input-popover"
            trigger="open-date-input"
            showBackdrop="false"
            side="top"
            alignment="end"
          >
            <ion-datetime max="2056" presentation="date" />
          </ion-popover>
        </ion-item>
      </ion-list>

      <h3 class="ion-padding-top ion-padding-start">Internet</h3>

      <ion-list lines="none">
        <ion-item>
          <ion-label> Wifi network </ion-label>
          <ion-label class="ion-text-end">
            ica{conferenceDate}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label> Password </ion-label>
          <ion-label class="ion-text-end"> makegoodthings </ion-label>
        </ion-item>
      </ion-list>
    </div>
  </ion-content>
</IonPage>

<style>
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

  .about-header {
    position: relative;

    width: 100%;
    height: 30%;
  }

  .about-header .about-image {
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    opacity: 0;

    transition: opacity 500ms ease-in-out;
  }

  .about-header .madison {
    background-image: url(/assets/img/about/madison.jpg);
  }
  .about-header .austin {
    background-image: url(/assets/img/about/austin.jpg);
  }
  .about-header .chicago {
    background-image: url(/assets/img/about/chicago.jpg);
  }
  .about-header .seattle {
    background-image: url(/assets/img/about/seattle.jpg);
  }

  .about-info {
    position: absolute;
    margin-top: -10px;
    border-radius: 10px;
    background: var(--ion-background-color, #fff);
  }

  .about-info h3 {
    margin-top: 0;
  }

  .about-info ion-list {
    padding-top: 0;
  }

  .about-info p {
    line-height: 130%;

    color: var(--ion-color-dark);
  }

  .about-info ion-icon {
    margin-inline-end: 32px;
  }

  #date-input-popover {
    --offset-y: -var(--ion-safe-area-bottom);

    --max-width: 90%;
    --width: 336px;
  }

  /*
 * iOS Only
 */

  .ios .about-info {
    --ion-padding: 19px;
  }

  .ios .about-info h3 {
    font-weight: 700;
  }
</style>
