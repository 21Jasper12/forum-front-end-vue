<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img 
        v-if="user.image"
        :src="user.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
        >
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isProcessing"
      >
        {{ isProcessing ? "處理中..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import { Toast } from './../utils/helpers'

export default {
  props: {
    initialUser: {
      type: Object,
      default:() => {
        return {
          name: '',
          image: '',
        }
      }
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: {
        ...this.initialUser
      }
    }
  },
  watch: {
    initialUser(newValue){
      this.user = {
        ...this.user,
        ...newValue
      }
    }
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target
      // console.log('files: ',files)

      if(files.length === 0) {
        this.user.image = ''
      }
      else{
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.image = imageURL
      }
      
    },
    handleSubmit(e) {
      if(!this.user.name.trim()){
        Toast.fire({
          icon: 'warning',
          title: '請填使用者名稱'
        })
        return
      }

      const form = e.target
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  }
}
</script>