<template>
            <div class="app-admin-section">
            <div class="app-admin-col-1">
            <Leftbar/>
            </div>
            <div class="app-admin-col-2">
            <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
          <div @click = "switchView('user')" class="admin-top-barlinks" :class="[ userView ? activeClass : '']">User</div>
          <!-- <div @click = "switchView('roles')" class="admin-top-barlinks" :class="[ rolesView ? activeClass : '']">Roles</div> -->
        </div>
         <div class="admin-top-bar-right">
          <div class="admin-topbar-date">{{Date.now()}}</div>
        </div>
      </div>
        <div v-show="userView">
        <User/> 
        </div>
            <!-- <div v-show="rolesView">
           <Roles/>       
            </div> -->
    </div>
      <div class="app-admin-col-3">
              <Rightbar />
            </div>
</div>
</template>


<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import User from './Users.vue'
import Roles from './Roles/Roles.vue'
export default {
  name: "Home",
  components: {
    Leftbar,
    Rightbar,
    Roles,
    User
  },
  data(){
      return{
        selectedTab: '',
        userView: true,
        rolesView: false,
       activeClass:'admin-active-top-link'
      }
  },
methods:{
    
    switchView( selected ){
      

        if(selected == "user"){
     
         this.userView = true
         this.rolesView = false
        }
        else if(selected == 'roles') {
             this.userView = false
         this.rolesView = true
        }

    },

}
}
</script>
