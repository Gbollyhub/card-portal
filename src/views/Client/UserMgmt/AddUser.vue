<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
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
        <input v-model="form.firstName" type="text" className="app-modal-form-field w-input"  placeholder="First Name"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Last Name</label> 
        <input v-model="form.lastName" type="text" className="app-modal-form-field w-input"  placeholder="Last Name"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Email Address</label> 
        <input v-model="form.emailAddress" type="text" className="app-modal-form-field w-input"  placeholder="Email Address"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Username</label> 
        <input v-model="form.userName" type="text" className="app-modal-form-field w-input"  placeholder="Username"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Phone Number</label> 
        <input v-model="form.mobileNo" type="text" className="app-modal-form-field w-input"  placeholder="Phone Number"  required/>
        </div>
         <div className="form-flex-col">
             <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Role</label> 
            <select @change="assignRole($event)" style="marginBottom: 30px" class="app-select w-select">
            <option  v-for="(role, index) in getRoles" :key="index" :value="role.id">{{role.name}}</option>        
        </select>
         </div>
        </div>
          <button type="submit" style="marginTop:20px;display:block;cursor:pointer" class="app-modal-button">Add User</button>
        </form>
      </div>
      <div @click= "closeAdd" class="app-modal-close"></div>
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
    props:['closeAdd', 'closeAddReload'],
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
            rolesId: 0
          },
          userRole:null
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
    assignRole(result){
      this.userRole = result.target.value
      console.log("djdjd",this.userRole)
    },
            resetState(){
this.status = false;
    },
    async createUser(){
       this.loader = true
       const companyId = JSON.parse(localStorage.getItem("user-mfb"))
         const formData = {
                  companyId: companyId.companyId,
                  firstName: this.form.firstName,
                  lastName: this.form.lastName,
                  emailAddress: this.form.emailAddress,
                  userName: this.form.userName,
                  mobileNo: this.form.mobileNo,
                  rolesId: parseInt(this.userRole)  ,
                  isActive: true,
         }
         try {
           
             const response = await axios.post(this.getUrl + 'api/companyusers',formData)
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