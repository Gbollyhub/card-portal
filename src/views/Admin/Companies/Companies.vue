<template>
            <div class="app-admin-section">
              <div v-show="AddCompanyModal">
              <AddMFB  :closeModal="closeModal" :closeModalReload="closeModalReload" />
          </div>
          <div v-show="EditModal">
              <EditMFB :companyCardSetup="companyCardSetup" :editActivities="activities" :closeModal="closeEdit" :closeEditReload="closeEditReload" :editData="editData"/>
          </div>
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
      <div class="content-header">MFB Companies</div>
      <div class="content-sub">Here are the latest report on Paysure Agency</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
            <input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name"/>
          </div>
        </div>
        <div class="app-table-buttons">
          <div @click="openModal" style="cursor:pointer" className="table-button filter">Add New Company<span className="table-button-icon"></span></div>
        </div>
      </div>
        <div v-if="!getCompanies.length <= 0">
              <table class="app-table2">
                                  <thead>
                                      <tr class="app-table2-row">
                                         <th class="app-table2-header">Id</th>
                                      <th class="app-table2-header">Name</th>
                                      <th class="app-table2-header">Code</th>
                                      <th class="app-table2-header">Email Address</th>
                                       <!-- <th class="app-table2-header">Phone Number</th> -->
                                       <!-- <th class="app-table2-header">Account Number</th> -->
                                      <th class="app-table2-header"></th>
                                       <th class="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(result, index) in getCompanies" :key="index" class="app-table2-row">
                                    <td class="app-table2-data">{{result.id}}</td>
                                  <td class="app-table2-data">{{result.name}}</td>
                                      <td class="app-table2-data"> {{result.companyCode}} </td>
                                        <td class="app-table2-data">{{result.emailAddress}}</td>
                                        <!-- <td class="app-table2-data">{{result.phoneNumber}}</td> -->
                                        <!-- <td class="app-table2-data">{{result.accountNumber}}</td> -->
                                         <td class="app-table2-data">
                         <router-link :to="`/admin/requests/${result.id}`"><div style="background:#c00;cursor:pointer" class="table-btn">Requests<span class="table-button-icon"></span></div></router-link>   
                            </td>
                                         <td class="app-table2-data">
                            <div @click="openEdit(result)" style="cursor:pointer" class="table-btn">Update<span class="table-button-icon"></span></div>
                            </td>
                                  </tr>     
                                                                                               
                                  </tbody>
                                  </table> 
       </div>
      <Loading v-else/>
            </div>
            <div class="app-admin-col-3">
              <Rightbar />
            </div>
          </div>
</template>

<script>
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import Rightbar from '../../../components/Admin/rightbar/rightbar'
import AddMFB from './AddCompany'
import EditMFB from './EditCompany'
import axios from 'axios'
import {mapGetters} from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'
import Loading from '../../../components/Loading/Loading'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    AddMFB,
    EditMFB,
    EmptyData,
    Loading
  },
  data(){
    return{
      AddCompanyModal: false,
      EditModal:false,
      editData:'',
      activities:[],
      companyCardSetup:""
    }
  },
  computed:{
  ...mapGetters([
    'getUrl',
    'getCompanies',
  ])
  },
    created(){
   this.$store.dispatch("getCompanies");
  },
  methods: {
       closeModal(){
         this.AddCompanyModal = false 
       },
       closeModalReload(){
         this.AddCompanyModal = false 
         location.reload();
         return false; 
       },
        openModal(){
           this.AddCompanyModal = true
       },
        async openEdit(result){

             const response = await axios.get(this.getUrl + 'api/companies/CompanyAcivities/' + result.id)
         const response2 = await axios.get(this.getUrl + 'api/CardProductSetup')
             let cardSetup = response2.data
             const y = cardSetup.find(x => { return x.companyId ==  result.id})
             this.companyCardSetup = y

              this.activities = response.data
            this.editData = result
           this.EditModal = true

       },
        closeEdit(){
           this.EditModal = false
       },
         closeEditReload(){
           this.EditModal = false
            location.reload();
         return false;
       },
      async getActivitiesById(id){
    
         try {
           
             const response = await axios.post(this.getUrl + 'api/companies/CompanyAcivities/' + id)
             if(response.status == 200){
              this.activities = response.data
             }
             else{
              return false
             }

         } catch (error) {
              console.log(error)
            
         }

    },
  },
}
</script>