<template>
  <main role="main">
    <div class="album py-5 bg-light">
      <Spinner v-if="isLoading" />

      <div 
        class="container"
        v-else
      >
        <!-- User資訊 UserProfileCard -->
        <UserProfileCard :initial-profile="profile"/>

        <div class="row">
          <div class="col-md-4">
            <!-- 追蹤者avatar顯示 UserFollowingsCard -->
            <UserFollowingsCard :followings="Followings"/>

            <br />

            <!-- 追隨者avatar顯示 UserFollowersCard -->
            <UserFollowersCard :followers="Followers"/>

          </div>
          <div class="col-md-8">
            <!-- 評論餐廳avatar顯示 UserCommentsCard -->
            <UserCommentsCard :comments="Comments"/>

            <br />

            <!-- 收藏餐廳avatar顯示 UserFavoritedRestaurantsCard -->
            <UserFavoritedRestaurantsCard :favoritedrestaurants="FavoritedRestaurants"/>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard.vue";
import UserFollowingsCard from '../components/UserFollowingsCard.vue'
import UserFollowersCard from '../components/UserFollowersCard.vue'
import UserCommentsCard from '../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from '../components/UserFavoritedRestaurantsCard.vue'
import usersAPI from './../apis/user'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'


export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner
  },

  data() {
    return {
      profile: {
        id: -1,
        name: "",
        email: "",
        image: "",
        commentCount: 0,
        favoriteRestaurantCount: 0,
        followerCount: 0,
        followingCount: 0,
        isFollowed: false,
        isAdmin: false,
      },
      Comments: [],
      FavoritedRestaurants: [],
      Followers: [],
      Followings: [],
      isLoading: true
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate(to, from, next){
    const { id: userId } = to.params
    this.fetchProfile(userId)
    next()
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchProfile(userId);
  },
  methods: {
    async fetchProfile(userId) {
      try{
        this.isLoading = true
        const { data } = await usersAPI.get({userId})

        console.log(data)
        const {
          id,
          name,
          email,
          image,
          Comments,
          FavoritedRestaurants,
          Followers,
          Followings,
          isAdmin
        } = data.profile;

        this.profile = {
          id,
          name,
          email,
          image,
          isAdmin,
          commentCount: Comments.length,
          favoriteRestaurantCount: FavoritedRestaurants.length,
          followerCount: Followers.length,
          followingCount: Followings.length,
          isFollowed: data.isFollowed,
        };

        this.Comments = Comments;
        this.FavoritedRestaurants = FavoritedRestaurants
        this.Followers = Followers
        this.Followings = Followings

        this.isLoading = false
      }
      catch(error){
        this.isLoading = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
  },
};
</script>