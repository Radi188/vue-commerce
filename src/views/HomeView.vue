<script setup>
import HeroView from '../components/HeroView.vue';
import ProductView from '../components/ProductView.vue'
import Navbar from '../components/Navbar.vue';
import Login from '../components/Login.vue';
import { Store } from 'vuex';
import store from '../store';
import MiniCart from '../components/miniCart.vue';
</script>

<template>
  <div>
    <Navbar />
  <HeroView />
  <ProductView />
  <div class="container h-100">
    <div class="row p-5 h-100 justify-content-center align-items-center">
      <div class="col-md-6">
        <img src="/img/svg/products.svg" alt="..." width="400" >
      </div>
      <div class="col-md-6">
        <h3>Learn More About us</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, animi recusandae. Tenetur sed possimus illum?</p>
        <button class="btn custom-btn btn-outline-primary me-4">Browse Product</button>
      </div>
    </div>
  </div>
  <login />
  <MiniCart />
  
  </div>
  
</template>
