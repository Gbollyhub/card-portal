<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
 <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div @click="previousPage" class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{getDate}}</div>
        </div>
      </div>
      <div class="content-header">Dashboard Overview</div>
      <div class="content-sub">Here are the latest reports on the system</div>
      <Loading v-if="isFetchingDashBoard" />
      <div v-if="!isFetchingDashBoard" class="summary-flexbox">
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Users</div>
              <div class="slide-card-value">{{users_total}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Activities</div>
              <div class="slide-card-value">{{activities_total}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
        <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Card Requests</div>
              <div class="slide-card-value">{{card_requests_total}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
         <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Pending Requests Approval</div>
              <div class="slide-card-value">{{pending_approval_total}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
         <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Pending Requests Acknowledgement</div>
              <div class="slide-card-value">{{pending_acknowledgement_total}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
         <div class="content-slide-box">
          <div class="content-info-card">
            <div class="div-block-2">
              <div class="slide-card-header">Rejected Requests</div>
              <div class="slide-card-value">{{rejected}}</div>
            </div>
            <div class="slide-card-icon purple"></div>
          </div>
        </div>
      </div>
            <div class="basic-table-card">
        <div class="table-header">
          <div class="content-header-2">Company Details</div>
        </div>
        
               <div className="form-flex">
                         <div className="form-flex-col-3">  
                          <div className="details-header">Company Name</div>
                          <div className="details-value">{{getCompany ? getCompany.name : ""}}</div>
                         </div>
                          <div className="form-flex-col-3">  
                           <div className="details-header">Company Email Address</div>
                          <div className="details-value">{{ getCompany ? getCompany.emailAddress : ""}}</div>
                         </div>
                          <div className="form-flex-col-3">  
                           <div className="details-header">Company Phone Number</div>
                          <div className="details-value">{{ getCompany ? getCompany.phoneNumber : ""}}</div>
                         </div>
                           <div className="form-flex-col-3">  
                           <div className="details-header">Company Account Number</div>
                          <div className="details-value">{{getCompany ? getCompany.accountNumber : ""}}</div>
                         </div>
                           <div className="form-flex-col-3">  
                           <div className="details-header">Company Address</div>
                          <div className="details-value">{{getCompany ? getCompany.address : ""}}</div>
                         </div>
                        
      </div>
            </div>
      <div v-if="!isFetchingDashBoard" class="basic-table-card">
        <div class="table-header">
          <div class="content-header-2">Users</div>
          <router-link to="/client/user-management" class="table-view-all" style="text-decoration: none">View all</router-link>
        </div>
        
        <table class="app-table">
            <thead>
              <tr class="app-table-row">
              <th class="app-table-header">Username</th>
              <th class="app-table-header">Email Address</th>
              <th class="app-table-header">Phone Number</th>
              <th class="app-table-header">Roles</th>
              <th class="app-table-header">Status</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(user_item) in users_list_computed" :key="user_item.id">
              <td class="app-table-data">{{user_item.displayName}}</td>
              <td class="app-table-data">{{user_item.email}}</td>
              <td class="app-table-data">{{user_item.tel}}</td>
              <td class="app-table-data">{{user_item.role}}</td>
              <td class="app-table-data table-active">{{user_item.status?"Active":"Disabled"}}</td>
            </tr>
            </tbody>
            
            
            </table>
      </div>
            </div>
            <!-- <div class="app-admin-col-3">
              <Rightbar />
            </div> -->
          </div>
</template>

<script>
import Global from '../../../views/global.js'
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import {mapGetters, mapState} from "vuex";
import Loading from "../../../components/Loading/Loading";
export default {
  name: "Home",
  components: {
    Loading,
    Leftbar,
    Rightbar
  },
    mixins:[Global],
    created(){
     this.$store.dispatch('getCompanies')
    },
  mounted() {
    this.ismounted = true
    try {
      this.fetchDashboard()
    }catch (e){
      console.log(e)
    }

  },
  data:function (){
    return {
      ismounted: false,
      isFetchingDashBoard : false,
      date : "October 8th, 2020",
      users_total : 0,
      activities_total : 0,
      user_requests_total : 0,
      card_requests_total : 0,
      users_list : [],
      users_list_sample_count: 4,
      roles : []
    }
  },
  methods:{
    fetchDashboard:function (){
      this.isFetchingDashBoard = true;
     const companyId = JSON.parse(localStorage.getItem("user-mfb"))
      this.$store.dispatch("getClientDashboardData",companyId.companyId)
          .then((response)=>{
            this.users_list = response[0].data;
            this.users_total = response[0].data.length;
            this.activities_total = response[1].data.length;
            this.card_requests_total = response[2].data.length;
             this.pending_approval_total = response[3].data.length;
             this.pending_acknowledgement_total = response[4].data.length
              this.rejected = response[5].data.length
            this.roles = response[6].data;
          })
          .catch((error)=>{
            alert(`Error : ${error}`)
          })
          .then(()=>{this.isFetchingDashBoard = false;})
    }
  },
  computed:{
    ...mapGetters(['getCompanies']),
    users_list_computed:function (){
      return this.users_list.slice(0,this.users_list_sample_count).map((user)=>{
        return {
          id : user.id,
          displayName : `${user.firstName} ${user.lastName}`,
          email : user.emailAddress,
          tel : user.mobileNo,
          role : this.roles.find((entry)=>{return user.rolesId === entry.id}).name,
          status : user.isActive
        }
      });
    },
   getCompany(){
    if(this.ismounted){
         const company = JSON.parse(localStorage.getItem("user-mfb"))
   const result = this.getCompanies ? this.getCompanies.find( x => { return x.id == company.companyId}) : 'null'
//  this.branches.length > 0 ? this.branches.find((entry)=>{return result.branch === entry.branchNo}).branchName : null;
   return result;
    }
    }
  }
}
</script>