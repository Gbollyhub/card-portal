<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeEditReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:70%; height:80%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Add User</div>
      </div>
      <div>
          <form @submit.prevent="createUser">
        <div className="form-flex">
      <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >First Name</label> 
        <input :value="userData.firstName" id="firstName" type="text" className="app-modal-form-field w-input"  placeholder="First Name"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Last Name</label> 
        <input :value="userData.lastName" id="lastName" type="text" className="app-modal-form-field w-input"  placeholder="Last Name"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Email Address</label> 
        <input :value="userData.email" id="emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Username</label> 
        <input :value="userData.userName" id="userName" type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Phone Number</label> 
        <input :value="userData.tel" id="mobileNo" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Role(Update: {{userData.role}})</label> 
            <select v-model="form.rolesId" style="marginBottom: 30px" class="app-select w-select">
            <option  v-for="(role, index) in getRoles" :key="index" :value="role.id">{{role.name}}</option>        
        </select>
         </div>
        </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Add User</button>
        </form>
      </div>
      <div @click= "closeEdit" class="app-modal-close"></div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loader from '../../../components/Loader/Loader'
import Status from '../../../components/Status/Status'
import {mapGetters} from 'vuex'
export default {
    props:['closeEdit','closeEditReload', 'userData'],
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
          roles:['Super Admin', 'Admin','Support'],
          activityArray:[],
          form: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            userName: '',
            mobileNo: '',
            rolesId: ''
          }
      }
  },
        computed:{
    ...mapGetters([
      'getUrl',
      'getRoles',
    ])
  },
    created(){
   this.$store.dispatch("getRoles");
  },
  methods: {
            resetState(){
this.status = false;
    },
    async createUser(){
       this.loader = true
       const companyId = JSON.parse(localStorage.getItem("user-mfb"))
         const formData = {
                  id: this.userData.id,
                 userName: document.getElementById("userName").value,
                  companyId: companyId.companyId,
                  firstName: document.getElementById("firstName").value,
                  lastName: document.getElementById("lastName").value,
                  emailAddress: document.getElementById("emailAddress").value,
                  userName: document.getElementById("userName").value,
                  mobileNo: document.getElementById("mobileNo").value,
                  rolesId: this.form.rolesId == "" ? this.editData.rolesId : this.form.rolesId,
                  isActive: true,
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/companyusers/update',formData)
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
            
      },
  },
}
</script>

<style>

</style>