<script lang="ts">
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { userService } from "$services/user.service";
  import { goto } from "@roxi/routify";

  let submitted = false;
  const username = { value: "", valid: true };
  const password = { valid: true };
  const form = { valid: true };
  const login = { username: "testuser" };

  const onLogin = () => {
    submitted = true;

    if (form.valid) {
      userService.login(login.username);

      $goto("/app/tabs/schedule");
    }
  };

  const onSignup = () => {
    $goto("/signup");
  };
</script>

<IonPage route="login">
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button />
      </ion-buttons>

      <ion-title>Login</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <div class="login-logo">
      <img src="assets/img/appicon.svg" alt="Ionic logo" />
    </div>

    <form novalidate>
      <ion-list>
        <ion-item>
          <ion-label position="stacked" color="primary">Username</ion-label>
          <ion-input name="username" type="text" spellcheck="false" autocapitalize="off" required />
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

      <ion-row>
        <ion-col>
          <ion-button on:click={onLogin} type="submit" expand="block">Login</ion-button>
        </ion-col>
        <ion-col>
          <ion-button on:click={onSignup} color="light" expand="block">Signup</ion-button>
        </ion-col>
      </ion-row>
    </form>
  </ion-content>
</IonPage>

<style>
  .login-logo {
    padding: 20px 0;
    min-height: 200px;
    text-align: center;
  }

  .login-logo img {
    max-width: 150px;
  }

  .list {
    margin-bottom: 0;
  }
</style>
