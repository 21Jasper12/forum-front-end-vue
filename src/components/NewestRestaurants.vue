<template>
  <div class="card">
    <div class="card-header">
      最新餐廳
    </div>
    <div class="card-body">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <h4>
          <router-link
            :to="{ name: 'restaurant-show', params: { id: restaurant.id }}"
          >
            {{ restaurant.name }}
          </router-link>
          &nbsp;
          <small>{{ restaurant.Category ? restaurant.Category.name : '未分類'
 }}</small>
        </h4>
        <p>{{ restaurant.description }}</p>
        {{ restaurant.createdAt | fromNow }}
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
// 先將 moment 載入進來(原版)，下面是用mixins匯入
// import moment from 'moment'
import {fromNowFilter} from "../utils/mixins.js"

export default {
  // filters: {
  //   fromNow (datetime) {
  //     if (!datetime) {
  //       return '-'
  //     }
  //     else {
  //       // 使用 moment 提供的 fromNow 方法
  //       return moment(datetime).fromNow()
  //     }
  //   }
  // },
  mixins: [fromNowFilter],
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
small {
  font-size: 10px;
}
</style>