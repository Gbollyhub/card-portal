<template>
  <div>
                <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeEditReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:70%; height:90%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Update Company</div>
      </div>
      <div>
          <form @submit.prevent="updateCompany">
               <div className="form-flex">
      <div className="form-flex-col">
        <label style="color:#a3a3a3; font-weight:500;font-size:13px" >MFB Name</label> 
        <input  :value="editData.name" type="text" className="app-modal-form-field w-input"  placeholder="MFB Name" id="name" required/>
        </div>
         <div className="form-flex-col">
                <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Account Number</label> 
        <input :value="editData.accountNumber" type="text" className="app-modal-form-field w-input"  placeholder="Account Number" id="accountNumber"  required/>
        </div>
         <div className="form-flex-col">
            <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Company Code</label> 
        <input readonly :value="editData.companyCode" type="text" className="app-modal-form-field w-input"  placeholder="Company Code" id="companyCode"  required/>
        </div>
          <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Email Address</label> 
        <input :value="editData.emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Email Address" id="emailAddress"  required/>
        </div>
        <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Phone Number</label> 
        <input :value="editData.phoneNumber" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number" id="phoneNumber"  required/>
        </div>
        <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Address</label> 
        <input :value="editData.address" type="text" className="app-modal-form-field w-input"  placeholder="Address" id="address"  required/>
        </div>
         <div className="form-flex-col">
            <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Branch</label> 
        <input :value="editData.branch" type="text" className="app-modal-form-field w-input"  placeholder="Branch" id="branch"  required/>
        </div>
                 <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Card Product</label> 
         <select @change="savecardSetup($event)" style="marginBottom: 30px" class="app-select w-select">
               <option disabled selected>Update Card Product (Existing:{{companyCardSetup.productName}})</option> 
             <option  v-for="(result, index) in cardSetup" :key="index" :value="result.cardProductCode">{{result.description}}</option>     
            </select>
        </div>
         </div>
        <div class="app-modal-heading">
        <div class="app-modal-header">Assigned Activities</div>
      </div>
               <div className="form-flex">
                         <div className="form-flex-col-x" v-for="(perm, index) in editActivities" :key="index">      
             <label :for="perm.name"><input disabled="disabled" checked="checked" style="margin-right:20px" :id="`A${perm.id}`" type="checkbox" value="test" />{{perm.name}}::{{perm.id}}</label>
        </div>
               </div>
      <br>
                       <div class="app-modal-heading">
        <div class="app-modal-header">Add Activities</div>
      </div>
               <div className="form-flex">
                         <div className="form-flex-col-x" v-for="(perm, index) in getActivities" :key="index">      
             <label :for="perm.name"><input @click="addToActivity(perm, index)" style="margin-right:20px" :id="`A${perm.id}`" type="checkbox" value="test" />{{perm.name}}::{{perm.id}}</label>
        </div>
               </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Update Company</button>
        </form>
      </div>
      <div @click= "closeModal" class="app-modal-close"></div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status'
export default {
    props:['closeModal','closeEditReload','editData', 'editActivities', 'companyCardSetup'],
        components:{
     Loader,
     Status
    },
  data(){
      return{
        loader: false,
        status: false,
        state: null,
        message: null,
          activities:[],
          activityArray:[],
        form:{
          name: "",
          companyCode: "",
          address: "",
          emailAddress: "",
          phoneNumber: "",
          accountNumber: "",
          branch: "",
         productName:"",
          productCode:""
        },
          cardSetup:[],
      }
  },
      computed:{
    ...mapGetters([
      'getUrl',
      'getActivities',
    ])
  },
  created(){
    this.$store.dispatch("getActivities");
    this.getCardSetup()
  },
  methods: {
    savecardSetup(result){
    let cardCode = result.target.value;
    const y = this.cardSetup.find(x => { return x.cardProductCode == cardCode})
    this.form.productName = y.description;
    this.form.productCode = y.cardProductCode;
    },
    async getCardSetup(){
      const result = await axios.get(this.getUrl + 'api/CardProductSetup/FetchCardProductCodeForsetup')
       this.cardSetup = result.data
    },
        resetState(){
this.status = false;
    },
        async updateCompany(){
       this.loader = true
         const formData = {
          id: this.editData.id,
          name: document.getElementById("name").value,
          companyCode: document.getElementById("companyCode").value,
          address: document.getElementById("address").value,
          emailAddress: document.getElementById("emailAddress").value,
          phoneNumber: document.getElementById("phoneNumber").value,
          accountNumber: document.getElementById("accountNumber").value,
          branch: document.getElementById("branch").value,
         }

         try {
           
             const response = await axios.post(this.getUrl + 'api/companies/update',formData)
             if(response.status == 200){
                  this.addActivities(response.data.id);
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
            
      },
           async addActivities(companyId){
                 const response2 = await axios.post(this.getUrl + 'api/companyactivities/update', {
                 activitiesId: this.activityArray,
                companyId: parseInt(companyId),
                isActive: true
                      })

               if(response2.status == 200){    
                  console.log("Actvities created")
                  this.addProduct(companyId)
                }

             else{
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = 'Operation Failed'
             }
      },
             async addProduct(companyId){
                  const response3 = await axios.post(this.getUrl + 'api/CardProductSetup', {
                companyId: parseInt(companyId),
                productName: this.form.productName,
                cardProductCode: this.form.productCode,
                isActive: true
                      })
                      
               if(response3.status == 200){ 
                  console.log("Company Updated")
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
      },
 async addToActivity(activity, index){
        let Avalue = await parseInt(activity.id)
        console.log(`A${activity.id}`)
      var checkbox = document.getElementById(`A${activity.id}`);
       const state = await this.activityArray.some(activity => { return activity == Avalue })
       console.log(state)
      if (state == false && checkbox.checked == true){
    console.log("checked") ;
    this.activityArray.push(Avalue);
  }
  else{
      console.log("unchecked")
     const newIndex = this.activityArray.findIndex( result => { return result == Avalue})

       await this.activityArray.splice(newIndex, 1); 
       console.log("finised unchecked " + newIndex) 
      }

      },
  },
}
</script>

<style>

</style>