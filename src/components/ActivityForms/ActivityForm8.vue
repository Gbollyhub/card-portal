<template>
  <div>
       <Loader v-show="loader"/>
     <Status :state="state"  :message = "message" :resetState="resetState" v-if="status"/>
 <div class="content-header">Card Reactivation</div>
      <div class="content-sub">Search and activate a card</div>
      <div>
        <div>
            <form @submit.prevent="searchCard">
       <input required   v-model="accountNbr" v-on:keyup="searchForCard" style="display:inline-block;width:40%" type="text" class="app-input-search w-input" placeholder="Search by Account Number">
       <button type="submit" style="margin-top:-15px;margin-left:20px;font-size:15px;cursor:pointer;height:40px;background:#1b1b1b" className="app-icon table-button filter"><span className="table-button-icon"></span></button>        
          </form>
          </div>
        <!-- <div class="app-table-buttons">
          <a href="#" class="table-button">Sort <span class="table-button-icon"></span></a>
          <a href="#" class="table-button">Filter <span class="table-button-icon"></spa      `an></a>
          <a href="#" class="table-button">Actions <span class="table-button-icon"></span></a>
        </div> -->
      </div>
           <Loading v-if="loading"/>
           <div v-else>
                     <table class="app-table2" v-if="!cardData.length <= 0">
                    <thead>
                        <tr class="app-table2-row">
                           <th class="app-table2-header">Id</th>
                           <th class="app-table2-header">Date</th>
                          <th class="app-table2-header">Name on Card</th>
                          <th class="app-table2-header">Account Number</th>
                           <!-- <th class="app-table2-header">Product Type</th> -->
                           <th class="app-table2-header"> Product Code</th>
                           <th class="app-table2-header">Client Code</th>
                            <th class="app-table2-header"></th>
                           
                        </tr>
                    </thead>
            
                        <tbody>
                              <tr v-for="(result, index) in cardData" :key="index" class="app-table2-row">
                            <td class="app-table2-data">{{index + 1}}</td>
                            <td class="app-table2-data">{{result.create_at}}</td>
                            <td class="app-table2-data">{{result.nameOnCard}}</td>
                            <td class="app-table2-data">{{result.accountNbr}}</td> 
                            <!-- <td class="app-table2-data">{{result.productName}}</td> -->
                            <td class="app-table2-data">{{result.productCode}}</td>  
                            <td class="app-table2-data">{{result.clientCode}}</td>  
                             <td class="app-table2-data">
                            <div @click="Activate(result)" style="cursor:pointer" class="table-btn">Activate<span class="table-button-icon"></span></div>
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
import Loader from '../../components/Loader/Loader'
import Status from '../../components/Status/Status2'
import {mapGetters} from 'vuex'
import EmptyData from '../../components/EmptyData/EmptyData'
import Loading from '../../components/Loading/Loading'
import Global from '../../views/global'
export default {
      mixins:[Global],
          components:{
     Loader,
     Status,
     EmptyData,
     Loading
    },
  data(){
    return{
         loading:false,
         loader: false,
        status: false,
        state: null,
        message: null,
        testData:[{
            id: '1',
            create_at: "12/02/21",
            nameOnCard: 'Mutumbie John',
            accountNbr: "0229282818",
            productName: "Credit",
            productCode: "889",
            clientCode: "93930"
        }],
        accountNbr:'',
        cardData:[]
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
    },
   async searchForCard(e){
        const user = JSON.parse(localStorage.getItem("user-mfb"))
         if (e.keyCode === 13) {
           this.loading = true
   const response = await axios.get(this.getUrl2 + 'api/CardRequest/cardbyaccountNo/'+  user.companyId + "/" + this.accountNbr)
   if(response.status == 200){
         this.loading = false
   this.cardData = response.data
   }
   else{
       this.loading = false
   }

         }
    },
            async Activate(result){
               if(result.clientCode != null){
       this.loader = true
       const user = JSON.parse(localStorage.getItem("user-mfb"))
          const form = {
              "companyId": user.companyId,
              "userId": user.id,
              "clientCode": result.clientCode
          }
         try {
           
             const response = await axios.post(this.getUrl2 + 'api/cardactivatedeactivate/activation',form)
             if(response.data.responseCode == "00"){    
              this.accountNbr =""
               this.cardData = []
               this.loader = false;
               this.status = true;
               this.state = 'success';
               this.message = response.data.responseMessage
             }
             else{
               this.accountNbr =""
               this.cardData = []
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = response.data.responseMessage
             }

         } catch (error) {
              console.log(error)
               this.loader = false;
               this.status = true;
               this.state = 'failed';
                this.message = error.message
         }
          }
              else{
                  this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = "This card does not have a valid client code"
              }
            
      },
 
  },
}
</script>