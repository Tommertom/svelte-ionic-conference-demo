<script lang="ts">
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { alertController, toastController } from "@ionic/core";

  let submitted = false;
  let supportMessage: string;
  let submitForm;

  // we don't implement form validation here - Svelte does not prescribe a specific library/method
  const supportQuestion = { valid: true };
  const form = { valid: true };

  const ionViewDidEnter = async () => {
    const toast = await toastController.create({
      message: "This does not actually send a support request.",
      duration: 3000,
    });
    await toast.present();
  };

  const submit = async () => {
    submitted = true;

    if (form.valid) {
      supportMessage = "";
      submitted = false;

      const toast = await toastController.create({
        message: "Your support request has been sent.",
        duration: 3000,
      });
      await toast.present();
    }
  };
</script>

<IonPage route="support">
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button />
      </ion-buttons>
      <ion-title>Support</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <div class="support-logo">
      <img src="assets/img/appicon.svg" alt="Ionic Logo" />
    </div>

    <form bind:this={submitForm} novalidate>
      <ion-list lines="none">
        <ion-item>
          <ion-label position="stacked" color="primary">Enter your support message below</ion-label>
          <ion-textarea name="supportQuestion" rows="6" required />
        </ion-item>
      </ion-list>

      <ion-text color="danger">
        <p hidden={supportQuestion.valid || submitted === false} class="ion-padding-start">
          Support message is required
        </p>
      </ion-text>

      <div class="ion-padding">
        <ion-button expand="block" type="submit" on:click={submit}>Submit</ion-button>
      </div>
    </form>
  </ion-content>
</IonPage>

<style>
  .support-logo {
    padding: 20px 0;
    min-height: 200px;
    text-align: center;
  }

  .support-logo img {
    max-width: 150px;
  }

  .list {
    margin-bottom: 0;
  }
</style>
