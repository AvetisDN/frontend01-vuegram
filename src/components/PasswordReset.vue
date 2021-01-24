<template>
  <div class="modal">
      <div class="dummy" @click="$emit('close')"></div>
      <div class="modal-content">
            <div class="close" @click="$emit('close')">&times;</div>
            <h3>Reset Password</h3>
            <div v-if="!showSuccess">
                <p>
                    Enter your E-Mail to reset password
                </p>
                <form @submit.prevent="resetPassword()">
                    <input type="email" required v-model.trim="email" placeholder="yourname@email.com">
                    <p v-if="error !== ''" class="error">
                        {{error}}
                    </p>
                    <button class="button">Reset</button>
                </form>
            </div>
            <p v-else class="success">
                Succes! Check your E-Mail please.
            </p>
      </div>
  </div>
</template>

<script>
import {auth} from '../firebase'
export default {
    data() {
        return {
            email: '',
            error: '',
            showSuccess: false
        }
    },
    methods: {
        async resetPassword() {
            this.error = ''

            try {
                await auth.sendPasswordResetEmail(this.email)
                this.showSuccess = true
            } catch(err) {
                this.error = err.message
            }
        }
    }
}
</script>

<style>

</style>