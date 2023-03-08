<template>
    <div class="products" id="products">
        <div class="container">
            <h1 class="text-center p-5">Our products</h1>
            <div class="row">
                <div class="col-md-4 mb-4 " v-for="product in products" :key="product.id" >
                    <div class="card pordudct-item">
                        <Swiper
                        :navigation="true"
                        :pagination="true"
                        :modules="modules">
                            <SwiperSlide v-for="image in product.data().images" :key="image">
                                <img :src="image" class="card-img-top" alt="...">
                            </SwiperSlide>
                        </Swiper>
                        <div class="card-body">
                            <h5 class="card-title">{{ product.data().name }}</h5>
                            <div class="d-flex">
                                <p v-for="tag in product.data().tags">
                                    <span class="me-2 p-1 btn btn-dark"> {{ tag }} </span>
                                </p>
                            </div>
                            <p><b>&dollar;{{ product.data().price }}</b></p>
                            <AddToCart 
                                :name="product.data().name"
                                :price="product.data().price"
                                :productId="product.id"
                                :productImage="product.data().images"
                                >
                            </AddToCart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import 'swiper/css';
import { ref } from 'vue';
import { getProducts } from '@/firebase'
import { Swiper, SwiperSlide, } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AddToCart from './AddToCart.vue';

const products = ref([])

const getData = async () => {
    const data = await getProducts();
    return products.value = data;
}
getData();
modules: [Navigation]
</script>

<style lang="scss" scoped>
img {
    width: 90%;
    height: 200px;
}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>