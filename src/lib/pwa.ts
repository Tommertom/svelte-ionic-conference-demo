import { readable, derived } from 'svelte/store';
import { registerSW } from 'virtual:pwa-register'

export interface PWAStatus {
    needRefresh: boolean;
    offlineReady: boolean;
    registerError: any
    registration: ServiceWorkerRegistration;
    beforeInstallPrompt: any; // BeforeInstallPromptEvent ??
    updateFunction: any;
}

const emptyStatus: PWAStatus = {
    needRefresh: false,
    offlineReady: false,
    registerError: undefined,
    registration: undefined,
    beforeInstallPrompt: undefined,
    updateFunction: undefined
}

export const pwaStatusStream = readable(emptyStatus, (set) => {
    let status: PWAStatus = emptyStatus;

    if (typeof navigator !== undefined) {
        const updateSWObject = registerSW({
            onNeedRefresh() {
                //    console.log('PWA App needs refresh');
                status.needRefresh = true;
                status.updateFunction = updateSWObject;  // use updateFunction() to update
                set(status);
            },
            onOfflineReady() {
                //  console.log('PWA Offline ready');
                status.offlineReady = true;
                set(status);
            },
            onRegisterError(error) {
                //  console.log('PWA error', error);
                status.registerError = error;
                set(status);
            },
            onRegistered(registration) {
                //  console.log('PWA registration', registration);
                status.registration = registration;
                set(status);
            }
        })
    }
    const beforeinstallpromptHandler = (e) => {
        //  console.log('PWA beforeinstallprompt fired', e)
        status.beforeInstallPrompt = e;
        set(status);
    }
    window.addEventListener("beforeinstallprompt", beforeinstallpromptHandler);
    // destructor
    return () => {
        window.removeEventListener("beforeinstallprompt", beforeinstallpromptHandler);
    }
})

export const pwaNeedRefresh = derived(pwaStatusStream, (updateObject) => updateObject.needRefresh);
export const pwaOfflineReady = derived(pwaStatusStream, (updateObject) => updateObject.offlineReady);
export const pwaRegisterError = derived(pwaStatusStream, (updateObject) => updateObject.registerError);
export const pwaRegistration = derived(pwaStatusStream, (updateObject) => updateObject.registration);
export const pwaBeforeInstallPrompt = derived(pwaStatusStream, (updateObject) => updateObject.beforeInstallPrompt);
export const pwaUpdateObject = derived(pwaStatusStream, (updateObject) => updateObject.updateFunction);
export const pwaHasUpdate = derived(pwaStatusStream, (updateObject) => updateObject.updateFunction !== undefined);
