<template>
    <div class="modal fade w-100" id="miniCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">My Cart</h5>
          <button type="button" id="closeModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            
            <div v-for="item in store.state.cart" class="d-flex align-items-start justify-content-lg-start">
              <div class="d-flex justify-content-lg-start border-1 border-bottom-1 border-dark">
                <img :src="item.productImage[0]" alt="" width="200" height="100">
                <div class="flex-column me-5">
                    <p class=" text-truncate" style="max-width: 200px;">{{ item.productName }}</p>
                    <p><b>&dollar;{{ item.productPrice }}</b></p>
                    <p><b>Quantity : {{ item.productQty }}</b></p>
              </div>
              </div>
              <button @click="store.commit('removeFromCart', item)" type="button" class="btn-close float-end"></button>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue Shopping</button>
          <button @click="checkout" class="btn btn-primary" >Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import store from '../store';

const router = useRouter();
    const checkout = () => {
        document.getElementById('closeModal').click();
        router.push('/checkout')
    }
</script>

<style lang="scss" scoped>

</style>