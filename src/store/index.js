import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response.data 顯示出來
        const { data } = await usersAPI.getCurrentUser()
        // console.log('data', data)

        const { id, name, email, image, isAdmin } = data

        // 在 actions 中可以透過參數的方式取得 commit 的方法
        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })

        return true
      } 
      catch (error) {
        console.error(error.message)

        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')

        return false
      }
    }
  },
  modules: {
  }
})
