<template>
  <div class="container py-5">
    <AdminRestaurantForm 
      :initial-restaurant="restaurant"
      @after-submit="handleAfterSubmit" 
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";

const dummyData = {
  restaurant: {
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
};

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
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log('restaurantId', restaurantId)
      const { restaurant } = dummyData
      this.restaurant = {
        // 可加(確保資料結構)或不加
        // ...this.restaurant,
        id: restaurant.id,
        name: restaurant.name,
        categoryId: restaurant.CategoryId,
        tel: restaurant.tel,
        address: restaurant.address,
        description: restaurant.description,
        image: restaurant.image,
        openingHours: restaurant.opening_hours,
      }
    },
    handleAfterSubmit(formData) {
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
};
</script>