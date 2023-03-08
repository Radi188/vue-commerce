<template>
    <div class="overview">
        <div class="container h-100">
            <div class="intro h-100 ">
                <div class="row h-100 justify-content-center align-items-center ">
                    <div class="col-md-6">
                        <h3>Product Page</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, modi?</p>
                    </div>
                    <div class="col-md-6">
                        <img src="/img/svg/product.svg" alt="" class="img-fluid">
                    </div>
                </div>
            </div>
            <div class="product-test mt-5">
                <h3 class="d-inline-block" >Product Listing</h3>
                <div class="btn btn-primary float-end"  data-bs-toggle="modal" data-bs-target="#product" @click="addProduct" >Add Product</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.data().name }}</td>
                            <td>{{ product.data().price }}</td>
                            <!-- <td>{{ product.data().image }}</td> -->
                            <td>
                                <div @click="editProduct(product)" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#product">Edit</div>
                                <div @click="deleteItem(product.id)" class="btn btn-danger">Delete</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" id="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>
                    <div class="mt-4">
                      <input v-model="product.description" placeholder="Product Description" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <h4 class="mt-4">Product Details</h4>
                    <hr>

                    <div class="form-group mt-2">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group mt-2">
                      <input type="text" @keyup.,="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      <div class="d-flex">
                        <p v-for="t in product.tags">
                          <span class="p-1">{{ t }}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div class="form-group mt-2">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control" accept="image/*">
                    </div>
                    <div class="form-group d-flex">
                      <div class="p-1" v-for="image in product.images ">
                        <div>
                          <img :src="image" alt="" style="width: 80px;" @click="deleteImg(image, index)" >
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button @click="saveData" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
                <button @click="updateItem" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
            </div>
    </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { createProduct, getProducts, deleteProduct, updateProduct } from '@/firebase'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { getStorage, uploadBytesResumable , ref as storageReference, getDownloadURL, deleteObject } from 'firebase/storage'

const products = ref([])
let id
const modal = ref('')
const tag = ref('')
const product = reactive({name: '' , price: '', description: '', tags: [] , images: []})
const editor = useEditor({
  extensions: [
    StarterKit,
  ],
})
    const saveData = async () => {
        await createProduct(product)
        getData();
        product.name = ''
        product.price = ''
        product.description= ''
        product.tags = []
        product.images = []
        document.getElementById('close').click();
    }
    const getData = async () => {
        const data = await getProducts();
        return products.value = data;
    }
getData();
const deleteItem = async (id) => {
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
        deleteProduct(id);
        getData();
        Toast.fire({
        icon: 'success',
        title: 'Delete successfully'
        })

    }
    })
    }

const editProduct = (data) => {
    id = data.id;
    product.name = data.data().name;
    product.price = data.data().price;
    product.description = data.data().description
    product.tags = data.data().tags
    modal.value = 'edit'
}
const updateItem = async () => {
    await updateProduct(id , product.name , product.price, product.description, product.tags, product.images)
    product.name = ''
    product.price = ''
    product.description= ''
    product.images = []
    getData();
    document.getElementById('close').click();
}
const addProduct = () => {
    modal.value = 'new'
}
const addTag = () => {
    product.tags.push(tag.value)
    tag.value = ''
}

const deleteImg = (img, index) => {
  const storage = getStorage();
  product.images.splice(index , 1)
  const desertRef = storageReference(storage, img)
  deleteObject(desertRef).then(() => {
    console.log('Deleted')
}).catch((error) => {
    console.log('Oppppss!!')
});
}

const progress = ref(0)
const uploadTask = ref(null)

const uploadImage = (e) => {
  const storage = getStorage();
  const storageRef = storageReference(storage, 'products/product '+ e.target.files[0].name)
  uploadTask.value = uploadBytesResumable(storageRef, e.target.files[0])
  uploadTask.value.on('state_changed', (snapshot) => {
    progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, (error) => {

  }, 
  () => {
    getDownloadURL(uploadTask.value.snapshot.ref).then((downloadURL) => {
      product.images.push(downloadURL)
      console.log('File available at', downloadURL);
      console.log(product.images)
    });
  })
}
</script>

<style lang="scss" scoped>
  .img-wrapp{
    position: absolute;
  }
  .img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
  }
  .img-wrapp span.delete-img:hover{
    cursor: pointer;
  }
</style>