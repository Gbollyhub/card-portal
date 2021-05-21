<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar/>
    </div>
    <div class="app-admin-col-2">
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <router-link to="activities"><div class="settings-icon"></div></router-link>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020 </div>
        </div>
      </div>
        <ActivityForm1 v-if="form == 1" />
         <ActivityForm14 v-if="form == 14" />
    </div>
    <div class="app-admin-col-3">
      <Rightbar />
    </div>
  </div>
</template>

<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import operationMixen from '../operationMixen.js'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status2'
import axios from 'axios'
import {mapGetters} from 'vuex'
import ActivityForm1 from "../../../components/ActivityForms/ActivityForm1";
import ActivityForm14 from "../../../components/ActivityForms/ActivityForm14";
export default {
  name: "Home",
  components: {
    ActivityForm1,
    ActivityForm14,
    Leftbar,
    Rightbar,
      Loader,
     Status
  },
  created() {
    this.form = this.$route.params.slug;
    console.log("Form ",this.$route.params.slug);
  },
      computed:{
    ...mapGetters([ 'getUrl2' ])
    }, 
  mixins: [operationMixen],
  data(){
      return{
        form : 0,
        loader: false,
        status: false,
        state: null,
        message: null,  

      }
  },
  methods: {

  },
}
</script>

<style scoped>
a {
    text-decoration: none;
}
.activity-card-header {
  margin-bottom: 15px;
  color: #262626;
  font-size: 14px;
  font-weight: 700;
}
.activity-btn{
    background: #c00;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    color: white;
    width: 100px;
}
</style>