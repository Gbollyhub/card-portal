<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeEditReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:50%; height:60%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Update Permission</div>
      </div>
      <div>
          <form @submit.prevent="updatePerm">
              <div className="form-flex">
      <div className="form-flex-col">
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Permission Name</label> 
        <input :value="editData.name" type="text" className="app-modal-form-field w-input" id="testField1" />
      </div>
       <div className="form-flex-col">
          <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Description</label> 
        <input :value="editData.description" type="text" className="app-modal-form-field w-input" id="testField2" />
       </div>
                 <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Mfb or Bank (Update: {{editData.mfbOrBank}})</label> 
         <select v-model="form.mfbOrBank" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in permType" :key="index" :value="result">{{result}}</option>     
            </select>
        </div>
        
              </div>

          <button type="submit" style="display:block;cursor:pointer" class="app-modal-button">Update Permission</button>
        </form>
      </div>
      <div @click= "closeEdit" class="app-modal-close"></div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Loader from '../../../../components/Loader/Loader'
import Status from '../../../../components/Status/Status'
export default {
    props:['closeEdit','closeEditReload', 'editData', 'permAray'],
        components:{
     Loader,
     Status
    },
  data(){
      return{
        happy: "mood",
         loader: false,
        status: false,
        state: null,
        message: null,
          roles:['Super Admin', 'Admin','Support'],
  
          form: {
            name: '',
            description: '',
              mfbOrBank: ""
          },
           permType: ['mfb','Bank']
      }
  },
      computed:{
    ...mapGetters([
      'getUrl',
      'getRoles',
      'getPermissions'
    ])
  },
  methods: {
        resetState(){
this.status = false;
    },
    testPerm(){

    },
    async updatePerm(){
       this.loader = true
         const formData = {
              id:this.editData.id,
              name: document.getElementById("testField1").value,
              description: document.getElementById("testField2").value,
              mfbOrBank: this.form.mfbOrBank == "" ? this.editData.mfbOrBank : this.form.mfbOrBank,
              isActive: true
         }
         try {
           
         const response = await axios.post(this.getUrl + 'api/permissions/update',formData)
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