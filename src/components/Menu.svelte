<script lang="ts">
  import localforage from "localforage";
  import {
    hammer,
    personAdd,
    moonOutline,
    help,
    person,
    calendar,
    people,
    map,
    logOut,
    logIn,
    informationCircle,
  } from "ionicons/icons";
  import { menuController } from "$lib/ionic/svelte";

  let loggedIn = false;
  const appPages = [
    {
      title: "Schedule",
      url: "/app/tabs/schedule",
      icon: calendar,
    },
    {
      title: "Speakers",
      url: "/app/tabs/speakers",
      icon: people,
    },
    {
      title: "Map",
      url: "/app/tabs/map",
      icon: map,
    },
    {
      title: "About",
      url: "/app/tabs/about",
      icon: informationCircle,
    },
  ];

  const openTutorial = () => {
    menuController.enable(false);

    localforage.setItem("ion_did_tutorial", false);
    // router.navigateByUrl('/tutorial');
  };

  const logout = () => {};
</script>

<ion-menu contentId="main-content">
  <ion-content>
    <ion-list lines="none">
      <ion-list-header> Conference </ion-list-header>
      {#each appPages as p}
        <ion-menu-toggle autoHide="false">
          <ion-item on:click={console.log} detail="false">
            <ion-icon slot="start" icon={p.icon} />
            <ion-label>
              {p.title}
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
      {/each}
    </ion-list>

    {#if loggedIn}
      <ion-list lines="none">
        <ion-list-header> Account </ion-list-header>
        routerLink="/account" routerLinkActive="active" routerDirection="root"
        <ion-menu-toggle autoHide="false">
          <ion-item detail="false">
            <ion-icon slot="start" icon={person} />
            <ion-label> Account </ion-label>
          </ion-item>
        </ion-menu-toggle>
        routerLink="/support" routerLinkActive="active" routerDirection="root"
        <ion-menu-toggle autoHide="false">
          <ion-item detail="false">
            <ion-icon slot="start" icon={help} />
            <ion-label> Support </ion-label>
          </ion-item>
        </ion-menu-toggle>

        <ion-menu-toggle autoHide="false">
          <ion-item button on:click={logout} detail="false">
            <ion-icon slot="start" icon={logOut} />
            <ion-label> Logout </ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    {/if}

    {#if !loggedIn}
      <ion-list lines="none">
        <ion-list-header> Account </ion-list-header>

        <ion-menu-toggle autoHide="false">
          <ion-item
            routerLink="/login"
            routerLinkActive="active"
            routerDirection="root"
            detail="false"
          >
            <ion-icon slot="start" icon={logIn} />
            <ion-label> Login </ion-label>
          </ion-item>
        </ion-menu-toggle>

        <ion-menu-toggle autoHide="false">
          <ion-item
            routerLink="/support"
            routerLinkActive="active"
            routerDirection="root"
            detail="false"
          >
            <ion-icon slot="start" icon={help} />
            <ion-label> Support </ion-label>
          </ion-item>
        </ion-menu-toggle>

        <ion-menu-toggle autoHide="false">
          <ion-item
            routerLink="/signup"
            routerLinkActive="active"
            routerDirection="root"
            detail="false"
          >
            <ion-icon slot="start" icon={personAdd} />
            <ion-label> Signup </ion-label>
          </ion-item>
        </ion-menu-toggle>

        <ion-item>
          <ion-icon slot="start" icon={moonOutline} />
          <ion-label> Dark Mode [(ngModel)]="dark" </ion-label>
          <ion-toggle />
        </ion-item>
      </ion-list>
    {/if}
    <ion-list lines="none">
      <ion-list-header> Tutorial </ion-list-header>
      <ion-menu-toggle autoHide="false">
        <ion-item
          button
          on:click={() => {
            console.log("openTutorial");
          }}
          detail="false"
        >
          <ion-icon slot="start" icon={hammer} />
          <ion-label>Show Tutorial</ion-label>
        </ion-item>
      </ion-menu-toggle>
    </ion-list>
  </ion-content>
</ion-menu>
