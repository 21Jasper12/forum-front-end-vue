<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      人氣餐廳
    </h1>

    <hr>
    
    <RestaurantTopCard 
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :initial-restaurant="restaurant"
    />
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurantTopCard from '../components/RestaurantTopCard.vue'

const dummyData = {
    "restaurants": [
        {
            "id": 50,
            "name": "Frederic Zieme I",
            "tel": "899-435-5462 x5305",
            "address": "098 Kuphal Land",
            "opening_hours": "08:00",
            "description": "et voluptas qui",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=3.255511901931696",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 3,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 49,
            "name": "Fern Schoen MD",
            "tel": "915-843-5150 x93449",
            "address": "196 Trycia Corners",
            "opening_hours": "08:00",
            "description": "voluptas",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=8.28627054856048",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 2,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 48,
            "name": "Lonzo Senger",
            "tel": "097.304.6593 x4589",
            "address": "3924 Kuhlman Course",
            "opening_hours": "08:00",
            "description": "qui dolor debitis",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=77.64767071420388",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 1,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 47,
            "name": "Juston Balistreri",
            "tel": "(556) 196-6454 x259",
            "address": "33274 Ross Square",
            "opening_hours": "08:00",
            "description": "Quibusdam eveniet animi qui qui vero dolore ullam.",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=47.19672154951668",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 1,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 46,
            "name": "Ryleigh Jacobson",
            "tel": "(195) 204-0645 x7887",
            "address": "109 Breitenberg Prairie",
            "opening_hours": "08:00",
            "description": "Laboriosam ea dolorem necessitatibus excepturi con",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=95.39537738346766",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 3,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 45,
            "name": "Christophe Walter",
            "tel": "(034) 051-5666 x19818",
            "address": "1091 Ashlee Parkways",
            "opening_hours": "08:00",
            "description": "Ut est neque cum vitae. Eligendi nesciunt quia ill",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=5.91759826282805",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 4,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 44,
            "name": "Dr. Penelope Herzog",
            "tel": "1-354-874-1898 x1042",
            "address": "686 Sporer Manors",
            "opening_hours": "08:00",
            "description": "Rerum commodi eum ratione iste autem ut beatae.\nCo",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=94.67350034713431",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 5,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 43,
            "name": "Daniella Altenwerth",
            "tel": "1-928-285-8312 x75219",
            "address": "8103 Gutmann Loop",
            "opening_hours": "08:00",
            "description": "Dolorem voluptates et dolorum. Ea aliquid tempore ",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=70.5058348445646",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 3,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 42,
            "name": "Torey Douglas PhD",
            "tel": "738-141-8461 x491",
            "address": "81117 Werner Drives",
            "opening_hours": "08:00",
            "description": "Nulla non est modi ipsam nobis sed. Tenetur laudan",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=70.97181265908196",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 1,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 41,
            "name": "Napoleon Jacobi",
            "tel": "495.108.1360",
            "address": "194 Pattie Station",
            "opening_hours": "08:00",
            "description": "Sint id velit iusto voluptas.\nNobis et fugit eaque",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.30642317678981",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 5,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        }
    ]
}

export default { 
  components: {
    NavTabs: NavTabs,
    RestaurantTopCard: RestaurantTopCard,
  },
  data() {
    return {
      restaurants: []
    }
  },
  methods: {
    fetchRestaurants () {
      this.restaurants = dummyData.restaurants
    }
  },
  created() {
    this.fetchRestaurants()
  }
}
</script>