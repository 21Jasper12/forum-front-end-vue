import { apiHelper } from "../utils/helpers"

export default {
  // 取得單獨餐廳的詳細資料
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },

  // 刪除評論
  deleteComment({ commentId }){
    return apiHelper.delete(`/comments/${commentId}`)
  },
  // 新增評論
  createComment({ restaurantId, text}){
    return apiHelper.post('/comments', {restaurantId, text})
  },

  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getFeeds(){
    return apiHelper.get('/restaurants/feeds')
  },
  getTopRestaurants(){
    return apiHelper.get('/restaurants/top')
  }
}