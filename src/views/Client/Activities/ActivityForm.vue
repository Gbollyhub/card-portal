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
        <ActivityForm1 v-if="form == 1" /> <!-- Card Requests-->
        <ActivityForm2 v-if="form == 2" /> <!-- Card Cancellation-->
        <ActivityForm3 v-if="form == 3" /> <!-- Transaction Log-->
        <ActivityForm4 v-if="form == 4" /> <!-- Card Parametization-->
        <ActivityForm5 v-if="form == 5" /> <!-- Default PIN Generation-->
        <ActivityForm6 v-if="form == 6" /> <!-- PIN Reissue request-->
        <ActivityForm7 v-if="form == 7" /> <!-- Charge-back Request-->
        <ActivityForm8 v-if="form == 8" /> <!-- Card Activation-->
        <ActivityForm9 v-if="form == 9" /> <!-- Card Deactivation-->
        <ActivityForm10 v-if="form == 10" /> <!-- Card Hotlist-->
        <ActivityForm11 v-if="form == 11" /> <!-- Card Reissue-->
        <ActivityForm12 v-if="form == 12" /> <!-- Card_Parametization-->
        <ActivityForm13 v-if="form == 13" /> <!-- Charge_back_Request-->
        <ActivityForm14 v-if="form == 14" /> <!-- Card Status-->
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
import ActivityForm2 from "../../../components/ActivityForms/ActivityForm2";
import ActivityForm3 from "../../../components/ActivityForms/ActivityForm3";
import ActivityForm4 from "../../../components/ActivityForms/ActivityForm4";
import ActivityForm5 from "../../../components/ActivityForms/ActivityForm5";
import ActivityForm6 from "../../../components/ActivityForms/ActivityForm6";
import ActivityForm7 from "../../../components/ActivityForms/ActivityForm7";
import ActivityForm8 from "../../../components/ActivityForms/ActivityForm8";
import ActivityForm9 from "../../../components/ActivityForms/ActivityForm9";
import ActivityForm10 from "../../../components/ActivityForms/ActivityForm10";
import ActivityForm11 from "../../../components/ActivityForms/ActivityForm11";
import ActivityForm12 from "../../../components/ActivityForms/ActivityForm12";
import ActivityForm13 from "../../../components/ActivityForms/ActivityForm13";
import ActivityForm14 from "../../../components/ActivityForms/ActivityForm14";
export default {
  name: "Home",
  components: {
    ActivityForm1,
    ActivityForm2,
    ActivityForm3,
    ActivityForm4,
    ActivityForm5,
    ActivityForm6,
    ActivityForm7,
    ActivityForm8,
    ActivityForm9,
    ActivityForm10,
    ActivityForm11,
    ActivityForm12,
    ActivityForm13,
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