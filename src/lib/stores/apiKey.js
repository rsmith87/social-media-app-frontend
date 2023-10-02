import { writable } from "svelte/store";
import { browser } from "$app/environment";

let apiStore = '';

if ( browser ) {
	apiStore = sessionStorage.getItem('apiKey');
}

export const apiKey = writable(apiStore);