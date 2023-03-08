import { createStore } from "vuex";

let cart = window.localStorage.getItem('cart')
const store = createStore({
    state: {
        cart: cart ? JSON.parse(cart) : [],
    },
    mutations: {
        addToCart: (state, item) => {
            let found = state.cart.find(product => product.productId == item.productId)
            if (found) {
                found.productQty++;
            } else {
                state.cart.push(item);
            }
            store.commit('saveData')
        },
        saveData: (state) => {
            window.localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeFromCart: (state, item) => {
            let index = state.cart.indexOf(item);
            state.cart.splice(index, 1)
            store.commit('saveData')
        }
    },
    getters: {
        totalPrice: (state) => {
            let total = 0
            state.cart.filter((item) => {
                total += (parseInt(item.productPrice) * item.productQty)
            })
            return total;
        }
    },
    actions: {

    },
    modules: {

    }
})

export default store