import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as fb from '../firebase'

Vue.use(Vuex)

fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id
    postArray.push(post)
  })

  store.commit('setPosts', postArray)
})

fb.likesCollection.onSnapshot(snapshot => {
  let likesArray = []

  snapshot.forEach(doc => {
    let like = doc.data()
    like.id = doc.id
    likesArray.push(like)
  })

  store.commit('setLikes', likesArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {name:'ivan'},
    errorGlobal: '',
    posts: [],
    likes: []
  },
  mutations: {
    setUserProfile(state, user) {
      state.userProfile = user
    },
    setErrorGlobal(state, msg) {
      state.errorGlobal = msg
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setLikes(state, likes) {
      state.likes = likes
    }
  },
  actions: {
    async login({dispatch}, form) {
      this.commit('setErrorGlobal', '')
      try {
        const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        dispatch('fetchUserProfile', user)
      } catch(err) {
        this.commit('setErrorGlobal', err.message)
      }
    },
    async logout({commit}) {
      await fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/login')
    },
    async register({dispatch}, form) {
      this.commit('setErrorGlobal', '')
      try {
        const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
        await fb.usersCollection.doc(user.uid).set({
          name: form.name
        })
        dispatch('fetchUserProfile', user)
      } catch(err) {
        this.commit('setErrorGlobal', err.message)
      }
    },
    async fetchUserProfile( {commit}, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      if(router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async createPost({state}, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async likePost({commit}, post) {
      console.log(commit);
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`
      const doc = await fb.likesCollection.doc(docId).get()
      if(doc.exists) {
        fb.likesCollection.doc(docId).delete()
        await fb.postsCollection.doc(post.id).update({
          likes: post.likes - 1
        })
        return
      }
      try {
        await fb.likesCollection.doc(docId).set({
          postId: post.id,
          userId: userId
        })
        await fb.postsCollection.doc(post.id).update({
          likes: post.likes + 1
        })
      } catch(err) {
        this.commit('setErrorGlobal', err.message)
      }
      
    }
  },
  modules: {
  }
})

export default store