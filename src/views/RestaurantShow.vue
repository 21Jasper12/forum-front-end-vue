<template>
  <Spinner v-if="isLoading" />

  <div 
    v-else
    class="container py-5"
  >
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant"/>

    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments 
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />

    <!-- 新增評論 CreateComment -->
    <CreateComment 
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>

import RestaurantDetail from '../components/RestaurantDetail.vue'
import RestaurantComments from '../components/RestaurantComments.vue'
import CreateComment from '../components/CreateComment.vue'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'

// 串接API後就可以把假資料刪除
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
//     updatedAt: "2022-08-23T08:06:20.120Z",
//     CategoryId: 3,
//     Category: {
//       id: 3,
//       name: "義大利料理",
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//     },
//     FavoritedUsers: [],
//     LikedUsers: [],
//     Comments: [
//       {
//         id: 1,
//         text: "Beatae dolor quisquam omnis.",
//         UserId: 2,
//         RestaurantId: 1,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         User: {
//           id: 2,
//           name: "user1",
//           email: "user1@example.com",
//           password:
//             "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//           isAdmin: false,
//           image: null,
//           createdAt: "2022-08-09T16:06:07.000Z",
//           updatedAt: "2022-08-09T16:06:07.000Z",
//         },
//       },
//       {
//         id: 51,
//         text: "Ut illum assumenda.",
//         UserId: 3,
//         RestaurantId: 1,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         User: {
//           id: 3,
//           name: "user2",
//           email: "user2@example.com",
//           password:
//             "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
//           isAdmin: false,
//           image: null,
//           createdAt: "2022-08-09T16:06:07.000Z",
//           updatedAt: "2022-08-09T16:06:07.000Z",
//         },
//       },
//       {
//         id: 101,
//         text: "Omnis nostrum nobis dolores cum.",
//         UserId: 3,
//         RestaurantId: 1,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         User: {
//           id: 3,
//           name: "user2",
//           email: "user2@example.com",
//           password:
//             "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
//           isAdmin: false,
//           image: null,
//           createdAt: "2022-08-09T16:06:07.000Z",
//           updatedAt: "2022-08-09T16:06:07.000Z",
//         },
//       },
//     ],
//   },
//   isFavorited: false,
//   isLiked: false,
// }

// 串接store後就可以把假資料刪除
// const dummyUser = {
//   currentUser: {
//     "id": 1,
//     "name": "root",
//     "email": "root@example.com",
//     "image": null,
//     "isAdmin": true
//   },
//   isAuthenticated: true
// }

export default {
  components: {
    RestaurantDetail: RestaurantDetail,
    RestaurantComments: RestaurantComments,
    CreateComment: CreateComment,
    Spinner: Spinner,
  },

  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id: restaurantId } = to.params
    this.fetchRestaurant(restaurantId)
    next()
  },
  created () {
    // 利用解構賦值收資料this.$route.params內部是[id: 1(動態路由)]，id: restaurantID是將原本的id改名成restaurantID
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try{
        this.isLoading = true
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })

        const { restaurant, isFavorited, isLiked } = data
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments
        } = restaurant

        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked
        }

        this.restaurantComments = Comments

        this.isLoading = false
      }
      catch(error){
        this.isLoading = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    afterDeleteComment (commentId) {
      // 以 filter 保留未被選擇的 comment.id
      this.restaurantComments = this.restaurantComments.filter(
        comment => comment.id !== commentId
      )
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload
      // console.log(commentId, restaurantId, text) 測試
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
    }
  }
};
</script>