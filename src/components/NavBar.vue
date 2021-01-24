<template>
  <header>
      <section>
        <router-link to="/">
            <h3>VueGram</h3>
        </router-link>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/settings">Settings</router-link>
            </li>
            <li>
                <a href="!" @click.prevent="logout()" class="button button-logout">
                    Logout
                </a>
            </li>
        </ul>
      </section>
  </header>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style>

</style>