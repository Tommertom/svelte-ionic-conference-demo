
<h1 align="center"> Ionic Svelte Demo - CONFERENCE</h1> <br>
<p align="center">
  <a href="https://ionicsvelte.firebaseapp.com">
    <img alt="IonicSvelte" title="IonicSvelte" src="https://github.com/Tommertom/svelte-ionic-app/raw/master/src/static/assets/svelte-ionic-vite.png" width="350">
  </a>
</p>
<br>
<p align="center">
  A showcase app for Ionic. Supercharged by Svelte and Vite.
</p>
<br>

N.B. some things not implemented/migrated from Ionic's starter:
- Form validation - you need to choose your own way/library to do so
- Google maps - fill in your own API key!
- Menu not working
- some other stuff

Honestly, I am not too sure if this starter (also looking at the Angular version) - really is a great starter to look at. To me there are too many things going on which do not make up a great app - like the state management (as an example). So this starter will remain very buggy - I just don't see the point spending much time making it better without making very opinionated choices. These you might be better off making your own choices here.

Feel free to PR though - even if it is something small and to beef up your github profile :)


# Ionic Svelte Conference starter
A starter app for all Ionic UI elements - based on Ionic's Conference Starter

Install this starter:
```bash
git clone https://github.com/Tommertom/svelte-ionic-blank-conference.git 
cd svelte-ionic-blank-list
npm i
npm run dev
```

Please note - there is no form validation implemented. There is a truckload of options here, so I don't want to prescribe one upfront.

## All starters
* Blank demo - https://github.com/Tommertom/svelte-ionic-blank-demo
* Tabs demo - https://github.com/Tommertom/svelte-ionic-tabs-demo
* Sidemenu demo - https://github.com/Tommertom/svelte-ionic-sidemenu-demo
* Mystarter demo - taking photo with Capacitor - https://github.com/Tommertom/svelte-ionic-mystarter-demo
* List demo - https://github.com/Tommertom/svelte-ionic-list-demo
* Conference demo - https://github.com/Tommertom/svelte-ionic-conference-demo

And the official demo app - https://github.com/Tommertom/svelte-ionic-app

  
## PWA Interface - easing the PWA work in your app
To help you managing state of the service worker and the various events, a simple svelte store is provided for (`lib/pwa.ts`). This store wraps the various events of the service worker in a readable store and a number of derived stores so you can easily listen to various events.

While most tutorials provide you the basics to do all these separately and in an "Hello world" fashion, having all in a store helps wiring things up to the UI across various places in the code. 

The following derived stores are implemented:
- `needRefresh`:`boolean` telling you if there is an update available
- `updateObject`:`undefined|UpdateObject`. When UpdateObject is provided, you can call its `updateSWObject()` method to update the app
- `offlineReady`:`boolean` telling you all offline assets have been loaded
- `registerError`:`any` - the error message when the registration of the service worker failed
- `registration`:`undefined|ServiceWorkerRegistration` - the service worker registration object - when succesfull
- `beforeInstallPrompt` - `undefined|BeforeInstallPromptEvent` - which you can use to fire the `.prompt()` method to invoke the install prompt. N.B. this needs to happen right after an userevent (like button press)!

All these props are also available via the `pwaStatusStream` readable store.

## Roxi Routify 3
This code uses Roxi's newest version of its router. See https://v3.ci.routify.dev/docs#guide to know more. By the time of this writing, this is actually still in beta. If you want to change router, please make sure you change the hooks in IonPage.svelte (part of `$ionic/svelte/components/IonPage.svelte`).

# Issues - work in progress and acknowledgments
Please refer to the README on the main repo - https://github.com/Tommertom/svelte-ionic-app