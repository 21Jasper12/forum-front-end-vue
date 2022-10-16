import { apiHelper } from "../utils/helpers";

export default {
  categories: {
    get() {
      return apiHelper.get('/admin/categories')
    },

    create({ name }){
      return apiHelper.post('/admin/categories', {name})
    },
    deleteCategory({ categoryId }){
      return apiHelper.delete(`/admin/categories/${categoryId}`)
    },
    editCategory({ categoryId, name }){
      return apiHelper.put(`/admin/categories/${categoryId}`, {name})
    }
  },

  restaurants: {
    // AdminRestaurantEdit
    getDetail({ restaurantId }){
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },

    update({ restaurantId, formData}){
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    },

    // AdminRestaurantNew
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData)
    },

    // AdminRestaurantsTable
    getRestaurants(){
      return apiHelper.get('/admin/restaurants')
    },

    deleteRestaurant({ restaurantId }){
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    }
  },

  users: {
    get() {
      return apiHelper.get('/admin/users')
    },
    userRole({ userId, isAdmin }){
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin })
    }
  }
}