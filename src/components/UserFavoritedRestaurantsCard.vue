<template>
  <div class="card">
    <div class="card-header"><strong>{{ favoritedrestaurants.length }}</strong> 收藏的餐廳</div>
    <div class="card-body">
      <router-link
        v-for="favoritedrestaurant in favoritedrestaurants"
        :key="favoritedrestaurant.id"
        :to="{ name: 'restaurant-show', params: { id: favoritedrestaurant.id }}"
      >
        <img
          :src="favoritedrestaurant.image | emptyImage"
          width="60"
          height="60"
          class="avatar"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

export default {
  mixins:[emptyImageFilter],
  props: {
    favoritedrestaurants: {
      type: Array,
      required: true
    }
  }
}
</script>