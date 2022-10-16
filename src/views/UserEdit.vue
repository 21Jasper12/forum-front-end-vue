<template>
  <!-- UserEditForm components -->
  <UserEditForm 
    :initial-user="user"
    :is-processing="isProcessing"
    @after-submit="handleAfterSubmit"
  />
</template>

<script>
import UserEditForm from "./../components/UserEditForm.vue";
import usersAPI from './../apis/user'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

// 串接API後就能刪除假資料了

export default {
  components: {
    UserEditForm,
  },
  data() {
    return {
      user: {
        id: -1,
        name: '',
        image: ''
      },
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    }
  },
  beforeRouteUpdate(to, from, next){

    const { id: userId } = to.params
    this.setUser(userId)
    next()
  },
  created() {
    const { id: userId } = this.$route.params
    this.setUser(userId)
  },
  methods: {
    setUser(userId) {
      if(this.currentUser.id !== Number(userId) ){
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料'
        })

        this.$router.push({ name: 'not-found' })
        return
      }

      this.user = {
        ...this.user,
        ...this.currentUser
      }
    },
    async handleAfterSubmit(formData) {
      try{
        this.isProcessing = true
        const { data } = await usersAPI.update({
          userId: this.user.id,
          formData
        })

        if(data.status !== 'success'){
          throw new Error(data.message)
        }

        // 送出表單後轉址
        this.$router.push({ name: 'user-profile' })

        // 還沒使用API串接
        // for(let [name, value] of formData.entries()){
        //   console.log(`${name} : ${value}`)
        // }
      }
      catch(error){
        this.isProcessing = false
        console.error(error.message)

        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
      }
    }
  }
};
</script>