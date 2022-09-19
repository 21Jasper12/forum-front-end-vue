<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <table class="table">
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
              @click.stop.prevent="changeUserRole(user.id)"
            >
              set as user
            </button>

            <button 
              type="button"  
              class="btn btn-link"
              v-if="user.id !== 1 && !user.isAdmin"
              @click.stop.prevent="changeUserRole(user.id)"
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
import AdminNav from "./../components/AdminNav.vue";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$TEKu6P6o2zOgIn6agZIqJeG6Y4vA43KCQAajh0QMr3Y7b82xmm8sK",
      isAdmin: true,
      image: null,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$BEmxg9Eet19yTpB3ExIfOuQDxIiFHLQ2hleOnbe7vbQ1QmGAGr4Ly",
      isAdmin: false,
      image: null,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$QdqsfYDvkxUNdmHkFP1ia.yQeTT/czAWATuNJfy9WgjtpI35aGopO",
      isAdmin: false,
      image: null,
      createdAt: "2022-08-09T16:06:07.000Z",
      updatedAt: "2022-08-09T16:06:07.000Z",
    },
  ],
};

export default {
  components: {
    AdminNav,
  },
  data () {
    return {
      users: []
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.users = dummyData.users
    },
    // 改變user登入狀態
    changeUserRole(userId) {
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
    }
  },
  filters: {
    changeTagName(item) {
      return item ? 'admin' : 'user'
    }
  }
};
</script>