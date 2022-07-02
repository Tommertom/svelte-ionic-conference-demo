import { writable, derived } from "svelte/store";

import localforage from "localforage";

export interface User {
    username: string;
    //  loggedIn: boolean;
}

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const favorites: string[] = [];

const store = writable<User>({ username: 'testuser' });

export const currentUser = derived(store, ($store) => $store);
const isLoggedIn = derived(currentUser, ($currentuser) => $currentuser !== undefined)


const setSeenTutorial = () => {
    localforage.setItem('ion_did_tutorial', true);
}

const didSeeTutorial = (): Promise<boolean> => {
    return localforage.getItem('ion_did_tutorial');
}

const hasFavorite = (sessionName: string): boolean => {
    return (favorites.indexOf(sessionName) > -1);
}

const addFavorite = (sessionName: string): void => {
    favorites.push(sessionName);
}

const removeFavorite = (sessionName: string): void => {
    const index = favorites.indexOf(sessionName);
    if (index > -1) {
        favorites.splice(index, 1);
    }
}

const login = (username: string): Promise<any> => {
    return localforage.setItem(HAS_LOGGED_IN, true).then(() => {
        store.set({ username })
    });
}

const signup = (username: string): Promise<any> => {
    return localforage.setItem(HAS_LOGGED_IN, true).then(() => {
        store.set({ username })
    });
}

const logout = (): Promise<any> => {
    return localforage.removeItem(HAS_LOGGED_IN).then(() => {
        store.set(undefined)
    });
}

export const userService = {
    didSeeTutorial, setSeenTutorial,
    // currentUser,
    hasFavorite, addFavorite, removeFavorite,
    login, signup, logout, isLoggedIn
}