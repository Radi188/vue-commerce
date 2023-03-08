<template>
    <div class="admin">
        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
          <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
              <i class="fas fa-bars"></i>
          </a>
          <nav id="sidebar" class="sidebar-wrapper">
              <div class="sidebar-content">
                  <div class="sidebar-item sidebar-brand">
                      <a href="/">Vue-Commerce</a>
                      <div id="close-sidebar" @click="closeMenu">
                          <i class="fas fa-times"></i>
                      </div>
                  </div>
                  <div class="sidebar-item sidebar-header">
                      <div class="user-pic">
                          <img class="img-responsive img-rounded" src="/img/user.png" alt="User picture">
                      </div>
                      <div class="user-info">
                          <span class="user-name">Rady
                              <strong>Hak</strong>
                          </span>
                          <span class="user-role">{{ email }}</span>
                          <span class="user-status">
                              <i class="fa fa-circle"></i>
                              <span>Online</span>
                          </span>
                      </div>
                  </div>
                  <div class="sidebar-item sidebar-search">
                      <div>
                          <div class="input-group">
                              <input type="text" class="form-control search-menu" placeholder="Search...">
                              <button class="search-menu"><i class="fa fa-search"></i></button>
                          </div>
                      </div>
                  </div>
                  <div class=" sidebar-item sidebar-menu">
                      <ul>
                          <li class="header-menu">
                              <span>Menu</span>
                          </li>
  
                          <li>
                              <router-link to="/admin/overview">
                                  <i class="fa fa-chart-line"></i>
                                  <span>Overview</span>
                              </router-link>
                          </li>
                          <li>
                              <router-link to="/admin/products">
                                  <i class="fab fa-amazon"></i>
                                  <span>Products</span>
                              </router-link>
                          </li>
                          <li>
                              <router-link to="/admin/orders">
                                  <i class="fa fa-shopping-cart"></i>
                                  <span>Orders</span>
                              </router-link>
                          </li>
  
                          <li>
                              <router-link to="/admin/profile">
                                  <i class="fa fa-user"></i>
                                  <span>Profile</span>
                              </router-link>
                          </li>
                          <li>
                              <router-link to="#" @click="logout">
                                  <i class="fa fa-power-off"></i>
                                  <span>Logout</span>
                              </router-link>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
          <main class="page-content">
            <router-view />
          </main>
      </div>
    </div>
    
</template>

<script setup>
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { ref } from 'vue';
import { onMounted } from "vue";
    const router = useRouter();
    const auth = getAuth();
const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  const uid = user.uid;
  const isLogin = ref(false);
  const logout = () => {
        signOut(auth).then(() => {
            router.push('/');
        })
    }
</script>