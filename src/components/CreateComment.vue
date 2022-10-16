<template>
  <form
    @submit.stop.prevent="handleSubmit"
  >
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea
        class="form-control"
        rows="3"
        name="text"
        v-model="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >回上一頁</button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
        :disabled="isProcessing"
      >
        {{ isProcessing ? '處理中...' : 'Submit' }}
      </button>
    </div>
  </form>
</template>

<script>
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      text: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try{
        this.isProcessing = true
        const { data } = await restaurantsAPI.createComment({
          restaurantId: this.restaurantId,
          text: this.text
        })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }
        
        // console.log('submit form') 測試
        // TODO: 向 API 發送 POST 請求
        // 伺服器新增 Comment 成功後...
        this.$emit('after-create-comment',{
          commentId: data.commentId, // 尚未串接 API 暫時使用隨機的 id
          restaurantId: this.restaurantId,
          text: this.text
        })
        this.text = '' // 將表單內的資料清空

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法新增評論，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>