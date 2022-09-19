<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select 
        id="categoryId"
        v-model="restaurant.categoryId" 
        class="form-control" 
        name="categoryId" 
        required
      >
        <option value="" selected disabled>--請選擇--</option>
        <option 
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        v-model="restaurant.openingHours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img 
        v-if="restaurant.image"
        :src="restaurant.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      >
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      />
    </div>

    <button type="submit" class="btn btn-primary">送出</button>
  </form>
</template>

<script>
const dummyData = {
  categories: [
    {
      id: 1,
      name: "中式料理",
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
    {
      id: 2,
      name: "日本料理",
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
    {
      id: 3,
      name: "義大利料理",
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
    {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
    {
      id: 5,
      name: "素食料理",
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
    {
      id: 6,
      name: "美式料理",
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
    {
      id: 7,
      name: "複合式料理",
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
  ],
};

export default {
  props: {
    initialRestaurant: {
      type: Object,
      default:() => {
        return {
          name: '',
          categoryId: '',
          tel: '',
          address: '',
          description: '',
          image: '',
          openingHours: '',
        }
      }
    }
  },
  data() {
    return {
      restaurant: {
        ...this.initialRestaurant,

        // 下面是原先的設定值，initialRestaurant有預設值，所以直接用default引入
        // 或者使用created() 去覆蓋
        // name: "",
        // categoryId: "",
        // tel: "",
        // address: "",
        // description: "",
        // image: "",
        // openingHours: "",
      },
      categories: [],
    };
  },
  methods: {
    fetchCategories () {
      this.categories = dummyData.categories
    },
    handleFileChange (e) {
      // 解構賦值的方式拿資料
      const { files } = e.target
      // 如果不是用解構賦值的方式拿資料，就要到相對應的路徑拿資料
      const test = e.target.files
      console.log('files', files)
      console.log('test', test)

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.restaurant.image = ''
      } 
      else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        this.restaurant.image = imageURL
      }

    },
    handleSubmit(e) {
      const form = e.target
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  },
  created() {
    this.fetchCategories()

    // 使用created() 去覆蓋this.restaurant的值
    // this.restaurant = {

    //   原先this.restaurant的初始值
    //   ...this.restaurant,

    //   如果initialRestaurant有值就會覆蓋前面的資料
    //   ...this.initialRestaurant
    // }
  }
};
</script>