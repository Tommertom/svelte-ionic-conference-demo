<script lang="ts">
  import { popoverController } from "$lib/ionic/svelte";

  const support = () => {
    // this.app.getRootNavs()[0].push('/support');
    popoverController.dismiss();
  };

  const close = (url: string) => {
    window.open(url, "_blank");
    popoverController.dismiss();
  };
</script>

<ion-list>
  <ion-item
    button
    on:click={() => {
      close("https://ionicframework.com/getting-started");
    }}
  >
    <ion-label>Learn Ionic</ion-label>
  </ion-item>
  <ion-item
    button
    on:click={() => {
      close("https://ionicframework.com/docs/");
    }}
  >
    <ion-label>Documentation</ion-label>
  </ion-item>
  <ion-item
    button
    on:click={() => {
      close("https://showcase.ionicframework.com");
    }}
  >
    <ion-label>Showcase</ion-label>
  </ion-item>
  <ion-item
    button
    on:click={() => {
      close("https://github.com/ionic-team/ionic");
    }}
  >
    <ion-label>GitHub Repo</ion-label>
  </ion-item>
  <ion-item button on:click={support}>
    <ion-label>Support</ion-label>
  </ion-item>
</ion-list>
