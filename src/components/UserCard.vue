<template>
  <div class="col-3">
    <router-link
      :to="{ name: 'user-profile', params: { id: user.id } }"
    >
      <img
        :src="user.image | emptyImage"
        width="140px"
        height="140px"
      />
    </router-link>
    <h2>{{ user.name }}</h2>
    <span class="badge badge-secondary">追蹤人數 : {{user.followerCount}}</span>
    <p 
      v-if="user.id !== currentUser.id"
      class="mt-3"
    >
      <button 
        v-if="user.isFollowed"
        type="button" 
        class="btn btn-danger"
        :disabled="isProcessing"
        @click.stop.prevent="deleteFollowing(user.id)"
      >
        取消追蹤
      </button>

      <button
        v-else 
        type="button" 
        class="btn btn-primary"
        :disabled="isProcessing"
        @click.stop.prevent="addFollowing(user.id)"
      >
        追蹤
      </button>
    </p>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import usersAPI from './../apis/user'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  mixins:[emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      user: this.initialUser,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async addFollowing(userId) {
      try{
        this.isProcessing = true
        const { data } = await usersAPI.addFollowing({ userId })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }

        // 這邊跟教案會有點不同，因為我是用components來顯示User，而教案是直接在UserTop上面直接跑v-for不帶components
        this.user = {
          ...this.user,
          isFollowed: true,
        }
        this.user.followerCount += 1

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async deleteFollowing(userId) {
      try{
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollowing({ userId })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }

        // 這邊跟教案會有點不同，因為我是用components來顯示User，而教案是直接在UserTop上面直接跑v-for不帶components
        this.user = {
          ...this.user,
          isFollowed: false
        }
        this.user.followerCount -= 1

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    }
  }
}
</script>