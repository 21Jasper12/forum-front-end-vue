<template>
  <Spinner v-if="isLoading" />

  <div 
    v-else
    class="container py-5"
  >
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr>

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import  Spinner from './../components/Spinner.vue'

// 串接API後就可以把假資料刪除
// const dummyData = {
//     "restaurant": {
//         "id": 1,
//         "name": "Alfredo Buckridge",
//         "tel": "405.381.3052 x47083",
//         "address": "81579 Kunde Fall",
//         "opening_hours": "08:00",
//         "description": "Voluptatum necessitatibus quis qui repellat omnis est. Tenetur inventore facere quis sint aperiam vel incidunt eum et. Ea voluptas non maxime deserunt officia sit ut corrupti quis. Et aut error ea molestiae et iste voluptatem sapiente. Quia ipsam quas hic qui impedit. Doloribus illum adipisci.\n \rVoluptas repellat nesciunt blanditiis. Vel et illo. Accusamus omnis laborum. Animi qui et saepe sint tenetur.\n \rDolorum ipsa fugiat explicabo. Aliquid nostrum totam quas aperiam libero necessitatibus animi possimus. Adipisci aut magni modi. Necessitatibus totam adipisci veniam. Vitae ipsum aut quis delectus dolorem illo.",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=12.044077533969254",
//         "viewCounts": 1,
//         "createdAt": "2022-08-09T16:06:07.000Z",
//         "updatedAt": "2022-08-23T08:06:20.000Z",
//         "CategoryId": 3,
//         "Category": {
//             "id": 3,
//             "name": "義大利料理",
//             "createdAt": "2022-08-09T16:06:07.000Z",
//             "updatedAt": "2022-08-09T16:06:07.000Z"
//         },
//         "Comments": [
//             {
//                 "id": 1,
//                 "text": "Beatae dolor quisquam omnis.",
//                 "UserId": 2,
//                 "RestaurantId": 1,
//                 "createdAt": "2022-08-09T16:06:07.000Z",
//                 "updatedAt": "2022-08-09T16:06:07.000Z",
//                 "User": {
//                     "id": 2,
//                     "name": "user1",
//                     "email": "user1@example.com",
//                     "password": "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//                     "isAdmin": false,
//                     "image": null,
//                     "createdAt": "2022-08-09T16:06:07.000Z",
//                     "updatedAt": "2022-08-09T16:06:07.000Z"
//                 }
//             },
//             {
//                 "id": 51,
//                 "text": "Ut illum assumenda.",
//                 "UserId": 3,
//                 "RestaurantId": 1,
//                 "createdAt": "2022-08-09T16:06:07.000Z",
//                 "updatedAt": "2022-08-09T16:06:07.000Z",
//                 "User": {
//                     "id": 3,
//                     "name": "user2",
//                     "email": "user2@example.com",
//                     "password": "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
//                     "isAdmin": false,
//                     "image": null,
//                     "createdAt": "2022-08-09T16:06:07.000Z",
//                     "updatedAt": "2022-08-09T16:06:07.000Z"
//                 }
//             },
//             {
//                 "id": 101,
//                 "text": "Omnis nostrum nobis dolores cum.",
//                 "UserId": 3,
//                 "RestaurantId": 1,
//                 "createdAt": "2022-08-09T16:06:07.000Z",
//                 "updatedAt": "2022-08-09T16:06:07.000Z",
//                 "User": {
//                     "id": 3,
//                     "name": "user2",
//                     "email": "user2@example.com",
//                     "password": "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
//                     "isAdmin": false,
//                     "image": null,
//                     "createdAt": "2022-08-09T16:06:07.000Z",
//                     "updatedAt": "2022-08-09T16:06:07.000Z"
//                 }
//             }
//         ]
//     }
// }

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        commentsLength: 0,
        viewCounts: 0
      },
      isLoading: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id: restaurantId } = to.params
    this.fetchRestaurant(restaurantId)
    next()
  },
  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try{
        this.isLoading = true
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })

        const {id, name, Category, Comments, viewCounts } = data.restaurant
        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          commentsLength: Comments.length,
          viewCounts
        }

        this.isLoading = false
      }
      catch(error){
        this.isLoading = false
        console.error(error.message)

        Toast.firer({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試' 
        })
      }
    }
  },
}
</script>