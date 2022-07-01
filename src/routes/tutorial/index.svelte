<script lang="ts">
  import { arrowForward } from "ionicons/icons";
  import { menuController } from "$ionic/svelte";
  import { userService } from "$services/user.service";
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { goto } from "@roxi/routify";

  import { Swiper, SwiperSlide } from "swiper/svelte";
  import "swiper/css";

  let slides: Swiper = undefined;
  let showSkip = true;

  const startApp = () => {
    userService.setSeenTutorial();
    $goto("/app/tabs/[tab]", { tab: "schedule" }); // { replaceUrl: true })
  };

  const setSwiperInstance = (swiper) => {
    slides = swiper;
  };

  const onSlideChangeStart = () => {
    showSkip = !slides.isEnd;
  };

  // ionViewWillEnter
  const ionViewWillEnter = async () => {
    const seenTutorial = await userService.didSeeTutorial();
    if (seenTutorial) {
      // navigate to app/tabs/schedule
    }
    menuController.enable(false);
  };

  const ionViewDidLeave = async () => {
    menuController.enable(true);
  };
</script>

<IonPage route="/tutorial" {ionViewWillEnter} {ionViewDidLeave}>
  <ion-header no-border>
    <ion-toolbar>
      <ion-buttons slot="end">
        <ion-button color="primary" on:click={startApp} hidden={!showSkip}>Skip</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content fullscreen="true" class="ion-padding">
    <Swiper
      slidesPerView={1}
      on:swiper={(event) => {
        setSwiperInstance(event.detail[0]);
      }}
      on:slideChangeTransitionStart={onSlideChangeStart}
    >
      <SwiperSlide>
        <div class="slide-container">
          <img src="/assets/img/ica-slidebox-img-1.png" class="slide-image" />
          <h2 class="slide-title">
            Welcome to
            <b>ICA</b>
          </h2>
          <p>
            The
            <b>ionic conference app</b> is a practical preview of the ionic framework in action, and
            a demonstration of proper code use.
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="slide-container">
          <img src="/assets/img/ica-slidebox-img-2.png" class="slide-image" />
          <h2 class="slide-title">What is Ionic?</h2>
          <p>
            <b>Ionic Framework</b> is an open source SDK that enables developers to build high quality
            mobile apps with web technologies like HTML, CSS, and JavaScript.
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="slide-container">
          <img src="/assets/img/ica-slidebox-img-3.png" class="slide-image" />
          <h2 class="slide-title">What is Ionic Appflow?</h2>
          <p>
            <b>Ionic Appflow</b> is a powerful set of services and features built on top of Ionic Framework
            that brings a totally new level of app development agility to mobile dev teams.
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="slide-container">
          <img src="/assets/img/ica-slidebox-img-4.png" class="slide-image" />
          <h2 class="slide-title">Ready to Play?</h2>
          <ion-button fill="clear" on:click={startApp}>
            Continue
            <ion-icon slot="end" icon={arrowForward} />
          </ion-button>
        </div>
      </SwiperSlide>
    </Swiper>
  </ion-content>
</IonPage>

<style>
  ion-toolbar {
    --background: transparent;
    --border-color: transparent;
  }

  .slide-title {
    margin-top: 2.8rem;
  }

  .slide-container {
    width: 100%;
  }

  .slide-image {
    max-height: 50% !important;
    max-width: 80% !important;
    margin: 5vh 0;
    pointer-events: none;
  }

  b {
    font-weight: 500;
  }

  p {
    padding: 0 40px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--ion-color-step-600, #60646b);
  }
</style>
