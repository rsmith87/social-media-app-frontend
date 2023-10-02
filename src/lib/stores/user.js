// store.js
import { writable } from "svelte/store";
import { browser } from "$app/environment";

let userStore = "";
let initialValue = browser ? window.localStorage.getItem('user') ?? userStore : userStore;
if(browser && userStore !== "") {
   localStorage.setItem('user', userStore)
}

export const user = writable(userStore);
