import { createStore }  from 'vuex'
import axios from'axios'
export default createStore({
  state: {
    url: 'https://zenith-cors.herokuapp.com/https://webservicestest.zenithbank.com:8443/CardPortalSecurityApi/',
    url2: 'https://zenith-cors.herokuapp.com/https://webservicestest.zenithbank.com:8443/CardPortalOperations/',
    activities: [],
    adminUsers:[],
    companies:[],
    roles:[],
    permissions:[],
    companyUsers:[],
    currentDate: "",
  },
  getters:{
   getUrl(state){
     return state.url;
   },
   getUrl2(state){
    return state.url2;
  },
   getActivities(state){
     return state.activities
   },
   getAdminUsers(state){
    return state.adminUsers
  },
  getCompanies(state){
    return state.companies
  },
  getRoles(state){
    return state.roles
  },
  getPermissions(state){
    return state.permissions
  },
  getCompanyUsers(state){
    return state.companyUsers
  },
  },
  mutations: {
    setActivities(state, payload){
      state.activities = payload;
    },
    setAdminUsers(state, payload){
      state.adminUsers = payload;
    },
    setCompanies(state, payload){
      state.companies = payload;
    },
    setRoles(state, payload){
      state.roles = payload;
    },
    setPermissions(state, payload){
      state.permissions = payload;
    },
    setCompanyUsers(state, payload){
      state.companyUsers = payload;
    }
  },
  actions: {
   async getActivities({commit, state}){
      const result = await axios.get(state.url + 'api/activities',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
      commit('setActivities', result.data)
    },

    async getAdminUsers({commit, state}){
      const result = await axios.get(state.url + 'api/adminusers',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
      commit('setAdminUsers', result.data)
    },

    async getCompanies({commit, state}){
      const result = await axios.get(state.url + 'api/companies',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
      commit('setCompanies', result.data)
    },

    async getRoles({commit, state}){
      const result = await axios.get(state.url + 'api/roles',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
      commit('setRoles', result.data)
    },

    async getPermissions({commit, state}){
      const result = await axios.get(state.url + 'api/permissions',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
      commit('setPermissions', result.data)
    },

    async getCompanyUsers({commit, state}){
      const result = await axios.get(state.url + 'api/companyusers',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        )
      commit('setCompanyUsers', result.data)
    },

      attemptLogin (context,payload){
         return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + '/api/companyusers',
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCompanyUsers(context){
          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + '/api/companyusers',
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },
      fetchCompanyActivities(context){
          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + '/api/companyactivities',
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },
      fetchRoles(context){
          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + '/api/roles',
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },
      fetchCompanyCardRequests(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/all/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      getClientDashboardData(context,clientId){
        return Promise.all([
            context.dispatch("fetchCompanyUsers"),
            context.dispatch("fetchCompanyActivities"),
            context.dispatch("fetchCompanyCardRequests",clientId),
            context.dispatch("fetchRoles"),
        ]);
      }

  },
  modules: {
  }
})
