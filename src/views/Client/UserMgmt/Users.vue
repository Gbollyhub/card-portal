<template>
  <div>
    <div v-show="AddUserModal">
      <AddUser :closeAdd="closeAdd"/>
    </div>
    <div v-show="EditUserModal">
      <EditUser :closeEdit="closeEdit" :userData="userData"/>
    </div>
    <div class="content-header">Manage Users</div>
    <div class="content-sub">Here are the list of users available</div>
    <div class="app-table-actions">
      <div class="app-table-search">
        <input id="name" v-model="last_search_string" class="app-input-search w-input" placeholder="Search..."
               type="text"/>
      </div>
      <div class="app-table-buttons">
        <div className="table-button filter" style="cursor:pointer" @click="openAdd">Add New User<span
            className="table-button-icon"></span></div>
      </div>
    </div>
    <Loading v-if="isFetchingUsers" />
    <div v-else>
      <div v-if="companyUsersComputed.length > 0">
        <table class="app-table2">
          <thead>
          <tr class="app-table2-row">
            <th class="app-table2-header">Id</th>
            <th class="app-table2-header">First Name</th>
            <th class="app-table2-header">Last Name</th>
            <th class="app-table2-header">Email Address</th>
            <th class="app-table2-header">Username</th>
            <th class="app-table2-header">Phone Number</th>
            <th class="app-table2-header">Role</th>
            <th class="app-table2-header"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user_item) in companyUsersComputed" :key="user_item.id">
            <td class="app-table-data">{{user_item.id}}</td>
            <td class="app-table-data">{{user_item.firstName}}</td>
            <td class="app-table-data">{{user_item.lastName}}</td>
            <td class="app-table-data">{{user_item.email}}</td>
            <td class="app-table-data">{{user_item.userName}}</td>
            <td class="app-table-data">{{user_item.tel}}</td>
            <td class="app-table-data">{{user_item.role}}</td>
            <td class="app-table2-data">
              <div class="table-btn" style="cursor:pointer" @click="openEdit(result)">Update User<span
                  class="table-button-icon"></span></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <EmptyData v-else/>
    </div>


  </div>
</template>

<script>
import Leftbar from '../../../components/Admin/leftbar/leftbar'
import Rightbar from '../../../components/Admin/rightbar/rightbar'
import AddUser from './AddUser'
import EditUser from './EditUser'
import {mapGetters} from 'vuex'
import EmptyData from '../../../components/EmptyData/EmptyData'
import Loading from "../../../components/Loading/Loading";

export default {
  name: "Home",
  components: {
    Loading,
    Leftbar,
    Rightbar,
    AddUser,
    EditUser,
    EmptyData
  },
  mounted() {
    try {
      this.fetchUsers();
    }catch (e){

    }
  },
  data() {
    return {
      AddUserModal: false,
      EditUserModal: false,
      userData: '',
      last_search_string: "",
      isFetchingUsers : false,
      companyUsers : [],
      roles : [],
    }
  },
  computed: {
    ...mapGetters([
      'getCompanyUsers'
    ]),
    companyUsersComputed : function (){
      // return [];
      return this.companyUsers.map((user)=>{
        return {
          id : user.id,
          displayName : `${user.firstName} ${user.lastName}`,
          firstName : `${user.firstName}`,
          lastName : `${user.lastName}`,
          userName : `${user.userName}`,
          email : user.emailAddress,
          tel : user.mobileNo,
          role : "",//this.roles.find((entry)=>{return user.rolesId === entry.id}).name,
          status : user.isActive
        }
      });
    }
  },
  created() {
  //  this.$store.dispatch("getAdminUsers");
  },
  methods: {
    closeAdd() {
      this.AddUserModal = false
    },
    openAdd() {
      this.AddUserModal = true
    },
    closeEdit() {
      this.EditUserModal = false
    },
    openEdit(result) {
      this.userData = result
      this.EditUserModal = true
    },
    fetchUsers:function (){
        this.isFetchingUsers = true;

          Promise.all([
            this.$store.dispatch("fetchCompanyUsers"),
            this.$store.dispatch("fetchRoles")
          ])
      .then((response)=>{
        console.log(response)
          this.companyUsers = response[0].data;
          this.roles = response[1].data;
      })
      .catch((error)=>{
        alert(`Error : ${error}`)
      })
      .then(()=>{this.isFetchingUsers = false;})
    },
    addUser:function (){

    },
    editUser:function (){

    },
    deleteUser:function (){

    }
  },
}
</script>