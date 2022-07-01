<script lang="ts">
  import localforage from "localforage";
  import { hammer, calendar, people, map, logOut, informationCircle } from "ionicons/icons";
import { menuController } from "$lib/ionic/svelte";
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
</script>

<ion-menu contentId="main-content" > 

  <ion-content>
    <ion-list lines="none">
      <ion-list-header>
        Conference
      </ion-list-header>
     {#each appPages as p}
      <ion-menu-toggle autoHide="false" >
        <ion-item on:click={console.log}  detail="false">
          <ion-icon slot="start" icon={p.icon}></ion-icon>
          <ion-label>
            {{p.title}}
          </ion-label>
        </ion-item>
      </ion-menu-toggle>
      {/each}
    </ion-list>
   {#if loggedIn}
    <ion-list  lines="none">
      <ion-list-header>
        Account
      </ion-list-header>
      routerLink="/account" routerLinkActive="active" routerDirection="root"
      <ion-menu-toggle autoHide="false">
        <ion-item  detail="false">
          <ion-icon slot="start" icon={person}></ion-icon>
          <ion-label>
            Account
          </ion-label>
        </ion-item>
      </ion-menu-toggle>
      routerLink="/support" routerLinkActive="active" routerDirection="root" 
      <ion-menu-toggle autoHide="false">
        <ion-item detail="false">
          <ion-icon slot="start" icon={help}></ion-icon>
          <ion-label>
            Support
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

      <ion-menu-toggle autoHide="false">
        <ion-item button (click)="logout()" detail="false">
          <ion-icon slot="start" icon={logOut}></ion-icon>
          <ion-label>
            Logout
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

    </ion-list>
{/if}

{#if !loggedIn}
    <ion-list  lines="none">
      <ion-list-header>
        Account
      </ion-list-header>

      <ion-menu-toggle autoHide="false">
        <ion-item routerLink="/login" routerLinkActive="active" routerDirection="root" detail="false">
          <ion-icon slot="start" name="log-in"></ion-icon>
          <ion-label>
            Login
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

      <ion-menu-toggle autoHide="false">
        <ion-item routerLink="/support" routerLinkActive="active" routerDirection="root" detail="false">
          <ion-icon slot="start" name="help"></ion-icon>
          <ion-label>
            Support
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

      <ion-menu-toggle autoHide="false">
        <ion-item routerLink="/signup" routerLinkActive="active" routerDirection="root" detail="false">
          <ion-icon slot="start" name="person-add"></ion-icon>
          <ion-label>
            Signup
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

      <ion-item>
        <ion-icon slot="start" name="moon-outline"></ion-icon>
        <ion-label>
          Dark Mode
        </ion-label>
        <ion-toggle [(ngModel)]="dark"></ion-toggle>
      </ion-item>
    </ion-list>
{/if}
    <ion-list lines="none">
      <ion-list-header>
        Tutorial
      </ion-list-header>
      <ion-menu-toggle autoHide="false">
        <ion-item button on:click={()=>{console.log('openTutorial')}} detail="false">
          <ion-icon slot="start" icon={hammer}></ion-icon>
          <ion-label>Show Tutorial</ion-label>
        </ion-item>
      </ion-menu-toggle>
    </ion-list>
  </ion-content>

</ion-menu>
