<template>
  <section id='settings'>
    <div class="col">
      <h3>Settings</h3>
      <p>Update profile</p>

      <p v-if="showSuccess" class="success">profiled updated successfully</p>

      <form @submit.prevent="updateProfile()">

        <label for="name">Name</label>
        <input type="text" id="name" v-model.trim="name">

        <button class="button" type="submit">Save Profile</button>

      </form>

    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      name: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name
      })
      this.name = ''
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>