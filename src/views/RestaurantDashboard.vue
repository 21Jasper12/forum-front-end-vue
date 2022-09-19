<template>
  <div class="container py-5">
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

const dummyData = {
    "restaurant": {
        "id": 1,
        "name": "Alfredo Buckridge",
        "tel": "405.381.3052 x47083",
        "address": "81579 Kunde Fall",
        "opening_hours": "08:00",
        "description": "Voluptatum necessitatibus quis qui repellat omnis est. Tenetur inventore facere quis sint aperiam vel incidunt eum et. Ea voluptas non maxime deserunt officia sit ut corrupti quis. Et aut error ea molestiae et iste voluptatem sapiente. Quia ipsam quas hic qui impedit. Doloribus illum adipisci.\n \rVoluptas repellat nesciunt blanditiis. Vel et illo. Accusamus omnis laborum. Animi qui et saepe sint tenetur.\n \rDolorum ipsa fugiat explicabo. Aliquid nostrum totam quas aperiam libero necessitatibus animi possimus. Adipisci aut magni modi. Necessitatibus totam adipisci veniam. Vitae ipsum aut quis delectus dolorem illo.",
        "image": "https://loremflickr.com/320/240/restaurant,food/?random=12.044077533969254",
        "viewCounts": 1,
        "createdAt": "2022-08-09T16:06:07.000Z",
        "updatedAt": "2022-08-23T08:06:20.000Z",
        "CategoryId": 3,
        "Category": {
            "id": 3,
            "name": "義大利料理",
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z"
        },
        "Comments": [
            {
                "id": 1,
                "text": "Beatae dolor quisquam omnis.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-08-09T16:06:07.000Z",
                    "updatedAt": "2022-08-09T16:06:07.000Z"
                }
            },
            {
                "id": 51,
                "text": "Ut illum assumenda.",
                "UserId": 3,
                "RestaurantId": 1,
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z",
                "User": {
                    "id": 3,
                    "name": "user2",
                    "email": "user2@example.com",
                    "password": "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-08-09T16:06:07.000Z",
                    "updatedAt": "2022-08-09T16:06:07.000Z"
                }
            },
            {
                "id": 101,
                "text": "Omnis nostrum nobis dolores cum.",
                "UserId": 3,
                "RestaurantId": 1,
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z",
                "User": {
                    "id": 3,
                    "name": "user2",
                    "email": "user2@example.com",
                    "password": "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-08-09T16:06:07.000Z",
                    "updatedAt": "2022-08-09T16:06:07.000Z"
                }
            }
        ]
    }
}

export default {
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
  methods: {
    fetchRestaurant(restaurantId) {
      console.log('id:', restaurantId)

      const {id, name, Category, Comments, viewCounts } = dummyData.restaurant
      this.restaurant = {
        id,
        name,
        categoryName: Category ? Category.name : '未分類',
        commentsLength: Comments.length,
        viewCounts
      }
    }
  },
  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  }
}
</script>