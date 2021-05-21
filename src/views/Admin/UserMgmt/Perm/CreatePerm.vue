<template>
  <div>
        <Loader v-show="loader"/>
     <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
                    <div class="app-modal-overlay" v-else>
      <div class="app-modal-div" style="width:50%; height:60%; overflow:auto;">
      <div class="app-modal-heading">
        <div class="app-modal-header">Add Permission</div>
      </div>
      <div>
          <form @submit.prevent="createPerm">
              <div className="form-flex">
      <div className="form-flex-col">
        <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Permission Name</label> 
        <input v-model="form.name" type="text" className="app-modal-form-field w-input"  placeholder="Permission Name"  required/>
      </div>
       <div className="form-flex-col">
         <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Description</label> 
        <input v-model="form.description" type="text" className="app-modal-form-field w-input"  placeholder="Description"  required/>
       </div>
          <div className="form-flex-col">
           <label style="color:#a3a3a3; font-weight:500;font-size:13px" >Mfb or Bank</label> 
         <select v-model="form.mfbOrBank" style="marginBottom: 30px" class="app-select w-select">
             <option  v-for="(result, index) in permType" :key="index" :value="result">{{result}}</option>     
            </select>
        </div>
              </div>
    
          <button type="submit" style="display:block;cursor:pointer" class="app-modal-button">Add Permission</button>
        </form>
      </div>
      <div @click= "closeAdd" class="app-modal-close"></div>
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
    props:['closeAdd','closeAddReload'],
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
          permAray:[],
          form: {
            name: '',
            description: '',
            mfbOrBank: ''
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
    async createPerm(){
       this.loader = true
         const formData = {
                 name: this.form.name,
              description: this.form.description,
              mfbOrBank: this.form.mfbOrBank,
              isActive: true
         }
         try {
           
         const response = await axios.post(this.getUrl + 'api/permissions',formData)
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