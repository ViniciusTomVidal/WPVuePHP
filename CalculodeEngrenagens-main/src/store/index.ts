import {createStore} from 'vuex'
import VuexCalculadora from './modules/VuexCalculadora.js'

const store = createStore({
    modules: {
        VuexCalculadora
    }
})

export default store