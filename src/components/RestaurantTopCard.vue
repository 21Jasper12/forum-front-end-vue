<template>
  <div
      class="card mb-3"
      style="max-width: 540px;margin: auto;"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link
            :to="{name: 'restaurant-show', params: { id: restaurant.id } }"
          >
            <img
              class="card-img"
              :src="restaurant.image | emptyImage"
            >
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge badge-secondary">收藏數 : {{ restaurant.FavoriteCount }}</span>
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link
              class="btn btn-primary mr-2"
              :to="{name: 'restaurant-show', params: { id: restaurant.id } }"
            >
            Show
            </router-link>

            <button
              type="button"
              class="btn btn-danger mr-2"
              v-if="restaurant.isFavorited"
              :disabled="isProcessing"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
            >
              移除最愛
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-else
              :disabled="isProcessing"
              @click.stop.prevent="addFavorite(restaurant.id)"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import usersAPI from './../apis/user'
import { Toast } from './../utils/helpers'

export default {
  mixins:[emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false
    }
  },
  methods: {
    async addFavorite(restaurantId) {
      try{
        this.isProcessing = true
        const { data } = await usersAPI.addFavorite({ restaurantId })
        
        if(data.status !== 'success'){
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant, // 保留餐廳內原有資料
          isFavorited: true
        }
        this.restaurant.FavoriteCount += 1

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      try{
        this.isProcessing = true
        const { data } = await usersAPI.deleteFavorite({ restaurantId })
        
        if(data.status !== 'success'){
          throw new Error(data.message)
        }
        
        this.restaurant = {
          ...this.restaurant, // 保留餐廳內原有資料
          isFavorited: false
        }
        this.restaurant.FavoriteCount -= 1

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除最愛，請稍後再試'
        })
      }
    }
  }
}
</script>