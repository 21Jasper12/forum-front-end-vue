<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div
      v-for="comment in restaurantComments"
      :key="comment.id"
    >
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          :disabled="isProcessing"
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >
          Delete
        </button>
        <h3>
          <a href="#">
            {{ comment.User.name }}
          </a>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow}}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>

import { fromNowFilter } from './../utils/mixins'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'


// 串接store後就可以把假資料刪除
// const dummyUser = {
//   currentUser: {
//     id: 1,
//     name: '管理者',
//     email: 'root@example.com',
//     image: 'https://i.pravatar.cc/300',
//     isAdmin: true
//   },
//   isAuthenticated: true
// }

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async handleDeleteButtonClick (commentId) {
      try{
        this.isProcessing = true
        const { data } = await restaurantsAPI.deleteComment({commentId})

        if(data.status !== 'success'){
          throw new Error(data.message)
        }
        // console.log('handleDeleteButtonClick', commentId)
        // // TODO: 請求 API 伺服器刪除 id 為 commentId 的評論
        // // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit('after-delete-comment', commentId)

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法刪除評論，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>