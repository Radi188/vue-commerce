<template>
<div class="modal fade" id="login" tabindex="-1" aria-labelledby="loginLabel" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" id="close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-register-tab" data-bs-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
            </li>
        </ul>

        <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
            
            <h5 class="text-center">Login Please</h5>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1" >Password</label>
                <input type="password" @keyup.enter="login" v-model="password" class="form-control mb-3 " id="exampleInputPassword1" placeholder="Password">
            </div>

                <div class="form-group">
                <button class="btn btn-primary" @click="login">Login</button>
                
            </div>

        </div>
        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                <h5 class="text-center">Create New Account</h5>
            <div class="form-group">
                <label for="name">Your name</label>
                <input type="text" v-model="name" class="form-control" id="name" placeholder="Your nice name">
            </div>

            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-group">
                <button class="btn btn-primary mt-4" @click="register">Signup</button>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { addUserId } from '@/firebase'
import {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core';

const router = useRouter();
 const name = ref('')
 const email = ref('')
 const password = ref('')
 const auth = getAuth();
 const isLogged = ref(false) 
 
onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
        isLogged.value = true;
    }else {
        isLogged.value = false;
    }
  })
})

 const login = () => {
    signInWithEmailAndPassword( auth ,email.value,password.value).then((data) => {
        document.getElementById('close').click();
        router.push('/admin')
    }).catch(error => {
        console.log(error.code)
        alert(error.message)
    })
 }

 const register = () => {
    createUserWithEmailAndPassword( auth ,email.value,password.value).then((data) => {
        addUserId(data.user.uid ,name.value)
        router.push('/')
    }).catch(error => {
        console.log(error.code)
        alert(error.message)
    })
 }
</script>

<style lang="scss" scoped>

</style>