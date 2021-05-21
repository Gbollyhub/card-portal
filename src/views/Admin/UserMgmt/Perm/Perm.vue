<template>
<div>
      <div v-show="AddPermModal">
              <CreatePerm :closeAdd="closeAdd" :closeAddReload="closeAddReload"/>
          </div>
              <div v-show="EditPermModal">
              <EditPerm :closeEdit="closeEdit" :closeEditReload="closeEditReload" :editData="editData" :permAray="permAray"/>
          </div>
<div class="content-header">Manage Permissions</div>
      <div class="content-sub">Here are the list of permissions available</div>
               <div class="app-table-actions">
                    <div class="app-table-search">
                        <input  type="text" class="app-input-search w-input" placeholder="Search..." id="name" />
                    </div>
                    <div class="app-table-buttons">
                    <div @click="openAdd" style="cursor:pointer" class="table-view-all">Create Permissions<span class="table-button-icon"></span></div>
                    </div>
                </div>

 <div v-if="!getPermissions.length <= 0">
              <table class="app-table2">
                                  <thead>
                                      <tr class="app-table2-row">
                                         <th class="app-table2-header">S/N</th>
                                      <th class="app-table2-header">Permission</th>
                                      <th class="app-table2-header">Description</th>
                                      <th class="app-table2-header">Mfb/Bank</th>
                                      <th class="app-table2-header"></th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr v-for="(result, index) in getPermissions" :key="index" class="app-table2-row">
                                    <td class="app-table2-data">{{index + 1}}</td>
                                  <td class="app-table2-data">{{result.name}}</td>
                                      <td class="app-table2-data"> {{result.description}} </td>
                                      <td class="app-table2-data"> {{result.mfbOrBank}} </td>
                                        <td class="app-table2-data">
              <div  @click="openEdit(result)" style="cursor:pointer" class="table-btn">Update<span class="table-button-icon"></span></div>
                            </td>
                                  </tr>     
                                                                                               
                                  </tbody>
                                  </table> 
        </div>
      <Loading v-else/>                           
      </div>
    </template>

    <script>
import { mapGetters } from 'vuex'
import EmptyData from '../../../../components/EmptyData/EmptyData'
import CreatePerm from './CreatePerm'
import EditPerm from './EditPerm'
import Loading from '../../../../components/Loading/Loading'
export default {
  name: "Home",
  components: {
    EmptyData,
    CreatePerm,
    EditPerm,
    Loading
  },
  data(){
    return{
     AddPermModal: false,
      EditPermModal: false,
      editData: '',
      permAray:[]
    }
  },
  computed: {
    ...mapGetters([
      'getPermissions'
    ])
  },
  created(){
   this.$store.dispatch("getPermissions");
  },
  methods: {
     closeAdd(){
           this.AddPermModal = false
       },
       closeAddReload(){
           this.AddPermModal = false
             location.reload();
         return false; 
       },
        openAdd(){
           this.AddPermModal = true
       },
        closeEdit(){
           this.EditPermModal = false   
       },
         closeEditReload(){
           this.EditPermModal = false  
             location.reload();
         return false; 
       },
        openEdit(result){
          this.editData = result
           this.EditPermModal = true
       }
  },
}
</script>
    <style scoped>
    a {
      text-decoration: none;
    }
    </style>