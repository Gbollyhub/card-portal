<template>
  <div class="app-admin-section">
    <div class="app-admin-col-1">
      <Leftbar/>
    </div>
    <div class="app-admin-col-2">
      <div class="admin-top-bar">
        <div class="admin-top-bar-left">
          <div class="settings-icon"></div>
        </div>
        <div class="admin-top-bar-right">
          <div class="admin-topbar-date">October 8th, 2020</div>
        </div>
      </div>
      <div class="content-header">Activities</div>
      <div class="content-sub">Here are the activities on the system</div>
      <Loading v-if="isFetchingActivities" />
      <div v-else class="summary-flexbox">
        <div class="content-slide-box" v-for="(item, index) in activities_computed" :key="index">
          <div class="activity-info-card">
            <div class="activity-card-icon"></div>
            <div class="activity-card-header">{{ item.title }}</div>
            <router-link :to="item.url">
              <div class="activity-btn">Open</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="app-admin-col-3">
      <Rightbar/>
    </div>
  </div>
</template>

<script>
import Leftbar from '../../../components/Client/leftbar/leftbar'
import Rightbar from '../../../components/Client/rightbar/rightbar'
import Loading from "../../../components/Loading/Loading";

export default {
  name: "Home",
  components: {
    Loading,
    Leftbar,
    Rightbar
  },
  mounted() {
    try {
      this.fetchCompanyActivities();
    }catch (e){
      console.log("views/Activities@mounted",e)
    }
  },
  data() {
    return {
      activities: [
        {title: 'Instant Card Request', url: "card-request"},
      ],
      companyActivities : [],
      last_search_string: "",
      isFetchingActivities : false,
    }
  },
  methods:{
    fetchCompanyActivities:function (){
      this.isFetchingActivities = true;
       const companyId = JSON.parse(localStorage.getItem("user-mfb"))
      Promise.all([
        this.$store.dispatch("fetchActivities"),
        this.$store.dispatch("fetchCompanyActivities",companyId.companyId),
      ]).then((response)=>{
            console.log("Done",response)
            this.activities = response[0].data;
            this.companyActivities = response[1].data;
          })
          .catch((error)=>{
            alert(`Error : ${error}`)
          })
          .then(()=>{this.isFetchingActivities = false;})
    }
  },
  computed: {
    activities_computed: function () {
      return this.companyActivities.map((activity)=>{
        return {
          title : activity.name,
          url : `activity-form/${activity.id}`
        }
      });
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.activity-card-header {
  margin-bottom: 15px;
  color: #262626;
  font-size: 14px;
  font-weight: 700;
}

.activity-btn {
  background: #c00;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  color: white;
  width: 100px;
}
</style>