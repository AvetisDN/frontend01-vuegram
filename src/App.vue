<template>
  <div id="app">
    <nav-bar v-if="showNav"/>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import NavBar from './components/NavBar'

export default {
  components: { NavBar },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 0
    }
  }
}
</script>

<style lang="scss">
</style>
