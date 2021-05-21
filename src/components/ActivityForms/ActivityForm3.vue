<template>
  <Loader v-show="loader"/>
  <Status :state="state" :closeModal = "closeAddReload" :message = "message" :resetState="resetState" v-if="status"/>
  <div class="content-header">Transaction Log</div>
  <form @submit.prevent="sendRequest">
    <div class="form-block w-form">
      <input type="text" class="app-input-search w-input" maxlength="256" name="name" data-name="Name" placeholder="Search..." id="name"/>
    </div>
    <button type="submit" class="app-form-button">Submit</button>
  </form>
</template>

<script>
import operationMixen from "../../views/Client/operationMixen";
import Leftbar from "../Client/leftbar/leftbar";
import Rightbar from "../Client/rightbar/rightbar";
import Loader from "../Loader/Loader";
import Status from "../Status/Status2";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "ActivityForm1",

  components: {
    Leftbar,
    Rightbar,
    Loader,
    Status
  },
  computed:{
    ...mapGetters([ 'getUrl2', 'getUrl' ])
  },
  mixins: [operationMixen],
  data(){
    return{
      loader: false,
      status: false,
      state: null,
      message: null,
      form:{
        "productCode": "34567",
        "branchNo": "Abuja",
        "companyId": 9,
        "userId": 2,
        "title": "",
        "firstName": "",
        "middleName": "",
        "lastName": "",
        "gender": "",
        "maritalStatus": "",
        "mobileNo": "",
        "email": "",
        "dateOfBirth": "",
        "addressLine1": "",
        "addressLine2": "",
        "cityCode": "",
        "regionCode": "",
        "countryCode": "",
        "legalID": "",
        "idCardTypeCode": "",
        "documentIssueDate": "",
        "expiryDateOfDoc": "",
        "accountNbr": "",
        "nameOnCard": "",
        "socioProfCode": ""
      }
    }
  },
  methods: {
    clearForm(){
      this.form.title= "";
      this.form.firstName= "";
      this.form.middleName= "";
      this.form.lastName= "";
      this.form.gender= "";
      this.form.maritalStatus= "";
      this.form.mobileNo= "";
      this.form.email= "";
      this.form.dateOfBirth= "";
      this.form.addressLine1= "";
      this.form.addressLine2= "";
      this.form.cityCode= "";
      this.form.regionCode= "";
      this.form.countryCode="";
      this.form.legalID= "";
      this.form.idCardTypeCode= "";
      this.form.documentIssueDate= "";
      this.form.expiryDateOfDoc="";
      this.form.accountNbr="";
      this.form.nameOnCard="";
      this.form.socioProfCode="";
    },
    resetState(){
      this.status = false;
    },
    async sendRequest(){
      this.loader = true;
            const user = JSON.parse(localStorage.getItem("user-mfb"))
     const company = await axios.get(this.getUrl + 'api/companies/' + parseInt(user.companyId))
      const companyProduct = await axios.get(this.getUrl + '/api/CardProductSetup')
     const product = await companyProduct.data.find(x => { return x.companyId == parseInt(user.companyId) })
       const formData ={
        "productCode": product.cardProductCode,
        "branchNo": company.data.branch,
        "companyId": parseInt(user.companyId),
        "userId": parseInt(user.id),
        "title": this.form.title,
        "firstName": this.form.firstName,
        "middleName": this.form.middleName,
        "lastName": this.form.lastName,
        "gender": this.form.gender,
        "maritalStatus": this.form.maritalStatus,
        "mobileNo": this.form.mobileNo,
        "email": this.form.email,
        "dateOfBirth": this.form.dateOfBirth,
        "addressLine1": this.form.addressLine1,
        "addressLine2": this.form.addressLine2,
        "cityCode": this.form.cityCode,
        "regionCode":this.form.regionCode,
        "countryCode": this.form.countryCode,
        "legalID": this.form.legalID,
        "idCardTypeCode": this.form.idCardTypeCode,
        "documentIssueDate": this.form.documentIssueDate,
        "expiryDateOfDoc": this.form.expiryDateOfDoc,
        "accountNbr": this.form.accountNbr,
        "nameOnCard": this.form.nameOnCard,
        "socioProfCode": this.form.socioProfCode
      }
      try {
        const response = await axios.post(this.getUrl2 + 'api/CardRequest/makecardrequest',[formData])
        if(response.status == 200){
          this.loader = false;
          this.status = true;
          this.state = 'success';
          this.message = 'Operation Sucessful'
          this.clearForm();
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

<style scoped>

</style>