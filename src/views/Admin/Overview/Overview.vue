<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
      <div class="content-header">Dashboard Overview</div>
      <div class="content-sub">Here are the latest reports on the system</div>
      <div class="summary-flexbox">
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Users</div>
              <div class="slide-card-value">{{getAdminUsers.length}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">MFB Companies</div>
              <div class="slide-card-value">{{getCompanies.length}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Activities</div>
              <div class="slide-card-value">{{getActivities.length}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
      </div>
      <div class="basic-table-card">
        <div class="table-header">
          <div class="content-header-2">Users</div>
          <div class="table-view-all">View all</div>
        </div>
        
        <table class="app-table">
            <thead>
              <tr class="app-table-row">
              <th class="app-table-header">Id</th>
              <th class="app-table-header">Username</th>
              <th class="app-table-header">Role</th>
            </tr>
            </thead>

            <tbody>
             <tr v-for="(result, index) in getAdminUsers" :key="index" class="app-table-row">
                                    <td class="app-table-data">{{result.id}}</td>
                                  <td class="app-table-data">{{result.userName}}</td>
                                      <!-- <td class="app-table-data"> {{result.rolesId}} </td> -->
                         
                                  </tr>    

            </tbody>
            
            
            </table>
      </div>
            </div>
            <div class="app-admin-col-3">
              <Rightbar />
            </div>
          </div>
</template>

<script>
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import Rightbar from '../../../components/Admin/rightbar/rightbar'
import { mapGetters } from 'vuex'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar
  },
  computed:{
    ...mapGetters(['getAdminUsers', 'getActivities','getCompanies'])
  },
  created(){
   this.$store.dispatch("getCompanies");
    this.$store.dispatch("getActivities");
     this.$store.dispatch("getAdminUsers");
  }
}
</script>