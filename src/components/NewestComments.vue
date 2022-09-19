<template>
  <div class="card">
    <div class="card-header">
      最新評論
    </div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4>
          <router-link
            :to="{ name: 'restaurant-show', params: { id: comment.Restaurant.id } }"
          >
            {{ comment.Restaurant.name }}
          </router-link>
        </h4>
        <p>{{ comment.text }}</p>by
        <router-link
          :to="{ name: 'user-profile', params: { id: comment.User.id } }"
        >
          {{comment.User.name}}
        </router-link>
        {{ comment.createdAt | fromNow }}
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
  // 原版
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
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>