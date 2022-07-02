<script lang="ts">
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { userService } from "$services/user.service";
  import { goto } from "@roxi/routify";

  let signupForm;
  let submitted = false;
  const username = { value: "", valid: true };
  const password = { valid: true };
  const form = { valid: true };

  interface UserOptions {
    username: string;
    password: string;
  }

  let signup: UserOptions = { username: "", password: "" };

  const onSignup = () => {
    submitted = true;

    if (form.valid) {
      userService.signup(signup.username);

      $goto("/app/tabs/schedule");
    }
  };

  const usernameInput = (event) => {
    console.log("event");
    username.value = event.detail.value;
  };

  const stuff = (ss) => {
    console.log("sss", ss);
    return {
      destroy() {
        // the node has been removed from the DOM
        console.log("DESTROY input");
      },
    };
  };
</script>

<IonPage route="signup">
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button />
      </ion-buttons>
      <ion-title>Signup</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <div class="signup-logo">
      <img src="assets/img/appicon.svg" alt="Ionic Logo" />
    </div>

    <form novalidate bind:this={signupForm}>
      <ion-list lines="none">
        <ion-item>
          <ion-label position="stacked" color="primary">Username</ion-label>
          <ion-input on:ionInput={usernameInput} use:stuff name="username" type="text" required />
        </ion-item>
        <ion-text color="danger">
          <p hidden={username.valid || submitted === false} class="ion-padding-start">
            Username is required
          </p>
        </ion-text>

        <ion-item>
          <ion-label position="stacked" color="primary">Password</ion-label>
          <ion-input name="password" type="password" required />
        </ion-item>
        <ion-text color="danger">
          <p hidden={password.valid || submitted === false} class="ion-padding-start">
            Password is required
          </p>
        </ion-text>
      </ion-list>

      <div class="ion-padding">
        <ion-button on:click={onSignup} type="submit" expand="block">Create</ion-button>
      </div>
    </form>
  </ion-content>
</IonPage>

<style>
  .signup-logo {
    padding: 20px 0;
    min-height: 200px;
    text-align: center;
  }

  .signup-logo img {
    max-width: 150px;
  }

  .list {
    margin-bottom: 0;
  }
</style>
