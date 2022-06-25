<script lang="ts" context="module">
  import { Router, router } from "../.routify/instance.default.js";
  import { PWAStatus, pwaStatusStream } from "$lib/pwa";

  /* Theme variables */
  import "./theme/variables.css";
  import { onMount } from "svelte";
  import { menuController, toastController } from "@ionic/core";
  import localForage from "localforage";

  export const load = (url) => router.url.replace(url);

  pwaStatusStream.subscribe((status: PWAStatus) => {
    console.log("PWA status", status);

    if (status.updateFunction) {
      console.log("PWA updating itself in 4 secs......");
      setTimeout(() => {
        status.updateFunction();
      }, 4000);
    }
  });

  let loggedIn = false;
  let dark = false;

  onMount(async () => {
    checkLoginStatus();
    listenForLoginEvents();

    const toast = await toastController.create({
      message: "Update available!",
      position: "bottom",
      buttons: [
        {
          role: "cancel",
          text: "Reload",
        },
      ],
    });

    await toast.present();

    toast.onDidDismiss();
    //   .then(() => swUpdate.activateUpdate())
    //  .then(() => window.location.reload());
  });

  /*
 initializeApp() {
    platform.ready().then(() => {
      if (platform.is('hybrid')) {
        StatusBar.hide();
        SplashScreen.hide();
      }
    });
  }

  */

  const checkLoginStatus = () => {
    // return userData.isLoggedIn().then((loggedIn) => {
    return updateLoggedInStatus(loggedIn);
    // });
  };

  const updateLoggedInStatus = (loggedIn: boolean) => {
    setTimeout(() => {
      loggedIn = loggedIn;
    }, 300);
  };

  const listenForLoginEvents = () => {
    window.addEventListener("user:login", () => {
      updateLoggedInStatus(true);
    });

    window.addEventListener("user:signup", () => {
      updateLoggedInStatus(true);
    });

    window.addEventListener("user:logout", () => {
      updateLoggedInStatus(false);
    });
  };

  const logout = () => {
    //  userData.logout().then(() => {
    // return router.navigateByUrl('/app/tabs/schedule');
    //  });
  };
</script>

<Router {router} />

<style>
  ion-menu ion-content {
    --padding-top: 20px;
    --padding-bottom: 20px;

    --background: var(--ion-item-background, var(--ion-background-color, #fff));
  }

  /* Remove background transitions for switching themes */
  ion-menu ion-item {
    --transition: none;
  }

  ion-item.selected {
    --color: var(--ion-color-primary);
  }

  /*
 * Material Design Menu
*/
  ion-menu.md ion-list {
    padding: 20px 0;
  }

  ion-menu.md ion-list-header {
    padding-left: 18px;
    padding-right: 18px;

    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 450;
  }

  ion-menu.md ion-item {
    --padding-start: 18px;

    margin-right: 10px;

    border-radius: 0 50px 50px 0;

    font-weight: 500;
  }

  ion-menu.md ion-item.selected {
    --background: rgba(var(--ion-color-primary-rgb), 0.14);
  }

  ion-menu.md ion-item.selected ion-icon {
    color: var(--ion-color-primary);
  }

  ion-menu.md ion-list-header,
  ion-menu.md ion-item ion-icon {
    color: var(--ion-color-step-650, #5f6368);
  }

  ion-menu.md ion-list:not(:last-of-type) {
    border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
  }

  /*
 * iOS Menu
*/
  ion-menu.ios ion-list-header {
    padding-left: 16px;
    padding-right: 16px;

    margin-bottom: 8px;
  }

  ion-menu.ios ion-list {
    padding: 20px 0 0;
  }

  ion-menu.ios ion-item {
    --padding-start: 16px;
    --min-height: 50px;
  }

  ion-menu.ios ion-item ion-icon {
    font-size: 24px;
    color: #73849a;
  }

  ion-menu.ios ion-item.selected ion-icon {
    color: var(--ion-color-primary);
  }
</style>
