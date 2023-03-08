<template>
    <div class="checkout">
        <Navbar />
        <div class="container mt-5 pt-5">
            <div class="row"> 
                <div class="col-md-9">
                    <h4> Checkout Page</h4>
                    <div v-for="item in store.state.cart" class="d-flex justify-content-lg-start mt-5" >
                    <div class="d-flex justify-content-lg-start border-1 border-bottom-1 border-dark">
                        <img :src="item.productImage[0]" alt="" width="200" height="100" class="me-5">
                        <div class="flex-column">
                            <p class=" text-truncate" style="max-width: 200px;">{{ item.productName }}</p>
                            <p><b>&dollar;{{ item.productPrice }}</b></p>
                            <p><b>Quantity : {{ item.productQty }}</b></p>
                    </div>
                    </div>
                    <button @click="store.commit('removeFromCart', item)" type="button" class="btn-close float-end"></button>
                    </div>
                </div>
                <div class="col-md-3">
                    <h5>
                        Total Price : &dollar;{{ store.getters.totalPrice }}
                    </h5>
                    <Card class='stripe-card'
                        :class='{ complete }'
                        stripe='pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'
                        />
                        <button class='pay-with-stripe btn btn-primary mt-4' @click='pay' :disabled='!complete'>Pay with credit card</button>
                </div>
                <div class="col-md-4">
                    
                </div>
            </div>

        </div>
    </div>
    
</template>

<script setup>
    import Navbar from '../components/Navbar.vue';
    import store from '../store';
    import {Card} from 'vue-stripe-elements-plus'
import { ref } from 'vue';

    const complete = ref(false)
</script>

<style>
.StripeElement {
  box-sizing: border-box;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}
.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}
.StripeElement--invalid {
  border-color: #fa755a;
}
.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>