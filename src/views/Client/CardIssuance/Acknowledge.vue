<template>
  <div>
      <Loader v-show="loader"/>
     <Status :state="state" :message = "message" :resetState="resetState" v-if="status"/>
 <div class="content-header">Pending Card Requests Acknowledgements</div>
      <div class="content-sub">Here are the requests that need acknowledgements</div>
      <div class="app-table-actions">
        <div class="app-table-search">
          <div class="form-block w-form">
 <input v-model="searchQuery" type="text" class="app-input-search w-input" placeholder="Account Number" id="name">          </div>
        </div>
        <!-- <div class="app-table-buttons">
          <a href="#" class="table-button">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Filter <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Actions <span class="table-button-icon"></span></a>
        </div> -->
      </div>
                 <Loading v-if="AcknowledgeLoader"/>
           <div v-else>
      <table class="app-table2" v-if="!resultQuery.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Name on Card</th>
                          <th class="app-table2-header">Account Number</th>
                           <th class="app-table2-header">Card Product Type</th>
                            <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in resultQuery" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.create_at}}</td>
                            <td class="app-table2-data">{{result.nameOnCard}}</td>
                            <td class="app-table2-data">{{result.accountNbr}}</td> 
                               <td class="app-table2-data">{{ result.productName }}</td>
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
        searchQuery: ''
    }
  },
        computed:{
    ...mapGetters([
      'getUrl2',
    ]),
        resultQuery(){
      if(this.searchQuery){
      return this.AcknowledgeRequests.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.accountNbr.toLowerCase().includes(v))
      })
      }else{
        return this.AcknowledgeRequests;
      }
    },
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
              "workflowId": 6,
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