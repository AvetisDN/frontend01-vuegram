import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBVudWCklGhuy9Y4wWAG8XBsi0hARFpBZ4",
    authDomain: "vuegram-7cb4b.firebaseapp.com",
    projectId: "vuegram-7cb4b",
    storageBucket: "vuegram-7cb4b.appspot.com",
    messagingSenderId: "125142239087",
    appId: "1:125142239087:web:c71cd8002b3ae80df68a9a"
};
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}