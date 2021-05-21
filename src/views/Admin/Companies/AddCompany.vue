<template>
  <div>
                <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeModalReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:70%; height:90%; overflow:auto;">
            <div v-if="isCompanyCreated">
                    <div class="app-modal-heading">
        <div class="app-modal-header">Add User</div>
      </div>
          <form @submit.prevent="addUser">
        <div className="form-flex">
      <div className="form-flex-col">
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >First Name</label> 
        <input v-model="form2.firstName" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
            <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Last Name</label> 
        <input v-model="form2.lastName" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
               <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Email Address</label>
        <input v-model="form2.emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Username</label>
        <input v-model="form2.userName" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
            <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Phone Number</label>
        <input v-model="form2.mobileNo" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
            <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Role</label>
          <select v-model="form2.rolesId" id="roles" style="marginBottom: 30px" class="app-select w-select">
               <option selected>Select a Role</option> 
             <option  v-for="(role, index) in getRoles" :key="index" :value="role.id">{{role.name}}</option>     
            </select>
         </div>
        </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Add User</button>
        </form>
      </div>
      <div v-else>
              <div class="app-modal-heading">
        <div class="app-modal-header">Add Company</div>
      </div>
          <form @submit.prevent="createCompany">
               <div className="form-flex">
      <div className="form-flex-col">
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >MFB Name</label> 
        <input v-model="form.name" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Account Number</label> 
        <input v-model="form.accountNumber" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Company Code</label> 
        <input v-model="form.companyCode" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
          <div className="form-flex-col">
              <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Email Address</label> 
        <input v-model="form.emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
        <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Phone Number</label> 
        <input v-model="form.phoneNumber" type="text" className="app-modal-form-field w-input"  placeholder="Type Here"  required/>
        </div>
        <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Address</label> 
        <input v-model="form.address" type="text" className="app-modal-form-field w-input"  placeholder="Type Here" required/>
        </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Branch</label> 
         <select v-model="form.branch" id="roles" style="marginBottom: 30px" class="app-select w-select">
               <option selected>Select a Branch</option> 
             <option  v-for="(result, index) in branches" :key="index" :value="result.branchNo">{{result.branchName}}</option>     
            </select>
        </div>
         <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Card Product</label> 
         <select @change="savecardSetup($event)" style="marginBottom: 30px" class="app-select w-select">
               <option selected>Select a Card Product</option> 
             <option  v-for="(result, index) in cardSetup" :key="index" :value="result.cardProductCode">{{result.description}}</option>     
            </select>
        </div>
               </div>
                 <div class="app-modal-heading">
        <div class="app-modal-header">Assign Activities</div>
      </div>
               <div className="form-flex">
                         <div className="form-flex-col-x" v-for="(perm, index) in getActivities" :key="index">      
             <label :for="perm.name"><input @click="addToActivity(perm, index)" style="margin-right:20px" :id="`A${perm.id}`" type="checkbox" value="test" />{{perm.name}}::{{perm.id}}</label>
        </div>
               </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Add Company</button>
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
    props:['closeModal','closeModalReload'],
        components:{
     Loader,
     Status
    },
  data(){
      return{
        isCompanyCreated: false,
        loader: false,
        status: false,
        state: null,
        message: null,
        activityArray:[],
        companyId: "",
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
         form2: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            userName: '',
            mobileNo: '',
            rolesId: 0
          },
          branches:[],
          cardSetup:[]
      }
  },
    computed:{
    ...mapGetters([
      'getUrl',
      'getUrl2',
      'getActivities',
      'getRoles'
    ])
  },
      created(){
    this.$store.dispatch("getActivities");
    this.$store.dispatch("getRoles");
    this.getBranch();
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
    async getBranch(){
           const result = await axios.get(this.getUrl2 + 'api/Common/Branch')
           this.branches = result.data
    },
    resetState(){
this.status = false;
    },
        async createCompany(){
       this.loader = true
         const formData = {
                  name: this.form.name,
          companyCode: this.form.companyCode,
          address: this.form.address,
          emailAddress: this.form.emailAddress,
          phoneNumber: this.form.phoneNumber,
          accountNumber: this.form.accountNumber,
          branch: this.form.branch,
         }


         try {
           
             const response = await axios.post(this.getUrl + 'api/companies',formData)

             if(response.status == 200){
               console.log("Company created")
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
                 const response2 = await axios.post(this.getUrl + 'api/companyactivities', {
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
                  console.log("Company created")
                this.companyId = companyId
               this.isCompanyCreated = true   
              this.loader = false;
             }

             else{
               this.loader = false;
               this.status = true;
               this.state = 'failed';
               this.message = 'Operation Failed'
             }
      },
     async addUser(){
          this.loader = true
         const formData = {
                  companyId: parseInt(this.companyId),
                  firstName: this.form2.firstName,
                  lastName: this.form2.lastName,
                  emailAddress: this.form2.emailAddress,
                  userName: this.form2.userName,
                  mobileNo: this.form2.mobileNo,
                  rolesId: parseInt(document.getElementById("roles").value),
                  isActive: true
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/companyusers',formData)
             if(response.status == 200){
                console.log("User Added")
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