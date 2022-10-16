<template>
  <div class="container py-5">
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="newCategoryName"
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
          />
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="isProcessing"
            @click.stop.prevent="createCategory"
          >
            新增
          </button>
        </div>
      </div>
    </form>

    <Spinner v-if="isLoading" />
    
    <table 
      v-else
      class="table"
    >
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            />
            <span 
              v-show="category.isEditing" 
              class="cancel"
              @click="handleCancel(category.id)"
            >
               ✕ 
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)"
            >
              Edit
            </button>
            <button
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              :disabled="isProcessing"
              @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              :disabled="isProcessing"
              @click.stop.prevent="deleteCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav";
// import { v4 as uuidv4 } from "uuid"
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers' 
import Spinner from '../components/Spinner.vue';

//  2. 定義暫時使用的資料
// 串接API後就能把假資料刪除了
// const dummyData = {
//   categories: [
//     {
//       id: 1,
//       name: "中式料理",
//       createdAt: "2019-06-22T09:00:43.000Z",
//       updatedAt: "2019-06-22T09:00:43.000Z",
//     },
//     {
//       id: 2,
//       name: "日本料理",
//       createdAt: "2019-06-22T09:00:43.000Z",
//       updatedAt: "2019-06-22T09:00:43.000Z",
//     },
//     {
//       id: 3,
//       name: "義大利料理",
//       createdAt: "2019-06-22T09:00:43.000Z",
//       updatedAt: "2019-06-22T09:00:43.000Z",
//     },
//     {
//       id: 4,
//       name: "墨西哥料理",
//       createdAt: "2019-06-22T09:00:43.000Z",
//       updatedAt: "2019-06-22T09:00:43.000Z",
//     },
//   ],
// };

export default {
  components: {
    AdminNav,
    Spinner,
  },
  // 3. 定義 Vue 中使用的 data 資料
  data() {
    return {
      categories: [],
      newCategoryName: "",
      isProcessing: false,
      isLoading: true,
    };
  },
  // 5. 調用 `fetchCategories` 方法
  created() {
    this.fetchCategories();
  },
  methods: {
    // 4. 定義 `fetchCategories` 方法，把 `dummyData` 帶入 Vue 物件
    async fetchCategories() {
      try{
        this.isLoading = true
        const { data } = await adminAPI.categories.get()

        // 在每一個 category 中都添加一個 isEditing 屬性
        this.categories = data.categories.map((category) => {
          return {
            ...category,
            isEditing: false,
            nameCached: '',
          };
        });

        this.isLoading = false
        
      }
      catch(error){
        console.error(error.message)

        this.isLoading = false

        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳類別，請稍後再試'
        })
      }
    },
    async createCategory() {
      try{
        if(!this.newCategoryName.trim()){
          Toast.fire({
            icon: 'warning',
            title: '請輸入想要新增的類別'
          })
          
          this.newCategoryName = ''
          return
        }

        this.isProcessing = true

        const { data } = await adminAPI.categories.create({
          name: this.newCategoryName
        })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }
        
        // 將新的類別添加到陣列中
        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName,
          isEditing: false,
        });
        this.newCategoryName = ""; // 清空原本欄位中的內容

        this.isProcessing = false
        
      }
      catch(error){
        console.error(error.message)

        this.isProcessing = false

        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳類別，請稍後再試'
        })
      }
    },
    async deleteCategory(categoryId) {
      try{
        this.isProcessing = true
        const { data } = await adminAPI.categories.deleteCategory({ categoryId })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }

        // 將該餐廳類別從陣列中移除
        this.categories = this.categories.filter((category) => category.id !== categoryId)

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法移除餐廳類別，請稍後再試'
        })
      }

    },

    // 更新選定的資料
    async updateCategory ({ categoryId, name }) {
      try{
        if(!name.trim()){
          Toast.fire({
            icon: 'warning',
            title: '請輸入餐廳類別'
          })

          return
        }

        this.isProcessing = true

        const { data } = await adminAPI.categories.editCategory({
          categoryId,
          name
        })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }

        this.toggleIsEditing(categoryId)

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法修改餐廳類別，請稍後再試'
        })
      }
    },
    
    // 取消編輯
    handleCancel (categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,

            // 把原本的餐廳類別名稱還回去
           name: category.nameCached
          }
        }
        else {
          return category
        }
      })

      this.toggleIsEditing(categoryId)
    },


    // 更新isEditing狀態
    toggleIsEditing (categoryId) {
      // 自己想的方法
      // 利用findIndex來找資料的位置
      // const test = this.categories.findIndex(category => category.id === categoryId)
      // console.log('test: ',test)
      
      // 這邊去抓對應的位置去改isEditing的狀態和nameCached
      // this.categories[test].isEditing = !this.categories[test].isEditing
      // this.categories[test].nameCached = this.categories[test].name

      // ================================================================================
      
      // 教案的寫法
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name
          }
        }
        else{
          return category
        }
      })
    },
  },
};
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>