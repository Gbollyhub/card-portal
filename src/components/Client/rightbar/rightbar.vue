<template>
  <div>
       <div class="settings-div">
        <div class="settings-icon"></div>
        <div class="settings-icon"></div>
      </div>
      <div class="div-block">
        <div class="profile-photo"></div>
        <div class="profile-header">{{user.firstName}} {{user.lastName}}</div>
        <!-- <div class="profile-sub">{{role}}</div> -->
      </div>
      <div class="admin-divider"></div>
      <div class="admin-calender-div" >
      </div>
      <div class="admin-divider"></div>
      <div class="misc-card">
        <div class="misc-card-header">Pending Requests</div>
        <div class="misc-card-sub">1000</div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      adUrl: '../../../assets/images/ad-1.gif',
      user:"",
      role:""
    }
  },
      computed:{
    ...mapGetters([
      'getRoles'
    ])
  },
  mounted(){
      this.user = JSON.parse(localStorage.getItem("user-mfb"))
      // this.role = this.getRoles.find(result => { return result.id == JSON.parse(localStorage.getItem("user")).rolesId}).name
  } 
}
</script>