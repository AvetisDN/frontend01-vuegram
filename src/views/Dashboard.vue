<template>
  <div id="dashboard">

    <div class="modal" v-if="showPostModal">
      <div class="dummy" @click="closePostModal()"></div>
      <div class="modal-content modal-content-wide">
            <div class="close" @click="closePostModal()">&times;</div>
            <div class="post">
            <h5>{{fullPost.userName}}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{fullPost.content}}</p>
            <ul>
              <li>
                <a href="!" @click.prevent="toggleCommentModal(fullPost)" title="Add a comment">
                  <i class="icofont-speech-comments active"></i>  
                  {{fullPost.comments}}
                </a>
              </li>
              <li>
                <a href="!" @click.prevent="likePost(fullPost)">
                  <i class="icofont-heart" :class="{active: didILike(fullPost.id)}"></i>
                  {{fullPost.likes}}
                </a>
              </li>
            </ul>
            <div v-if="postComments.length">
              <div v-for="comment in postComments" :key="comment.id" class="comment" 
                  :class="{
                            author: comment.postId == fullPost.id, 
                            my: comment.userId == getMyId
                          }">
                <h6>
                  {{comment.userName}}
                </h6>
                <span>
                  {{comment.createdOn | formatDate}}
                </span>
                <p>
                  {{comment.content}}
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>

    <comment-modal v-if="showComment" :post="selectedPost" @close="toggleCommentModal()"></comment-modal>

    <p v-if="getError !== ''" class="error">
        {{getError}}
    </p>
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent="createPost()">
              <textarea v-model.trim="post.content" maxlength="300"></textarea>
              <p class="counter" :class="{ warning: post.content.length > 250 }">{{300 - post.content.length}} symbols left</p>
              <button type="submit" class="button">Post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div>
          <div v-if="posts.length > 0">
            <div class="post" v-for="post in posts" :key="post.id">
              <h5>{{post.userName}}</h5>
              <span>{{ post.createdOn | formatDate }}</span>
              <p>{{post.content | trimPost}}</p>
              <ul>
                <li>
                  <a href="!" @click.prevent="toggleCommentModal(post)" title="Add a comment">
                    <i class="icofont-speech-comments active"></i>  
                    {{post.comments}}
                  </a>
                </li>
                <li>
                  <a href="!" @click.prevent="likePost(post)">
                    <i class="icofont-heart" :class="{active: didILike(post.id)}"></i>
                    {{post.likes}}
                  </a>
                </li>
                <li>
                  <a href="!" @click.prevent="viewPost(post)">View full post</a>
                </li>
              </ul>
            </div>
          </div>
          <p v-else class="no-results">
            Nothing found
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
import CommentModal from '../components/CommentModal'
import {auth, commentsCollection} from '../firebase'
export default {
  data() {
    return {
      post: {
        content: '',
      },
      showComment: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: []
    }
  },
  components: {
    CommentModal,
  },
  computed: {
    ...mapState(['userProfile', 'posts', 'likes', 'errorGlobal']),
    getError() {
      return this.errorGlobal
    },
    getMyId() {
      return auth.currentUser.uid
    }
  },
  methods: {
    createPost() {
      this.$store.dispatch('createPost', this.post)
      this.post.content = ''
    },
    toggleCommentModal(post) {
      this.selectedPost = post || {}
      this.showComment = !this.showComment
    },
    likePost(post) {
      this.$store.dispatch('likePost', post)
    },
    didILike(postId) {
      return this.likes.filter(like => like.id === `${auth.currentUser.uid}_${postId}`).length > 0
    },
    async viewPost(post) {
      const docs = await commentsCollection.where('postId', '==', post.id).get()
      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })
      this.showPostModal = true
      this.fullPost = post

    },
    closePostModal() {
      this.showPostModal = false
      this.postComments = []
      this.fullPost = {}
    },
  },
  filters: {
    formatDate(date) {
      if(!date) return '---'

      date = date.toDate()
      return moment(date).fromNow()
    },
    trimPost(content) {
      if(content.length > 100) return `${content.substr(0,100)}...`
      return content
    }
  }
}
</script>

<style lang="scss" scoped>
</style>