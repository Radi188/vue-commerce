import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc, } from 'firebase/firestore'
import { callWithAsyncErrorHandling, onMounted, ref } from "vue";
const firebaseConfig = {
    apiKey: "AIzaSyA6TnphlMv6S6wchlKuVKTsszR4aKTWy5I",
    authDomain: "vue-commerce-4769f.firebaseapp.com",
    projectId: "vue-commerce-4769f",
    storageBucket: "vue-commerce-4769f.appspot.com",
    messagingSenderId: "481044892739",
    appId: "1:481044892739:web:3fe57c6de4bd13717bd8f6",
    measurementId: "G-J63HYM2LN5"
};

export const fb = initializeApp(firebaseConfig);
export const db = getFirestore(fb)
const productCollection = collection(db, 'products')
const profileCollection = collection(db, 'profiles')


export const addUserId = async (userId, thisName) => {
    return await setDoc(doc(db, 'profiles', userId), {
        name: thisName
    })
}

export const createProduct = product => {
    return addDoc(productCollection, product)
}

export const getProducts = async () => {
    const products = await getDocs(productCollection);
    let product = []
    products.forEach(pro => {
        product.push(pro);
    })
    return product
}

export const updateProduct = async (id, name, price, description, tag, image) => {
    await updateDoc(doc(productCollection, id), {
        name: name,
        description: description,
        price: price,
        tag: tag,
        image: image,
    })
}

export const deleteProduct = async (id) => {
    let product = doc(productCollection, id);
    await deleteDoc(product);
}

export const updateProfiles = async (id, name, phone, address, postcode) => {
    await updateDoc(doc(profileCollection, id), {
        name: name,
        phone: phone,
        address: address,
        postcode: postcode,
    })
}