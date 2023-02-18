import { createStore } from 'vuex'
// import user from './modules/user'
// import content from './modules/content'
import profile from './modules/profile.js'
import content from './modules/content.js'

export default createStore({
    modules: {
        profile,
        content
    },
})
