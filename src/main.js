import { createApp, VueElement } from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2'
import 'vue3-carousel/dist/carousel.css'
import Vuex from 'vuex'
import store from "./store.js";

window.Swal = Swal;
window.$ = window.jQuery = jQuery;

import 'popper.js';
import 'bootstrap';
import '../src/assets/app.scss'
import "./assets/main.css";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyA6TnphlMv6S6wchlKuVKTsszR4aKTWy5I",
    authDomain: "vue-commerce-4769f.firebaseapp.com",
    projectId: "vue-commerce-4769f",
    storageBucket: "vue-commerce-4769f.appspot.com",
    messagingSenderId: "481044892739",
    appId: "1:481044892739:web:3fe57c6de4bd13717bd8f6",
    measurementId: "G-J63HYM2LN5"
};
initializeApp(firebaseConfig);
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})
window.Toast = Toast
const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.mount("#app");
