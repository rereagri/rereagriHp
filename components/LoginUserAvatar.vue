<template>
  <div class="page">
    <form
      class="form"
      @submit.prevent="submitImg"
    >
      <input
        type="file"
        accept="img/*"
        @change="changeImg"
      >
      <button
        type="submit"
        class="button"
      >
        click
      </button>
      <div>
        <v-list-item-avatar>
          <v-img :src= "postData.thumbnail" alt="" />
        </v-list-item-avatar>
        <!-- <img :src="postData.thumbnail" alt="">
        <img :src="postData.thumbnail" alt=""> -->
      </div>
    </form>
    <div>
      <button
        class="button"
        @click="getImg"
      >
        取得
      </button>
      <img :src="getThumbnail" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      thumbnail: '',
      postData: {
        thumbnail: ''
      }
    }
  },
  computed: {
    getThumbnail () {
      return this.$store.getters.thumbnail
    }
  },
  methods: {
    changeImg (e) {
      this.thumbnail = e.target.files[0]
      if (this.thumbnail) {
        const reader = new FileReader()
        reader.readAsDataURL(this.thumbnail)
        reader.onload = () => {
          this.postData.thumbnail = reader.result + ''
        }
      }
    },
    submitImg () {
      this.$store.dispatch('submit', this.thumbnail)
    },
    getImg () {
      this.$store.dispatch('getImg')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
