<template>
  <div class="container py-5">
    <AdminRestaurantForm 
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit" 
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue"
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

// 串接API後就能把這段假資料刪了
// const dummyData = {
//   restaurant: {
//     id: 1,
//     name: "Alfredo Buckridge",
//     tel: "405.381.3052 x47083",
//     address: "81579 Kunde Fall",
//     opening_hours: "08:00",
//     description:
//       "Voluptatum necessitatibus quis qui repellat omnis est. Tenetur inventore facere quis sint aperiam vel incidunt eum et. Ea voluptas non maxime deserunt officia sit ut corrupti quis. Et aut error ea molestiae et iste voluptatem sapiente. Quia ipsam quas hic qui impedit. Doloribus illum adipisci.\n \rVoluptas repellat nesciunt blanditiis. Vel et illo. Accusamus omnis laborum. Animi qui et saepe sint tenetur.\n \rDolorum ipsa fugiat explicabo. Aliquid nostrum totam quas aperiam libero necessitatibus animi possimus. Adipisci aut magni modi. Necessitatibus totam adipisci veniam. Vitae ipsum aut quis delectus dolorem illo.",
//     image:
//       "https://loremflickr.com/320/240/restaurant,food/?random=12.044077533969254",
//     viewCounts: 1,
//     createdAt: "2022-08-09T16:06:07.000Z",
//     updatedAt: "2022-08-23T08:06:20.000Z",
//     CategoryId: 3,
//     Category: {
//       id: 3,
//       name: "義大利料理",
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//     },
//   },
// }

export default {
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      isProcessing: false
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate (to, from, next) {
    // 路由改變時重新抓取資料
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try{
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })

        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId
        } = data.restaurant

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId
        }
      }
      catch(error){
        console.log(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit(formData) {
      try{
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id, 
          formData
        })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }

        // 送出表單後轉址
        this.$router.push({ name: 'admin-restaurants' })
      }
      catch(error){
        this.isProcessing = false
        console.log(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })

      }
    },
  },
};
</script>