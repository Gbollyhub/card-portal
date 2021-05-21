<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
        <div class="app-admin-col-2">
        <div class="admin-top-bar">
        <div class="admin-top-bar-left">
        <div class="settings-icon"></div>
        <div @click = "switchView('All')" class="admin-top-barlinks" :class="[ AllView ? activeClass : '']">All Requests</div>
        <div @click = "switchView('Approval')" class="admin-top-barlinks" :class="[ ApprovalView ? activeClass : '']">Pending Approval</div>
        <div @click = "switchView('Acknowledge')" class="admin-top-barlinks" :class="[ AcknowledgeView ? activeClass : '']">Pending Acknowledgement</div>
        </div>
         <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
       <div v-show="AllView">
        <All :AllLoader="AllLoader" :AllRequests="AllRequests"/> 
        </div>
        <div v-show="ApprovalView">
        <Approval :approvalLoader="approvalLoader" :ApprovalRequests="ApprovalRequests"/> 
        </div>
            <div v-show="AcknowledgeView">
           <Acknowledge :AcknowledgeLoader="AcknowledgeLoader" :AcknowledgeRequests="AcknowledgeRequests"/>       
            </div>
    </div>
      <div class="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</template>


<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import Approval from './Approval'
import Acknowledge from './Acknowledge'
import All from './All'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Approval,
    Acknowledge,
    All
  },
  data(){
      return{
        selectedTab: '',
        AllView: true,
        ApprovalView: false,
        AcknowledgeView: false,
        activeClass:'admin-active-top-link',
        ApprovalRequests:[],
        AcknowledgeRequests:[],
        AllRequests:[],
        AllLoader: false,
        approvalLoader: false,
        AcknowledgeLoader: false
      }
  },
  created(){
      this.fetchApprovalRequests();
      this.fetchAcknowledgeRequests();
      this.fetchAllRequests()
  },
      computed:{
    ...mapGetters([ 'getUrl2' ])
    }, 
methods:{
    async fetchAllRequests(){
        this.AllLoader = true
         const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + '/api/CardRequest/all/'+companyId.companyId)
           this.AllRequests = result.data
         this.AllLoader = false
  },

  async fetchApprovalRequests(){
        this.approvalLoader = true
         const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + '/api/CardRequest/pendingApproval/'+companyId.companyId)
           this.ApprovalRequests = result.data
         this.approvalLoader = false
  },
    async fetchAcknowledgeRequests(){
          this.AcknowledgeLoader = true
           const companyId = JSON.parse(localStorage.getItem("user-mfb"))
 const result = await axios.get(this.getUrl2 + 'api/CardRequest/pendingacknowledgement/'+companyId.companyId)
           this.AcknowledgeRequests = result.data
               this.AcknowledgeLoader = false
  },
    
    switchView( selected ){

        if(selected == "All"){
           this.AllView = true
         this.ApprovalView = false
         this.AcknowledgeView = false
        }
        else if(selected == 'Approval') {
           this.AllView = false
         this.ApprovalView = true
         this.AcknowledgeView = false
        }
        else if(selected == 'Acknowledge') {
          this.AllView = false
         this.ApprovalView = false
         this.AcknowledgeView = true
        }

    },

}
}
</script>
