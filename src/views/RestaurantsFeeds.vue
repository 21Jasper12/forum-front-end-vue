<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />

    <template v-else>
      <h1 class="mt-5">最新動態</h1>
      <hr />
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <NewestRestaurants :restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <!-- 最新評論 NewestComments-->
          <h3>最新評論</h3>
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import NewestRestaurants from "../components/NewestRestaurants.vue";
import NewestComments from "../components/NewestComments.vue";
import Spinner from './../components/Spinner.vue'
import restaurantAPI from "./../apis/restaurants.js";
import { Toast } from "./../utils/helpers"

// postman資料(功成身退)
// const dummyData = {
//   restaurants: [
//     {
//       id: 1,
//       name: "Alfredo Buckridge",
//       tel: "405.381.3052 x47083",
//       address: "81579 Kunde Fall",
//       opening_hours: "08:00",
//       description:
//         "Voluptatum necessitatibus quis qui repellat omnis est. Tenetur inventore facere quis sint aperiam vel incidunt eum et. Ea voluptas non maxime deserunt officia sit ut corrupti quis. Et aut error ea molestiae et iste voluptatem sapiente. Quia ipsam quas hic qui impedit. Doloribus illum adipisci.\n \rVoluptas repellat nesciunt blanditiis. Vel et illo. Accusamus omnis laborum. Animi qui et saepe sint tenetur.\n \rDolorum ipsa fugiat explicabo. Aliquid nostrum totam quas aperiam libero necessitatibus animi possimus. Adipisci aut magni modi. Necessitatibus totam adipisci veniam. Vitae ipsum aut quis delectus dolorem illo.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=12.044077533969254",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 2,
//       name: "Grayson Schiller",
//       tel: "292-204-2178 x275",
//       address: "12240 Walsh Courts",
//       opening_hours: "08:00",
//       description:
//         "Et incidunt temporibus provident. Eos sunt nihil ut ea dolores reprehenderit magni harum saepe.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=56.62815544895237",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 3,
//       name: "Iliana Osinski",
//       tel: "(564) 842-3336 x84990",
//       address: "564 Vilma Pines",
//       opening_hours: "08:00",
//       description: "Dolores est repellendus odio et.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=61.435704183210895",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 1,
//       Category: {
//         id: 1,
//         name: "中式料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 4,
//       name: "Robb Shanahan",
//       tel: "220.807.2370",
//       address: "96873 Haag Stravenue",
//       opening_hours: "08:00",
//       description:
//         "Fugiat magnam quasi quae ea saepe dolorum blanditiis recusandae iste. Voluptatem accusantium omnis sit ea quam aut similique sed ea. Est labore recusandae vitae aut cupiditate eum nostrum ut quisquam. Velit et sed ipsam modi quos sapiente et repellat doloremque. Et quisquam quisquam sit.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=75.98828388998247",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 4,
//       Category: {
//         id: 4,
//         name: "墨西哥料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 5,
//       name: "Duncan Botsford",
//       tel: "610-371-7073 x521",
//       address: "4031 Zieme Plains",
//       opening_hours: "08:00",
//       description: "Quia maiores aliquam ut voluptatem ea.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=21.334019299871688",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 6,
//       name: "Brandi Schmitt",
//       tel: "(248) 622-3654 x8621",
//       address: "767 Russel Point",
//       opening_hours: "08:00",
//       description:
//         "Sed explicabo eligendi nisi error. Officia tempora omnis nam. Nobis id fuga qui omnis expedita. Cupiditate voluptates eos. Quam eveniet dolorem quo blanditiis voluptatibus aut rerum voluptate. Perspiciatis officiis et ut sed illo.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=37.38769374957105",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 5,
//       Category: {
//         id: 5,
//         name: "素食料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 7,
//       name: "Mrs. Makenna Wilderman",
//       tel: "793-404-5758",
//       address: "9770 Keeling Fords",
//       opening_hours: "08:00",
//       description:
//         "Quia suscipit expedita dolorem veniam. Veritatis fugit cupiditate tempora ab nisi voluptates quas. A voluptates libero. Voluptatibus iste debitis velit expedita sint. Quod vel officiis exercitationem consectetur est voluptas rerum. Qui est et velit quaerat est molestiae.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=87.81588593988103",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 1,
//       Category: {
//         id: 1,
//         name: "中式料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 8,
//       name: "Mossie Balistreri",
//       tel: "1-156-085-0110",
//       address: "339 Celine Via",
//       opening_hours: "08:00",
//       description: "laboriosam",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=21.750566949541316",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 5,
//       Category: {
//         id: 5,
//         name: "素食料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 9,
//       name: "Nedra Rolfson",
//       tel: "076.124.4941 x75119",
//       address: "4434 Adell Knolls",
//       opening_hours: "08:00",
//       description:
//         "Voluptatem fugiat eveniet sint exercitationem quo eaque a qui officiis. Ab nulla quo non qui explicabo ut sapiente. Facere magni aut magnam.\n \rLabore et eos ut vitae provident rerum. Dolorem ipsum in mollitia assumenda animi sint quis et. Consectetur modi impedit in blanditiis fugiat blanditiis doloribus maxime illo. Consequatur placeat placeat debitis quia non officia aut et. Praesentium vero voluptatem et consequuntur omnis quia. Excepturi ut eos beatae distinctio aliquid aliquid id.\n \rAt similique ea eum et excepturi sit ad. Perferendis officia consequatur ab non nemo velit perspiciatis repudiandae inventore. Officia non voluptatibus. Ipsam quo culpa est est eligendi repellendus veritatis quia est. Illo voluptatem ea enim est eum reiciendis et corporis et.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=62.978153210372966",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//     {
//       id: 10,
//       name: "Sheila Morissette",
//       tel: "954.315.6229",
//       address: "56294 Mayer Throughway",
//       opening_hours: "08:00",
//       description: "Nemo vel doloribus.",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=28.405790828392185",
//       viewCounts: 0,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       CategoryId: 4,
//       Category: {
//         id: 4,
//         name: "墨西哥料理",
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//     },
//   ],
//   comments: [
//     {
//       id: 7,
//       text: "Porro ad soluta est nulla accusamus.",
//       UserId: 1,
//       RestaurantId: 7,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 1,
//         name: "root",
//         email: "root@example.com",
//         password:
//           "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//         isAdmin: true,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 7,
//         name: "Mrs. Makenna Wilderman",
//         tel: "793-404-5758",
//         address: "9770 Keeling Fords",
//         opening_hours: "08:00",
//         description:
//           "Quia suscipit expedita dolorem veniam. Veritatis fugit cupiditate tempora ab nisi voluptates quas. A voluptates libero. Voluptatibus iste debitis velit expedita sint. Quod vel officiis exercitationem consectetur est voluptas rerum. Qui est et velit quaerat est molestiae.",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=87.81588593988103",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 1,
//       },
//     },
//     {
//       id: 22,
//       text: "Iste tempora omnis quaerat quos qui eum reiciendis quo quia.",
//       UserId: 1,
//       RestaurantId: 22,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 1,
//         name: "root",
//         email: "root@example.com",
//         password:
//           "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//         isAdmin: true,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 22,
//         name: "Melody Osinski",
//         tel: "877.389.6578",
//         address: "25010 Parisian Meadows",
//         opening_hours: "08:00",
//         description: "Eius voluptas tenetur ut sit dolore cum.",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=70.40564476570816",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 3,
//       },
//     },
//     {
//       id: 48,
//       text: "Tenetur ut fuga occaecati.",
//       UserId: 1,
//       RestaurantId: 48,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 1,
//         name: "root",
//         email: "root@example.com",
//         password:
//           "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//         isAdmin: true,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 48,
//         name: "Lonzo Senger",
//         tel: "097.304.6593 x4589",
//         address: "3924 Kuhlman Course",
//         opening_hours: "08:00",
//         description: "qui dolor debitis",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=77.64767071420388",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 1,
//       },
//     },
//     {
//       id: 73,
//       text: "In dolorem dolorum odit sit ea exercitationem ad quos illum.",
//       UserId: 1,
//       RestaurantId: 23,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 1,
//         name: "root",
//         email: "root@example.com",
//         password:
//           "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//         isAdmin: true,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 23,
//         name: "Cristobal Marquardt",
//         tel: "(581) 363-0526",
//         address: "3507 Briana Squares",
//         opening_hours: "08:00",
//         description:
//           "Id magnam et porro ut. Ea consequatur consectetur quidem dicta. Nostrum quaerat quis laudantium. Magni cumque qui qui aliquid et molestiae voluptatibus deserunt. Quam harum fuga.\n \rMagnam veniam est magnam corporis tempora omnis. Nam in voluptatem dicta molestiae. Vero iste ut quae qui. Accusamus mollitia hic. Harum temporibus praesentium qui incidunt rerum molestias eaque. Commodi et voluptatem odit maiores sit explicabo eum aut.\n \rSaepe rerum minus tempora. Itaque commodi tempora iure qui repellendus perspiciatis in aut assumenda. Et quia ipsa reiciendis consequatur est quod incidunt voluptatem. Ab modi autem non quasi voluptatem. Quaerat adipisci qui consequatur et officiis nam corporis.",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=18.930555178245466",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 5,
//       },
//     },
//     {
//       id: 98,
//       text: "Voluptatem et amet nobis perferendis nam explicabo est voluptas.",
//       UserId: 1,
//       RestaurantId: 48,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 1,
//         name: "root",
//         email: "root@example.com",
//         password:
//           "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//         isAdmin: true,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 48,
//         name: "Lonzo Senger",
//         tel: "097.304.6593 x4589",
//         address: "3924 Kuhlman Course",
//         opening_hours: "08:00",
//         description: "qui dolor debitis",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=77.64767071420388",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 1,
//       },
//     },
//     {
//       id: 126,
//       text: "Veritatis dolor hic tenetur.",
//       UserId: 1,
//       RestaurantId: 26,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 1,
//         name: "root",
//         email: "root@example.com",
//         password:
//           "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//         isAdmin: true,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 26,
//         name: "Vincent Champlin",
//         tel: "741-975-0099",
//         address: "671 Murphy Stravenue",
//         opening_hours: "08:00",
//         description: "voluptas sequi facilis",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=48.07135651852283",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 2,
//       },
//     },
//     {
//       id: 2,
//       text: "Architecto fugiat unde.",
//       UserId: 2,
//       RestaurantId: 2,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 2,
//         name: "user1",
//         email: "user1@example.com",
//         password:
//           "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//         isAdmin: false,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 2,
//         name: "Grayson Schiller",
//         tel: "292-204-2178 x275",
//         address: "12240 Walsh Courts",
//         opening_hours: "08:00",
//         description:
//           "Et incidunt temporibus provident. Eos sunt nihil ut ea dolores reprehenderit magni harum saepe.",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=56.62815544895237",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 3,
//       },
//     },
//     {
//       id: 50,
//       text: "Soluta nostrum velit.",
//       UserId: 2,
//       RestaurantId: 50,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 2,
//         name: "user1",
//         email: "user1@example.com",
//         password:
//           "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//         isAdmin: false,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 50,
//         name: "Frederic Zieme I",
//         tel: "899-435-5462 x5305",
//         address: "098 Kuphal Land",
//         opening_hours: "08:00",
//         description: "et voluptas qui",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=3.255511901931696",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 3,
//       },
//     },
//     {
//       id: 69,
//       text: "Voluptas est nihil aliquid voluptatem.",
//       UserId: 2,
//       RestaurantId: 19,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 2,
//         name: "user1",
//         email: "user1@example.com",
//         password:
//           "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//         isAdmin: false,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 19,
//         name: "Leila Jacobs",
//         tel: "962-600-3837 x198",
//         address: "0824 Lavinia Gardens",
//         opening_hours: "08:00",
//         description: "perferendis et quidem",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=40.45625205843495",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 2,
//       },
//     },
//     {
//       id: 103,
//       text: "Rerum laudantium et nostrum odit omnis.",
//       UserId: 2,
//       RestaurantId: 3,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//       User: {
//         id: 2,
//         name: "user1",
//         email: "user1@example.com",
//         password:
//           "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//         isAdmin: false,
//         image: null,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//       },
//       Restaurant: {
//         id: 3,
//         name: "Iliana Osinski",
//         tel: "(564) 842-3336 x84990",
//         address: "564 Vilma Pines",
//         opening_hours: "08:00",
//         description: "Dolores est repellendus odio et.",
//         image:
//           "https://loremflickr.com/320/240/restaurant,food/?random=61.435704183210895",
//         viewCounts: 0,
//         createdAt: "2022-08-09T16:06:07.000Z",
//         updatedAt: "2022-08-09T16:06:07.000Z",
//         CategoryId: 1,
//       },
//     },
//   ],
// };
// ==============================================

export default {
  components: {
    NavTabs: NavTabs,
    NewestRestaurants: NewestRestaurants,
    NewestComments: NewestComments,
    Spinner: Spinner,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    };
  },
  methods: {
    async fetchFeeds() {
      try {
        this.isLoading = true
        const response = await restaurantAPI.getFeeds()

        const { restaurants, comments } = response.data

        this.restaurants = restaurants
        this.comments = comments.filter((comment) => comment.Restaurant && comment.text)

        this.isLoading = false
      } 
      catch (error) {
        this.isLoading = false
        console.log(error.message)

        Toast.fire({
            icon: 'error',
            title: '無法取得資料，請稍後再試'
        })
      }

    },
  },
  created() {
    this.fetchFeeds();
  },
};
</script>