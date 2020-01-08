import Vue from "vue";
import App from "./App.vue";
import router from './router'
import './plugins/element.js'
import Vuex from 'vuex'
import store from './store'
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import moment from "moment"
import VueMomentJS from "vue-momentjs"

Vue.use(Vuex)
Vue.use(bootstrap)
Vue.use(VueMomentJS, moment)

// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    if(sessionStorage.getItem("userInfo")){
        this.$store.state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        this.$store.state.isLogin = true
        this.$store.state.isLoginError = false
    }
    
  }
}).$mount("#app");
