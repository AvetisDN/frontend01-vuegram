<template>
  <div id="login">
      <password-reset v-if="showReset" @close="toggleResetForm()"></password-reset>
      <div class="container">
        <div class="col1">
          <h1>VUEGRAM</h1>
          <p>
            Simple VUE + FIREBASE "social media"-like application
          </p>
        </div>
        <div class="col2">
          <form @submit.prevent="login()" v-if="showLogin">
            <h3>Welcome back</h3>
            <div>
              <label for="email">Email</label>
              <input type="email" required placeholder="yourname@email.com" id="email" v-model.trim="loginForm.email">
            </div>
            <div>
              <label for="password">Password</label>
              <input type="password" required placeholder="password" id="password" v-model.trim="loginForm.password">
            </div>
            <p v-if="getError !== ''" class="error">
                {{getError}}
            </p>
            <button class="button" type="submit">Log In</button>
            <div class="extras">
              <a href="!" @click.prevent="toggleResetForm()">Forgot password</a>
              <a href="!" @click.prevent="toggleRegisterForm()">Create an account</a>
            </div>
          </form>

          <form @submit.prevent="register()" v-else>
            <h3>Create an account</h3>
            <div>
              <label for="name2">Name</label>
              <input type="text" required placeholder="Username" id="name2" v-model.trim="registerForm.name">
            </div>
            <div>
              <label for="email2">Email</label>
              <input type="email" required placeholder="yourname@email.com" id="email2" v-model.trim="registerForm.email">
            </div>
            <div>
              <label for="password2">Password</label>
              <input type="password" required placeholder="password" id="password2" v-model.trim="registerForm.password">
            </div>
            <p v-if="getError !== ''" class="error">
                {{getError}}
            </p>
            <button class="button" type="submit">Create Account</button>
            <div class="extras">
              <a href="!" @click.prevent="toggleResetForm()">Forgot password</a>
              <a href="!" @click.prevent="toggleRegisterForm()">Already have account</a>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import PasswordReset from '../components/PasswordReset'
export default {
  data() {
    return {
      showLogin: true,
      showReset: false,
      error: '',
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  components: {
    PasswordReset,
  },
  computed: {
    getError() {
      return this.$store.state.errorGlobal
    }
  },
  methods: {
    toggleRegisterForm() {
      this.showLogin = !this.showLogin
    },
    toggleResetForm() {
      this.showReset = !this.showReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    register() {
      this.$store.dispatch('register', {
        email: this.registerForm.email,
        password: this.registerForm.password,
        name: this.registerForm.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>