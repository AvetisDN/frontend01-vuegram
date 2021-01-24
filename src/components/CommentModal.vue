<template>
  <div class="modal">
      <div class="dummy" @click="$emit('close')"></div>
      <div class="modal-content">
            <div class="close" @click="$emit('close')">&times;</div>
            <h3>Add a comment</h3>
            <p></p>
            <div>
                <form @submit.prevent="addComment()">
                    <textarea v-model.trim="comment" required placeholder="Your comment..."></textarea>
                    <p v-if="error !== ''" class="error">
                        {{error}}
                    </p>
                    <button class="button">Submit your comment</button>
                </form>
            </div>
      </div>
  </div>
</template>

<script>
import {commentsCollection, postsCollection, auth} from '../firebase'
export default {
    props: ['post'],
    data() {
        return {
            comment: '',
            error: ''
        }
    },
    methods: {
        async addComment() {
            try {
                await commentsCollection.add({
                    createdOn: new Date(),
                    content: this.comment,
                    postId: this.post.id,
                    userId: auth.currentUser.uid,
                    userName: this.$store.state.userProfile.name
                })
                await postsCollection.doc(this.post.id).update({
                    comments: parseInt(this.post.comments) + 1
                })
                this.$emit('close')
            } catch(err) {
                this.error = err.message
            }
        }
    }
}
</script>

<style>

</style>