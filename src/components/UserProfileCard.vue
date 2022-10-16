<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.image | emptyImage" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ profile.name }}</h5>
          <p class="card-text">{{ profile.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ profile.commentCount }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ profile.favoriteRestaurantCount }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ profile.followingCount }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ profile.followerCount }}</strong> followers (追隨者)
            </li>
          </ul>
          <p></p>
          <p 
            v-if="profile.id === currentUser.id"
            class="mt-3"
          >
            <router-link
              type="button"
              class="btn btn-primary"
              :to="{ name:'user-edit', params:{ id: profile.id } }"
            >
              Edit
            </router-link>
          </p>
          <p 
            v-else
            class="mt-3"
          >
            <button 
              v-if="profile.isFollowed"
              type="button" 
              class="btn btn-danger"
              :disabled="isProcessing"
              @click.stop.prevent="deleteFollowing(profile.id)"
            >
              取消追蹤
            </button>

            <button
              v-else 
              type="button" 
              class="btn btn-primary"
              :disabled="isProcessing"
              @click.stop.prevent="addFollowing(profile.id)"
            >
              追蹤
            </button>
          </p>
          <p></p>
        </div>
      </div>
    </div>
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
    initialProfile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      profile: this.initialProfile,
      isProcessing: false
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialProfile(newValue){
      this.profile = {
        ...this.profile,
        ...newValue
      }
    }
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
        this.profile = {
          ...this.profile,
          isFollowed: true,
        }
        this.profile.followerCount += 1

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
        this.profile = {
          ...this.profile,
          isFollowed: false
        }
        this.profile.followerCount -= 1

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error( error.message)

        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    }
  }
};
</script>