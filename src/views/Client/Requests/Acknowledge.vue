<template>
  <div>
      <Loader v-show="loader"/>
     <Status :state="state" :message = "message" :resetState="resetState" v-if="status"/>
 <div class="content-header">Pending Card Requests Acknowledgements</div>
      <div class="content-sub">Here are the requests that need acknowledgements</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
            <form id="email-form" name="email-form" data-name="Email Form"><input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name"></form>
          </div>
        </div>
        <!-- <div class="app-table-buttons">
          <a href="#" class="table-button">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Filter <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Actions <span class="table-button-icon"></span></a>
        </div> -->
      </div>
                 <Loading v-if="AcknowledgeLoader"/>
           <div v-else>
      <table class="app-table2" v-if="!AcknowledgeRequests.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Name on Card</th>
                          <th class="app-table2-header">Account Number</th>
                           <th class="app-table2-header">Card Type</th>
                           <th class="app-table2-header">Card Product Code</th>
                           <th class="app-table2-header">Status</th>
                            <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in AcknowledgeRequests" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{result.id}}</td>
                            <td class="app-table2-data">{{result.create_at}}</td>
                            <td class="app-table2-data">{{result.nameOnCard}}</td>
                            <td class="app-table2-data">{{result.accountNbr}}</td> 
                            <td class="app-table2-data">-</td>
                            <td class="app-table2-data">{{result.productCode}}</td>  
                            <th class="app-table2-data">{{ result.workflowId == 1 ? "Needs Approval" : "null"}}</th>
                             <td class="app-table2-data">
                               <div @click="Acknowledge(result)" style="cursor:pointer" class="table-btn">Acknowledge<span class="table-button-icon"></span></div>
                            </td> 
                        </tr>
                        
                    </tbody>
          
                </table>
                 <EmptyData v-else/>
           </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status2'
import {mapGetters} from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'
import Loading from '../../../components/Loading/Loading'
export default {
  props:['AcknowledgeRequests','AcknowledgeLoader'],
          components:{
     Loader,
     Status,
     EmptyData,
     Loading
    },
  data(){
    return{
         loader: false,
        status: false,
        state: null,
        message: null,
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ])
  },
  methods: {
         resetState(){
this.status = false;
              location.reload();
         return false; 
    },
  async  Acknowledge(result){
       this.loader = true
        const user = JSON.parse(localStorage.getItem("user-mfb"))
         const formData = {
              "requestId": [result.id],
              "companyId": parseInt(user.companyId),
              "workflowId": 2,
              "userId": parseInt(user.id)
            }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/CardRequest/approveoracknowledge',formData)
             if(response.status == 200){
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = 'Operation Sucessful'
             }
             else{
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = 'Operation Failed'
             }

         } catch (error) {
              console.log(error)
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = 'Operation Failed'
         }
            
    }
  },
}
</script>