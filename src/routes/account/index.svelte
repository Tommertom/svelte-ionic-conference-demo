<script lang="ts">
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";

  import { userService, currentUser } from "$services/user.service";
  import { alertController } from "@ionic/core";
  import { goto } from "@roxi/routify";

  const changePassword = () => {
    console.log("Clicked to change password");
  };

  const logout = () => {
    userService.logout();
    $goto("/login");
  };

  const support = () => {
    $goto("/support");
  };

  const updatePicture = () => {
    console.log("Clicked to change password");
  };

  const changeUsername = async () => {
    const alert = await alertController.create({
      header: "Change Username",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: (data: any) => {
            userService.login(data.username);
            //   this.getUsername();
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "username",
          value: $currentUser.username,
          placeholder: "username",
        },
      ],
    });
    await alert.present();
  };
</script>

<IonPage route="account">
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button />
      </ion-buttons>
      <ion-title>Account</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    {#if $currentUser.username}
      <div class="ion-padding-top ion-text-center">
        <img src="https://www.gravatar.com/avatar?d=mm&s=140" alt="avatar" />
        <h2>{$currentUser.username}</h2>

        <ion-list inset>
          <ion-item on:click={updatePicture}>Update Picture</ion-item>
          <ion-item on:click={changeUsername}>Change Username</ion-item>
          <ion-item on:click={changePassword}>Change Password</ion-item>
          <ion-item on:click={support}>Support</ion-item>
          <ion-item on:click={logout}>Logout</ion-item>
        </ion-list>
      </div>
    {/if}
  </ion-content>
</IonPage>

<style>
  img {
    max-width: 140px;
    border-radius: 50%;
  }
</style>
