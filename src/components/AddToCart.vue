<template>
    <button data-bs-toggle="modal" data-bs-target="#miniCart" @click="addToCart" class="btn btn-primary">Add to cart</button>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex'
const store = useStore();
    const props = defineProps({
        name: String,
        price: String,
        productId: String,
        productImage: Array,
    })

    const item = reactive({
        productName : props.name,
        productImage : props.productImage,
        productPrice : props.price,
        productId: props.productId,
        productQty: 1,
    })
    
    const addToCart = () => {
        store.commit('addToCart', item)
    }
</script>

<style lang="scss" scoped>
</style>