<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />

    <template v-else>
      <h1 class="mt-5">
        美食達人
      </h1>
      <hr>
      <div class="row text-center">
        <UserCard 
          v-for="user in users"
          :key="user.id"
          :initial-user="user"
        />
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserCard from '../components/UserCard.vue'
import usersAPI from './../apis/user'
import { Toast } from './../utils/helpers'
import Spinner from './../components/Spinner.vue'

// image手動填入
// const dummyData = {
//     "users": [
//         {
//             "id": 1,
//             "name": "root",
//             "email": "root@example.com",
//             "password": "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//             "isAdmin": true,
//             "image": 'https://yt3.ggpht.com/ytc/AMLnZu9c-6IY6ZG6hKizyBnd4ueOCDKou3N7tAd_AfFI=s88-c-k-c0x00ffffff-no-rj',
//             "createdAt": "2022-08-09T16:06:07.000Z",
//             "updatedAt": "2022-08-09T16:06:07.000Z",
//             "Followers": [],
//             "FollowerCount": 0,
//             "isFollowed": false
//         },
//         {
//             "id": 2,
//             "name": "user1",
//             "email": "user1@example.com",
//             "password": "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//             "isAdmin": false,
//             "image": 'https://yt3.ggpht.com/ytc/AMLnZu-S4I4zSBBHutmGlG74fNgYvtbktHIahSsdIO0X=s88-c-k-c0x00ffffff-no-rj',
//             "createdAt": "2022-08-09T16:06:07.000Z",
//             "updatedAt": "2022-08-09T16:06:07.000Z",
//             "Followers": [],
//             "FollowerCount": 0,
//             "isFollowed": false
//         },
//         {
//             "id": 3,
//             "name": "user2",
//             "email": "user2@example.com",
//             "password": "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
//             "isAdmin": false,
//             "image": 'https://yt3.ggpht.com/ytc/AMLnZu94pMe2Akkzm4q4ElilXOJKlhE9H9xwbGExPr39Nw=s88-c-k-c0x00ffffff-no-rj',
//             "createdAt": "2022-08-09T16:06:07.000Z",
//             "updatedAt": "2022-08-09T16:06:07.000Z",
//             "Followers": [],
//             "FollowerCount": 0,
//             "isFollowed": false
//         }
//     ]
// }

// image測試自動填入(成功)
// const testData = {
//     "users": [
//         {
//             "id": 1,
//             "name": "root",
//             "email": "root@example.com",
//             "password": "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//             "isAdmin": true,
//             "image": null,
//             "createdAt": "2022-08-09T16:06:07.000Z",
//             "updatedAt": "2022-08-09T16:06:07.000Z",
//             "Followers": [],
//             "FollowerCount": 0,
//             "isFollowed": false
//         },
//         {
//             "id": 2,
//             "name": "user1",
//             "email": "user1@example.com",
//             "password": "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//             "isAdmin": false,
//             "image": null,
//             "createdAt": "2022-08-09T16:06:07.000Z",
//             "updatedAt": "2022-08-09T16:06:07.000Z",
//             "Followers": [],
//             "FollowerCount": 0,
//             "isFollowed": false
//         },
//         {
//             "id": 3,
//             "name": "user2",
//             "email": "user2@example.com",
//             "password": "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
//             "isAdmin": false,
//             "image": null,
//             "createdAt": "2022-08-09T16:06:07.000Z",
//             "updatedAt": "2022-08-09T16:06:07.000Z",
//             "Followers": [],
//             "FollowerCount": 0,
//             "isFollowed": false
//         }
//     ]
// }

// image測試資料
// const userImage = [
//   'https://yt3.ggpht.com/ytc/AMLnZu9c-6IY6ZG6hKizyBnd4ueOCDKou3N7tAd_AfFI=s88-c-k-c0x00ffffff-no-rj',
//   'https://yt3.ggpht.com/ytc/AMLnZu-S4I4zSBBHutmGlG74fNgYvtbktHIahSsdIO0X=s88-c-k-c0x00ffffff-no-rj',
//   'https://yt3.ggpht.com/ytc/AMLnZu94pMe2Akkzm4q4ElilXOJKlhE9H9xwbGExPr39Nw=s88-c-k-c0x00ffffff-no-rj'
// ]

export default { 
  components: {
    NavTabs: NavTabs,
    UserCard: UserCard,
    Spinner: Spinner,
  },

  data() {
    return {
      users: [],
      isLoading: true
    }
  },
  methods: {
    // 原先資料
    async fetchUsers () {
      try{
        this.isLoading = true
        const response = await usersAPI.getTopUsers()

        const { users } =response.data

        console.log(response.data)
        
        this.users = users.map(user => {
          return {
            id: user.id,
            name: user.name,
            image: user.image,
            followerCount: user.FollowerCount,
            isFollowed: user.isFollowed
          }
        })

        this.isLoading = false
      }
      catch(error){
        this.isLoading = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人，請稍後再試'
        })
      }
    },

    // 測試自動填入
    // test() {
    //   this.users =  testData.users
    //   this.imagein(userImage)
    // },
    // imagein(img) {
    //   for(let i = 0; i < img.length; i++){
    //     this.users[i].image = img[i]
    //   }
    // }
  },
  created() {
    this.fetchUsers()
    // this.test()
  }

}
</script>