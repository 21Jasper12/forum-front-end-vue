<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <Spinner v-if="isLoading" />

    <table 
      v-else
      class="table"
    >
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin | changeTagName }}</td>
          <td>
            <button 
              type="button"  
              class="btn btn-link"
              v-if="user.id !== 1 && user.isAdmin"
              :disabled="isProcessing"
              @click.stop.prevent="changeUserRole({userId: user.id, isAdmin: !user.isAdmin})"
            >
              set as user
            </button>

            <button 
              type="button"  
              class="btn btn-link"
              v-if="user.id !== 1 && !user.isAdmin"
              :disabled="isProcessing"
              @click.stop.prevent="changeUserRole({userId: user.id, isAdmin: !user.isAdmin})"
            >
              set as admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav.vue"
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import Spinner from './../components/Spinner.vue'

// 串接API後就可以刪除了
// const dummyData = {
//   users: [
//     {
//       id: 1,
//       name: "root",
//       email: "root@example.com",
//       password: "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
//       isAdmin: true,
//       image: null,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//     },
//     {
//       id: 2,
//       name: "user1",
//       email: "user1@example.com",
//       password: "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
//       isAdmin: false,
//       image: null,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//     },
//     {
//       id: 3,
//       name: "user2",
//       email: "user2@example.com",
//       password: "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
//       isAdmin: false,
//       image: null,
//       createdAt: "2022-08-09T16:06:07.000Z",
//       updatedAt: "2022-08-09T16:06:07.000Z",
//     },
//   ],
// };

export default {
  components: {
    AdminNav,
    Spinner,
  },
  data () {
    return {
      users: [],
      isLoading: true,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try{
        this.isLoading = true
        const { data } = await adminAPI.users.get()

        this.users = data.users

        this.isLoading = false
      }
      catch(error){
        this.isLoading = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試'
        })
      }
    },
    // 改變user登入狀態
    async changeUserRole({ userId, isAdmin}) {
      try{
        this.isProcessing = true
        const { data } = await adminAPI.users.userRole({
          userId,
          isAdmin: isAdmin.toString() //將布林狀態改成字串，後端這部分只接受字串
        })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }

        this.users = this.users.map(user => {
          if(user.id === userId){
            return {
              ...user,
              isAdmin: !user.isAdmin
            }
          }
          else{
            return user
          }
        })

        this.isProcessing = false
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法更改狀態，請稍後再試'
        })
      }
    }
  },
  filters: {
    changeTagName(item) {
      return item ? 'admin' : 'user'
    }
  }
};
</script>