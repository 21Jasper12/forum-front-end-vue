<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : "未分類" }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
             :to="{ name:'admin-restaurant-show', params:{ id: restaurant.id } }"
            class="btn btn-link"
          >
            Show
          </router-link>

          <router-link 
            :to="{ name:'admin-restaurant-edit', params:{ id: restaurant.id } }"
            class="btn btn-link"
          >
            Edit 
          </router-link>

          <button 
            type="button" 
            class="btn btn-link"
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Alfredo Buckridge",
      tel: "405.381.3052 x47083",
      address: "81579 Kunde Fall",
      opening_hours: "08:00",
      description:
        "Voluptatum necessitatibus quis qui repellat omnis est. Tenetur inventore facere quis sint aperiam vel incidunt eum et. Ea voluptas non maxime deserunt officia sit ut corrupti quis. Et aut error ea molestiae et iste voluptatem sapiente. Quia ipsam quas hic qui impedit. Doloribus illum adipisci.\n \rVoluptas repellat nesciunt blanditiis. Vel et illo. Accusamus omnis laborum. Animi qui et saepe sint tenetur.\n \rDolorum ipsa fugiat explicabo. Aliquid nostrum totam quas aperiam libero necessitatibus animi possimus. Adipisci aut magni modi. Necessitatibus totam adipisci veniam. Vitae ipsum aut quis delectus dolorem illo.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=12.044077533969254",
      viewCounts: 1,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-23T08:06:20.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 2,
      name: "Grayson Schiller",
      tel: "292-204-2178 x275",
      address: "12240 Walsh Courts",
      opening_hours: "08:00",
      description:
        "Et incidunt temporibus provident. Eos sunt nihil ut ea dolores reprehenderit magni harum saepe.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=56.62815544895237",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 3,
      name: "Iliana Osinski",
      tel: "(564) 842-3336 x84990",
      address: "564 Vilma Pines",
      opening_hours: "08:00",
      description: "Dolores est repellendus odio et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=61.435704183210895",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 4,
      name: "Robb Shanahan",
      tel: "220.807.2370",
      address: "96873 Haag Stravenue",
      opening_hours: "08:00",
      description:
        "Fugiat magnam quasi quae ea saepe dolorum blanditiis recusandae iste. Voluptatem accusantium omnis sit ea quam aut similique sed ea. Est labore recusandae vitae aut cupiditate eum nostrum ut quisquam. Velit et sed ipsam modi quos sapiente et repellat doloremque. Et quisquam quisquam sit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=75.98828388998247",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 5,
      name: "Duncan Botsford",
      tel: "610-371-7073 x521",
      address: "4031 Zieme Plains",
      opening_hours: "08:00",
      description: "Quia maiores aliquam ut voluptatem ea.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=21.334019299871688",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 6,
      name: "Brandi Schmitt",
      tel: "(248) 622-3654 x8621",
      address: "767 Russel Point",
      opening_hours: "08:00",
      description:
        "Sed explicabo eligendi nisi error. Officia tempora omnis nam. Nobis id fuga qui omnis expedita. Cupiditate voluptates eos. Quam eveniet dolorem quo blanditiis voluptatibus aut rerum voluptate. Perspiciatis officiis et ut sed illo.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=37.38769374957105",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 7,
      name: "Mrs. Makenna Wilderman",
      tel: "793-404-5758",
      address: "9770 Keeling Fords",
      opening_hours: "08:00",
      description:
        "Quia suscipit expedita dolorem veniam. Veritatis fugit cupiditate tempora ab nisi voluptates quas. A voluptates libero. Voluptatibus iste debitis velit expedita sint. Quod vel officiis exercitationem consectetur est voluptas rerum. Qui est et velit quaerat est molestiae.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=87.81588593988103",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 8,
      name: "Mossie Balistreri",
      tel: "1-156-085-0110",
      address: "339 Celine Via",
      opening_hours: "08:00",
      description: "laboriosam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=21.750566949541316",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 9,
      name: "Nedra Rolfson",
      tel: "076.124.4941 x75119",
      address: "4434 Adell Knolls",
      opening_hours: "08:00",
      description:
        "Voluptatem fugiat eveniet sint exercitationem quo eaque a qui officiis. Ab nulla quo non qui explicabo ut sapiente. Facere magni aut magnam.\n \rLabore et eos ut vitae provident rerum. Dolorem ipsum in mollitia assumenda animi sint quis et. Consectetur modi impedit in blanditiis fugiat blanditiis doloribus maxime illo. Consequatur placeat placeat debitis quia non officia aut et. Praesentium vero voluptatem et consequuntur omnis quia. Excepturi ut eos beatae distinctio aliquid aliquid id.\n \rAt similique ea eum et excepturi sit ad. Perferendis officia consequatur ab non nemo velit perspiciatis repudiandae inventore. Officia non voluptatibus. Ipsam quo culpa est est eligendi repellendus veritatis quia est. Illo voluptatem ea enim est eum reiciendis et corporis et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=62.978153210372966",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 10,
      name: "Sheila Morissette",
      tel: "954.315.6229",
      address: "56294 Mayer Throughway",
      opening_hours: "08:00",
      description: "Nemo vel doloribus.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=28.405790828392185",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 11,
      name: "Dr. Audie Graham",
      tel: "769.872.5198",
      address: "1288 Turner Keys",
      opening_hours: "08:00",
      description:
        "Consequuntur ab nemo totam libero eaque tempore ab. Qui quis modi unde aspernatur. Neque molestiae officia quia fugit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=90.00786558718991",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 12,
      name: "Johan Krajcik",
      tel: "611.950.7419",
      address: "10110 Margaretta Extension",
      opening_hours: "08:00",
      description:
        "Dolorem eius eum et magni natus quae sequi doloremque sed. Delectus cumque vitae ut corrupti perferendis similique voluptatum. Accusantium tenetur temporibus. Iste sequi minima quam.\n \rUt enim minima expedita quia perferendis libero dolores assumenda. Ut accusantium dolorem. Sapiente sit possimus qui dolore eligendi ipsa. Laudantium eveniet similique accusantium. Harum iusto numquam aliquam et soluta esse qui non.\n \rNon quos autem neque itaque enim laboriosam voluptate dignissimos. Alias iste corporis voluptatem recusandae autem iure. Corporis aut autem qui blanditiis non hic dicta. Aliquid cumque qui laboriosam tempore ut facere molestiae quae.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=58.578392660535464",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 13,
      name: "Jack Kilback",
      tel: "1-712-680-0620",
      address: "242 Stephen Tunnel",
      opening_hours: "08:00",
      description:
        "Tempore doloremque dolore ipsa eum sequi illo. Consequatur similique et sit sed sed quia aperiam iure. Ad unde ipsum voluptas veniam.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=92.85737843417297",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 14,
      name: "Valerie Schowalter",
      tel: "1-815-486-8294 x587",
      address: "29496 Jefferey Junction",
      opening_hours: "08:00",
      description: "recusandae",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.77875071530028",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 15,
      name: "Shaun Von",
      tel: "449-538-5689 x389",
      address: "7326 Schimmel Divide",
      opening_hours: "08:00",
      description:
        "Culpa a voluptas et. Asperiores incidunt mollitia distinctio repudiandae reprehenderit. Quia sed provident tempora laborum dolores unde et. Vel quia eum non. Consectetur architecto officiis consectetur est vero nihil.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=44.98183929895172",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 16,
      name: "Yessenia Hessel",
      tel: "(887) 389-0027",
      address: "402 Becker Causeway",
      opening_hours: "08:00",
      description:
        "Cum id incidunt aut magni. Architecto unde sed ea. Labore laborum velit doloremque qui molestiae officiis molestiae ducimus. Non consequatur repellat. Ipsa voluptate aut fugiat et aperiam.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=44.77038734925796",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 17,
      name: "Ernestina Harber",
      tel: "1-672-299-9810 x47609",
      address: "627 Runte Divide",
      opening_hours: "08:00",
      description:
        "Consequatur consequatur velit adipisci quo maxime voluptatem autem. Debitis eius aut quia rerum repudiandae accusamus aliquid tempora.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=61.66796228135125",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 18,
      name: "Sonny Hackett",
      tel: "563.425.2068 x07354",
      address: "531 Delia Creek",
      opening_hours: "08:00",
      description:
        "Quas officia non qui.\nIpsam dolore est sequi ut est et illo rerum cum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=46.08800657484091",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 19,
      name: "Leila Jacobs",
      tel: "962-600-3837 x198",
      address: "0824 Lavinia Gardens",
      opening_hours: "08:00",
      description: "perferendis et quidem",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=40.45625205843495",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 20,
      name: "Dr. Domenica Mertz",
      tel: "1-166-857-0046 x651",
      address: "070 Prosacco Key",
      opening_hours: "08:00",
      description: "nihil",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=23.256088600888635",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 21,
      name: "Rosa Dibbert",
      tel: "(351) 127-6848",
      address: "186 Bonnie Mountain",
      opening_hours: "08:00",
      description:
        "Quia sequi dolore perferendis voluptatem dolor. Sed eos qui inventore voluptates voluptates. Ut rerum voluptate voluptate error nemo. Doloremque quam eaque est nulla sint id. Delectus aut odit nostrum odit quo.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=64.50706156373802",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 22,
      name: "Melody Osinski",
      tel: "877.389.6578",
      address: "25010 Parisian Meadows",
      opening_hours: "08:00",
      description: "Eius voluptas tenetur ut sit dolore cum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=70.40564476570816",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 23,
      name: "Cristobal Marquardt",
      tel: "(581) 363-0526",
      address: "3507 Briana Squares",
      opening_hours: "08:00",
      description:
        "Id magnam et porro ut. Ea consequatur consectetur quidem dicta. Nostrum quaerat quis laudantium. Magni cumque qui qui aliquid et molestiae voluptatibus deserunt. Quam harum fuga.\n \rMagnam veniam est magnam corporis tempora omnis. Nam in voluptatem dicta molestiae. Vero iste ut quae qui. Accusamus mollitia hic. Harum temporibus praesentium qui incidunt rerum molestias eaque. Commodi et voluptatem odit maiores sit explicabo eum aut.\n \rSaepe rerum minus tempora. Itaque commodi tempora iure qui repellendus perspiciatis in aut assumenda. Et quia ipsa reiciendis consequatur est quod incidunt voluptatem. Ab modi autem non quasi voluptatem. Quaerat adipisci qui consequatur et officiis nam corporis.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=18.930555178245466",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 24,
      name: "Eve Beier",
      tel: "1-972-018-4924",
      address: "4125 Theodora Causeway",
      opening_hours: "08:00",
      description:
        "Recusandae accusantium accusantium non perferendis. Quasi nemo non voluptatum nulla repellat qui et aut. Incidunt omnis qui autem odit consequatur sed rerum. Laboriosam soluta officiis. Ab voluptas dolorum necessitatibus omnis ut nihil consectetur mollitia. Minima excepturi sint.\n \rAt totam id fugit qui. Et in mollitia nihil alias facilis distinctio ad necessitatibus sunt. Aliquid optio quia minus dolores maxime qui et ipsa autem. Eaque voluptas veritatis quos officia illo fugiat delectus.\n \rAliquam porro sunt est corrupti voluptatum rerum. Quas dolor reprehenderit corporis quidem porro. Voluptas porro error et quo.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=4.269681052658836",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 25,
      name: "Susana Haag",
      tel: "543-017-3443 x73165",
      address: "903 Geovanni Branch",
      opening_hours: "08:00",
      description:
        "Omnis consequuntur voluptatibus aut molestiae dolorem sint autem.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=72.30736633630646",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 26,
      name: "Vincent Champlin",
      tel: "741-975-0099",
      address: "671 Murphy Stravenue",
      opening_hours: "08:00",
      description: "voluptas sequi facilis",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=48.07135651852283",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 27,
      name: "Carolina Bailey",
      tel: "925-363-3509 x0214",
      address: "11210 Green Cape",
      opening_hours: "08:00",
      description: "Quis eius odit vel et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=72.06919802583775",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 28,
      name: "Keegan Lubowitz",
      tel: "1-059-232-7168",
      address: "4105 Wilderman Courts",
      opening_hours: "08:00",
      description: "Qui maiores sunt similique adipisci quia iste ipsum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=49.70110171389939",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 29,
      name: "Maye Considine Sr.",
      tel: "1-609-522-2332 x267",
      address: "6922 Graham Trace",
      opening_hours: "08:00",
      description:
        "Voluptas et consequuntur. Voluptates est fugiat. Deleniti dolorum non quod ut velit impedit. Eum quasi perspiciatis molestias voluptates. Quaerat non voluptas nam veniam sit unde id rerum.\n \rConsequatur non eum sit ut dolores vel odit. Nisi minima tempora dolores veniam cumque et eius et ex. Tempora velit in est maiores in explicabo consequatur. Cum iusto fuga quia quibusdam officia dolorem fuga.\n \rEsse suscipit voluptates qui optio iste. Eum nam ut beatae sint. Veritatis iusto quibusdam omnis qui distinctio.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=53.75728621752243",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 30,
      name: "Minerva Reichel",
      tel: "(084) 960-9990",
      address: "505 Grady Prairie",
      opening_hours: "08:00",
      description: "dicta",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=42.72498427048161",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 31,
      name: "Clare Kerluke",
      tel: "(750) 334-4531",
      address: "8356 Randall Park",
      opening_hours: "08:00",
      description:
        "Aliquid eligendi consequatur.\nEst necessitatibus non cupiditate sed enim illum qui voluptatem et.\nNecessitatibus adipisci incidunt.\nUt officia voluptas quo omnis.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=11.81180209484971",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 32,
      name: "Haleigh Bednar",
      tel: "433.659.2151 x390",
      address: "101 Harmony Locks",
      opening_hours: "08:00",
      description:
        "Ipsa ut ut rem inventore eum.\nCupiditate sed quia.\nAperiam nulla molestiae dicta debitis ea nobis est provident esse.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=12.363338902616515",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 33,
      name: "Leonardo Purdy",
      tel: "695-428-5344 x916",
      address: "352 Leffler Cape",
      opening_hours: "08:00",
      description: "Est magnam nihil deserunt et quod voluptates.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=60.3313171292917",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 34,
      name: "Dr. Haylie Aufderhar",
      tel: "009.637.0715 x81325",
      address: "006 Stiedemann Centers",
      opening_hours: "08:00",
      description: "officia omnis consequatur",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=13.545135243159168",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 35,
      name: "Tremaine Conn",
      tel: "881-895-4965",
      address: "1312 Ruecker Terrace",
      opening_hours: "08:00",
      description:
        "Provident vitae necessitatibus consequatur.\nQui facere officia vel debitis molestiae commodi saepe recusandae aut.\nTotam quos veniam sunt.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=49.49665013282429",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 36,
      name: "Stan Sauer",
      tel: "103.780.6393 x783",
      address: "02064 Barrows Island",
      opening_hours: "08:00",
      description: "recusandae voluptatem expedita",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=41.65763754369478",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 37,
      name: "Trace Mraz",
      tel: "878-669-7366",
      address: "8896 Weimann Groves",
      opening_hours: "08:00",
      description: "Nemo dignissimos quo autem quia eligendi distinctio id.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=56.953914496113796",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 38,
      name: "David Eichmann",
      tel: "295.925.4003 x03448",
      address: "57431 Rickie Cliffs",
      opening_hours: "08:00",
      description: "Excepturi excepturi optio nihil et dolore dolor et.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=18.35033175150629",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 39,
      name: "Danny Reinger IV",
      tel: "717.705.0691 x370",
      address: "8985 Heaney Plains",
      opening_hours: "08:00",
      description:
        "Possimus vitae excepturi et quia quam quidem et deserunt voluptatem. Et voluptatem culpa iste quam enim. Maxime libero blanditiis laboriosam perspiciatis.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=4.292749730201262",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 40,
      name: "Macey Haag",
      tel: "1-896-647-7574 x766",
      address: "1892 Beier Orchard",
      opening_hours: "08:00",
      description:
        "Aut aut est qui quia sed maiores necessitatibus quia. Quod id iste vel voluptas et odio pariatur dolorem mollitia. Dolorum labore non esse praesentium aut perferendis repudiandae sapiente sequi.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=11.890825371196701",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 41,
      name: "Napoleon Jacobi",
      tel: "495.108.1360",
      address: "194 Pattie Station",
      opening_hours: "08:00",
      description:
        "Sint id velit iusto voluptas.\nNobis et fugit eaque.\nMaiores hic culpa ut atque.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=38.30642317678981",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 42,
      name: "Torey Douglas PhD",
      tel: "738-141-8461 x491",
      address: "81117 Werner Drives",
      opening_hours: "08:00",
      description:
        "Nulla non est modi ipsam nobis sed. Tenetur laudantium ipsum et sint qui dolor. Quisquam laboriosam fugiat eaque. Ut et odio deserunt alias consequatur eum sit. At incidunt a placeat. Iste ab dolorem est voluptatem quasi sit perspiciatis.\n \rQui unde dolorum qui doloribus ut tempora modi. Consectetur et cumque. Sed et recusandae incidunt cum distinctio sunt.\n \rSed harum eaque sunt quia inventore alias autem. Et ipsa quasi exercitationem sit beatae aut quo itaque provident. Quia et esse quod qui necessitatibus numquam ut. Natus repellendus neque voluptate sed velit ut facere.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=70.97181265908196",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 43,
      name: "Daniella Altenwerth",
      tel: "1-928-285-8312 x75219",
      address: "8103 Gutmann Loop",
      opening_hours: "08:00",
      description:
        "Dolorem voluptates et dolorum. Ea aliquid tempore asperiores voluptatem. Accusantium ut ab et omnis aut autem. Et voluptas fugit.\n \rEt laboriosam repellat modi temporibus ea voluptatibus at. Et adipisci error soluta recusandae excepturi excepturi. Eveniet labore aspernatur blanditiis repellendus ut ut laboriosam.\n \rQuae et veniam corporis nam veniam aut natus officia. Hic unde enim beatae rerum. Asperiores odio ea quia maiores vel exercitationem aut enim voluptas. Soluta provident hic aspernatur ad assumenda consequatur numquam. Nulla natus est voluptatem consectetur natus est. Blanditiis eligendi ullam.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=70.5058348445646",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 44,
      name: "Dr. Penelope Herzog",
      tel: "1-354-874-1898 x1042",
      address: "686 Sporer Manors",
      opening_hours: "08:00",
      description:
        "Rerum commodi eum ratione iste autem ut beatae.\nConsequatur iste quia alias ea.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=94.67350034713431",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 45,
      name: "Christophe Walter",
      tel: "(034) 051-5666 x19818",
      address: "1091 Ashlee Parkways",
      opening_hours: "08:00",
      description:
        "Ut est neque cum vitae. Eligendi nesciunt quia illum neque. Qui dignissimos dolore harum ut odio aut. Error velit quidem distinctio sit. Unde sit cumque delectus. Aut est culpa temporibus laudantium qui praesentium numquam officiis illum.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=5.91759826282805",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 46,
      name: "Ryleigh Jacobson",
      tel: "(195) 204-0645 x7887",
      address: "109 Breitenberg Prairie",
      opening_hours: "08:00",
      description:
        "Laboriosam ea dolorem necessitatibus excepturi consequatur quo atque blanditiis sed. Aut qui perspiciatis corrupti aliquam perferendis tenetur. Aut iste est sunt et saepe ut illum tempore. Asperiores eius dolorum culpa aspernatur cum harum molestiae. Facilis iure modi totam provident veritatis dolores aut ut. Sit unde minima.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=95.39537738346766",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 47,
      name: "Juston Balistreri",
      tel: "(556) 196-6454 x259",
      address: "33274 Ross Square",
      opening_hours: "08:00",
      description:
        "Quibusdam eveniet animi qui qui vero dolore ullam. Sed unde quos. Repellat ad eos hic cum perspiciatis est sed. Earum aut deleniti pariatur. Ut aut nisi doloremque.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=47.19672154951668",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 48,
      name: "Lonzo Senger",
      tel: "097.304.6593 x4589",
      address: "3924 Kuhlman Course",
      opening_hours: "08:00",
      description: "qui dolor debitis",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=77.64767071420388",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 49,
      name: "Fern Schoen MD",
      tel: "915-843-5150 x93449",
      address: "196 Trycia Corners",
      opening_hours: "08:00",
      description: "voluptas",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=8.28627054856048",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
    {
      id: 50,
      name: "Frederic Zieme I",
      tel: "899-435-5462 x5305",
      address: "098 Kuphal Land",
      opening_hours: "08:00",
      description: "et voluptas qui",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=3.255511901931696",
      viewCounts: 0,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-08-09T16:06:07.000Z",
        updatedAt: "2022-08-09T16:06:07.000Z",
      },
    },
  ],
};

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    },
    deleteRestaurant(restaurantId) {
      this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId)
    }
  },
};
</script>