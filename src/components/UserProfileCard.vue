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
          <p class="mt-3">
            <router-link
              type="button"
              class="btn btn-primary"
              :to="{ name:'user-edit', params:{ id: profile.id } }"
            >
              Edit
            </router-link>
          </p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

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
    };
  },
};
</script>