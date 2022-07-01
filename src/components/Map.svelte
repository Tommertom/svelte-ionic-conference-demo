<script lang="ts">
  import IonPage from "$lib/ionic/svelte/components/IonPage.svelte";
  import { darkStyle } from "$services/map-dark-style";
  import { conferenceService } from "$services/conference.service";

  let mapElement;
  const ionViewDidEnter = async () => {
    const appEl = document.querySelector("ion-app");
    let isDark = false;
    let style = [];
    if (appEl.classList.contains("dark-theme")) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps("YOUR_API_KEY_HERE");

    let map;
    const mapData = await conferenceService.getMap();
    const mapEle = mapElement.nativeElement;
    map = new googleMaps.Map(mapEle, {
      center: mapData.find((d: any) => d.center),
      zoom: 16,
      styles: style,
    });

    mapData.forEach((markerData: any) => {
      const infoWindow = new googleMaps.InfoWindow({
        content: `<h5>${markerData.name}</h5>`,
      });

      const marker = new googleMaps.Marker({
        position: markerData,
        map,
        title: markerData.name,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });

    googleMaps.event.addListenerOnce(map, "idle", () => {
      mapEle.classList.add("show-map");
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains("dark-theme");
          if (map && isDark) {
            map.setOptions({ styles: darkStyle });
          } else if (map) {
            map.setOptions({ styles: [] });
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true,
    });
  };

  const getGoogleMaps = (apiKey: string): Promise<any> => {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const googleModule2 = win.google;
        if (googleModule2 && googleModule2.maps) {
          resolve(googleModule2.maps);
        } else {
          reject("google maps not available");
        }
      };
    });
  };
</script>

<IonPage route="/tabs/map" {ionViewDidEnter}>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button />
      </ion-buttons>
      <ion-title>Map</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <div bind:this={mapElement} class="map-canvas" />
  </ion-content>
</IonPage>

<style>
  .map-canvas {
    position: absolute;

    height: 100%;
    width: 100%;

    background-color: transparent;

    opacity: 0;
    transition: opacity 150ms ease-in;
  }

  .show-map {
    opacity: 1;
  }
</style>
