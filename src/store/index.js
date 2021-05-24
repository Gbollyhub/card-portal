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
    activeUser:{
        companyId : 1,
    }
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
       const users = result.data
       const adminUsers = users.map(user => { 
         return {
            id: user.id,
            userName: user.userName,
            // rolesId : this.state.roles.find((entry)=>{return user.rolesId === entry.id}).name,
            created_at : user.created_at
         }
        })
        console.log(adminUsers)
      commit('setAdminUsers', adminUsers)
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
         return axios.post(process.env.VUE_APP_CardPortalSecurityApi_URL + '/api/Login/companylogin',
             payload,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCompanyUsers(context,companyId){

          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + `/api/companies/CompanyUsers/${companyId}` ,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCompanyActivities(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + `/api/companies/CompanyAcivities/${companyId}` ,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchActivities(context){
          return axios.get(process.env.VUE_APP_CardPortalSecurityApi_URL + '/api/activities',
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

      fetchCompanyPendingApproval(context,companyId){
        return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/pendingApproval/${companyId}`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    },

      fetchCompanyPendingAcknowledgement(context,companyId){
      return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/pendingacknowledgement/${companyId}`,
          {
              headers: {
                  "Content-Type": "application/json"
              }
          }
      )
  },

      getClientDashboardData(context,companyId){
        return Promise.all([
            context.dispatch("fetchCompanyUsers",companyId),
            context.dispatch("fetchCompanyActivities",companyId),
            context.dispatch("fetchCompanyCardRequests",companyId),
            context.dispatch("fetchCompanyPendingApproval",companyId),
            context.dispatch("fetchCompanyPendingAcknowledgement",companyId),
            context.dispatch("fetchRoles"),
        ]);
      },

      ///Activities

      //Card Activation
      cardActivate(context,companyId,userId,clientCode){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/cardactivatedeactivate/activation`,
              {
                  "companyId": companyId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardDeactivate(context,companyId,userId,clientCode){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/cardactivatedeactivate/deactivation`,
              {
                  "companyId": companyId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      //Card Cancellation
      fetchCardCancellationByAccountNo(context,accountId,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardCancellation/${accountId}/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardCancellationByWorkFlowId(context,workFlowId,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardCancellation/${workFlowId}/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardCancellationByCompanyId(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardCancellation/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardCancellationInitiateCardAndReprocess(context,id,companyId,workflowId,clientCode,userId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardCancellation/initialcardandreprocess`,
              {
                  "id": id,
                  "companyId": companyId,
                  "workflowId": workflowId,
                  "clientCode": clientCode,
                  "userId": userId
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardCancellationApprove(context,id,requestIdsArray,companyId,workflowId,clientCode,userId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardCancellation/approvecardcancellation`,
              {
                  "requestId": requestIdsArray,
                  "companyId": companyId,
                  "workflowId": workflowId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardCancellationReject(context,id,requestIdsArray,companyId,workflowId,clientCode,userId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardCancellation/rejectcardcancellation`,
              {
                  "requestId": requestIdsArray,
                  "companyId": companyId,
                  "workflowId": workflowId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardCancellationPendingApprovals(context,companyId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardCancellation/pendingapprovals/${companyId}`,
              {

              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardCancellationRejectedRequest(context,companyId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardCancellation/rejectedrequest/${companyId}`,
              {
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      //Card Pin
      cardPINRetrieval(context,companyId,userId,clientCode){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardPin/pinretrieval`,
              {
                  "companyId": companyId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      //Card Reissue
      fetchCardReissueByAccountNo(context,accountNo,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/getbyaccountno/${accountNo}/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardReissueByCompanyId(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/all/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardReissueByPendingApprovalRequest(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/PendingApprovalRequest/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardReissueByPendingAcknowlegement(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/PendingAcknowlegement/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardReissueReason(context){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/reissuereason`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardReissueMakeRequest(context,cardReissueObjectArray){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/MakeCardReissueRequest`,
              cardReissueObjectArray.map((item)=>{
                  return {
                      "id": item.id,
                      "userId": item.userId,
                      "companyId": item.companyId,
                      "accountNumber": item.accountNumber,
                      "accountName": item.accountName,
                      "requestBranch": item.requestBranch,
                      "pickupBranch": item.pickupBranch,
                      "cardPan": item.cardPan,
                      "workflowId": item.workflowId,
                      "reason": item.reason,
                      "newNameOfCard": item.newNameOfCard,
                      "activityBy": item.activityBy,
                      "surname_change": item.surname_change
                  }
              }),
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardReissueApproveRequest(context,requestIdsArray,companyId,workflowId,clientCode,userId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/AproveCardReissueRequest`,
              {
                  "requestId": requestIdsArray,
                  "companyId": companyId,
                  "workflowId": workflowId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardReissueRejectRequest(context,requestIdsArray,companyId,workflowId,clientCode,userId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/RejectCardReissueRequest`,
              {
                  "requestId": requestIdsArray,
                  "companyId": companyId,
                  "workflowId": workflowId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardReissueByPendingRejectRequest(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/PendingRejectRequest/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardReissueReprocessRejectedRequest(context,id,userId,companyId,accountNumber,accountName,
                                          requestBranch,pickupBranch,cardPan,workflowId,reason,newNameOfCard,
                                          activityBy,surname_change){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardReissue/ReprocessrejectedRequest`,
              {
                  "id": id,
                  "userId": userId,
                  "companyId": companyId,
                  "accountNumber": accountNumber,
                  "accountName": accountName,
                  "requestBranch": requestBranch,
                  "pickupBranch": pickupBranch,
                  "cardPan": cardPan,
                  "workflowId": workflowId,
                  "reason": reason,
                  "newNameOfCard": newNameOfCard,
                  "activityBy": activityBy,
                  "surname_change": surname_change
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },
      //Card Request
      cardRequestMake(context,cardRequestObjectArray){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/makecardrequest`,
              cardRequestObjectArray.map((item)=>{
                  return {
                      "id": item.id,
                      "companyId": item.companyId,
                      "userId": item.userId,
                      "title": item.title,
                      "firstName": item.firstName,
                      "middleName": item.middleName,
                      "lastName": item.lastName,
                      "gender": item.gender,
                      "maritalStatus": item.maritalStatus,
                      "mobileNo": item.mobileNo,
                      "email": item.email,
                      "dateOfBirth": item.dateOfBirth,
                      "addressLine1": item.addressLine1,
                      "addressLine2": item.addressLine2,
                      "cityCode": item.cityCode,
                      "regionCode": item.regionCode,
                      "countryCode": item.countryCode,
                      "legalID": item.legalID,
                      "idCardTypeCode": item.idCardTypeCode,
                      "documentIssueDate": item.documentIssueDate,
                      "expiryDateOfDoc": item.expiryDateOfDoc,
                      "accountNbr": item.accountNbr,
                      "nameOnCard": item.nameOnCard,
                      "branchNo": item.branchNo,
                      "socioProfCode": item.socioProfCode,
                      "productCode": item.productCode
                  }
              }),
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardRequestApproveOrAcknowledge(context,requestIdsArray,companyId,workflowId,clientCode,userId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/approveoracknowledge`,
              {
                  "requestId": requestIdsArray,
                  "companyId": companyId,
                  "workflowId": workflowId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardRequestByPendingApproval(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/pendingApproval/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardRequestByPendingAcknowledgement(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/pendingacknowledgement/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardRequestAll(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/all/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardByAccountNo(context,companyId,accountNo){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/cardbyaccountNo/${companyId}/${accountNo}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardRequestStatus(context,companyId,userId,clientCode){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/cardstatus`,
              {
                  "companyId": companyId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardRequestReject(context,requestIdsArray,companyId,workflowId,clientCode,userId){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/RejectCardRequest`,
              {
                  "requestId": requestIdsArray,
                  "companyId": companyId,
                  "workflowId": workflowId,
                  "userId": userId,
                  "clientCode": clientCode
              },
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCardRequestPendingReject(context,companyId){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/PendingRejectRequest/${companyId}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      cardRequestReprocessRejected(context,cardRequestObjectArray){
          return axios.post(process.env.VUE_APP_CardPortalOperations_URL + `/api/CardRequest/ReprocessrejectedRequest`,
              cardRequestObjectArray.map((item)=>{
                  return {
                      "id": item.id,
                      "companyId": item.companyId,
                      "userId": item.userId,
                      "title": item.title,
                      "firstName": item.firstName,
                      "middleName": item.middleName,
                      "lastName": item.lastName,
                      "gender": item.gender,
                      "maritalStatus": item.maritalStatus,
                      "mobileNo": item.mobileNo,
                      "email": item.email,
                      "dateOfBirth": item.dateOfBirth,
                      "addressLine1": item.addressLine1,
                      "addressLine2": item.addressLine2,
                      "cityCode": item.cityCode,
                      "regionCode": item.regionCode,
                      "countryCode": item.countryCode,
                      "legalID": item.legalID,
                      "idCardTypeCode": item.idCardTypeCode,
                      "documentIssueDate": item.documentIssueDate,
                      "expiryDateOfDoc": item.expiryDateOfDoc,
                      "accountNbr": item.accountNbr,
                      "nameOnCard": item.nameOnCard,
                      "branchNo": item.branchNo,
                      "socioProfCode": item.socioProfCode,
                      "productCode": item.productCode
                  }
              }),
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      //Common
      fetchCommonCountries(context){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/Common/countries`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCommonStates(context){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/Common/states`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCommonCitiesInStateCode(context,stateCode){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/Common/cities/${stateCode}`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCommonMaritalStatus(context){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/Common/martialstatus`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCommonIDCardType(context){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/Common/idcardtype`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCommonSocioProf(context){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/Common/SocioProf`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

      fetchCommonBranch(context){
          return axios.get(process.env.VUE_APP_CardPortalOperations_URL + `/api/Common/Branch`,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      },

  },
  modules: {
  }
})
