<template>
<nav class=" navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="/">Vue-Commerce</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class=" collapse navbar-collapse justify-content-between flex-row " id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li clrouter-linkss="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <form class="input-group-text">
          <input class="form-control me-sm-2" type="search" placeholder="Search" aria-label="Search">
          <a class="btn btn-outline-success my-2 my-sm-0" data-bs-toggle="modal" data-bs-target="#login">Get Started</a>
          <a class="btn btn-outline-success my-2 my-sm-0" data-bs-toggle="modal" data-bs-target="#miniCart">My Cart</a>
      </form>
    </div>
</div>
</nav>
</template>

<script setup>
import Login from './Login.vue';
</script>