<template>
    <div>
      <div class="app-admin-brand"></div>
    <router-link :to="{ name: 'Overview'}">
     <div class="admin-col-link-div">
        <div class="admin-col-1-links active-link"></div>
        <div class="admin-col-link-text active-link">Dashboard</div>
      </div>
    </router-link> 
     <router-link :to="{name : 'Requests'}">
        <div class="admin-col-link-div">
        <div class="admin-col-1-links"></div>
        <div class="admin-col-link-text">Requests</div>
      </div>
     </router-link>
     <router-link :to="{name : 'Activities'}">
       <div class="admin-col-link-div">
        <div class="admin-col-1-links"></div>
        <div class="admin-col-link-text">Activities</div>
      </div>
     </router-link>
      <router-link :to="{name : 'UserMgmt'}">
             <div class="admin-col-link-div">
        <div class="admin-col-1-links"></div>
        <div class="admin-col-link-text">User<br>Management</div>
      </div> 
      </router-link>

      <div class="admin-col-logout"><span class="text-span-3"></span> Logout</div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a { text-decoration: none;}
</style>