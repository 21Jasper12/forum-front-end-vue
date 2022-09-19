<template>
  <div class="container py-5">
    <NavTabs /> 

    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />
    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurandCard 
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurandCard from '../components/RestaurantCard.vue'
import RestaurantsNavPills from '../components/RestaurantsNavPills.vue'
import RestaurantsPagination from '../components/RestaurantsPagination.vue'

const dummyData ={
    "restaurants": [
        {
            "id": 1,
            "name": "Alfredo Buckridge",
            "tel": "405.381.3052 x47083",
            "address": "81579 Kunde Fall",
            "opening_hours": "08:00",
            "description": "Voluptatum necessitatibus quis qui repellat omnis ",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=12.044077533969254",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 3,
            "Category": {
                "id": 3,
                "name": "義大利料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 2,
            "name": "Grayson Schiller",
            "tel": "292-204-2178 x275",
            "address": "12240 Walsh Courts",
            "opening_hours": "08:00",
            "description": "Et incidunt temporibus provident. Eos sunt nihil u",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=56.62815544895237",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 3,
            "Category": {
                "id": 3,
                "name": "義大利料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 3,
            "name": "Iliana Osinski",
            "tel": "(564) 842-3336 x84990",
            "address": "564 Vilma Pines",
            "opening_hours": "08:00",
            "description": "Dolores est repellendus odio et.",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=61.435704183210895",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 1,
            "Category": {
                "id": 1,
                "name": "中式料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 4,
            "name": "Robb Shanahan",
            "tel": "220.807.2370",
            "address": "96873 Haag Stravenue",
            "opening_hours": "08:00",
            "description": "Fugiat magnam quasi quae ea saepe dolorum blanditi",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=75.98828388998247",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 4,
            "Category": {
                "id": 4,
                "name": "墨西哥料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 5,
            "name": "Duncan Botsford",
            "tel": "610-371-7073 x521",
            "address": "4031 Zieme Plains",
            "opening_hours": "08:00",
            "description": "Quia maiores aliquam ut voluptatem ea.",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=21.334019299871688",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 3,
            "Category": {
                "id": 3,
                "name": "義大利料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 6,
            "name": "Brandi Schmitt",
            "tel": "(248) 622-3654 x8621",
            "address": "767 Russel Point",
            "opening_hours": "08:00",
            "description": "Sed explicabo eligendi nisi error. Officia tempora",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=37.38769374957105",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 5,
            "Category": {
                "id": 5,
                "name": "素食料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 7,
            "name": "Mrs. Makenna Wilderman",
            "tel": "793-404-5758",
            "address": "9770 Keeling Fords",
            "opening_hours": "08:00",
            "description": "Quia suscipit expedita dolorem veniam. Veritatis f",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=87.81588593988103",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 1,
            "Category": {
                "id": 1,
                "name": "中式料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 8,
            "name": "Mossie Balistreri",
            "tel": "1-156-085-0110",
            "address": "339 Celine Via",
            "opening_hours": "08:00",
            "description": "laboriosam",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=21.750566949541316",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 5,
            "Category": {
                "id": 5,
                "name": "素食料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 9,
            "name": "Nedra Rolfson",
            "tel": "076.124.4941 x75119",
            "address": "4434 Adell Knolls",
            "opening_hours": "08:00",
            "description": "Voluptatem fugiat eveniet sint exercitationem quo ",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=62.978153210372966",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 3,
            "Category": {
                "id": 3,
                "name": "義大利料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        },
        {
            "id": 10,
            "name": "Sheila Morissette",
            "tel": "954.315.6229",
            "address": "56294 Mayer Throughway",
            "opening_hours": "08:00",
            "description": "Nemo vel doloribus.",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=28.405790828392185",
            "viewCounts": 0,
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z",
            "CategoryId": 4,
            "Category": {
                "id": 4,
                "name": "墨西哥料理",
                "createdAt": "2022-08-09T16:06:07.000Z",
                "updatedAt": "2022-08-09T16:06:07.000Z"
            },
            "isFavorited": false,
            "isLiked": false
        }
    ],
    "categories": [
        {
            "id": 1,
            "name": "中式料理",
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z"
        },
        {
            "id": 2,
            "name": "日本料理",
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z"
        },
        {
            "id": 3,
            "name": "義大利料理",
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z"
        },
        {
            "id": 4,
            "name": "墨西哥料理",
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z"
        },
        {
            "id": 5,
            "name": "素食料理",
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z"
        },
        {
            "id": 6,
            "name": "美式料理",
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z"
        },
        {
            "id": 7,
            "name": "複合式料理",
            "createdAt": "2022-08-09T16:06:07.000Z",
            "updatedAt": "2022-08-09T16:06:07.000Z"
        }
    ],
    "categoryId": "",
    "page": 1,
    "totalPage": [
        1,
        2,
        3,
        4,
        5
    ],
    "prev": 1,
    "next": 2
}

export default { 
  components: {
    NavTabs: NavTabs,
    RestaurandCard: RestaurandCard,
    RestaurantsNavPills: RestaurantsNavPills,
    RestaurantsPagination: RestaurantsPagination,
  },
  data () {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
    }
  },
  methods: {
    fetchRestaurants () {
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next
      } = dummyData
      this.restaurants = restaurants
      this.categories = categories
      this.categoryId = categoryId
      this.currentPage = page
      this.totalPage = totalPage
      this.previousPage = prev
      this.nextPage = next
    }
  },
  created() {
    this.fetchRestaurants()
  }
}
</script>