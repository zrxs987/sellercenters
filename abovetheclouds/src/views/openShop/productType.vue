<template>
  <div>
    <!-- 步骤栏 -->
   <progressBar :atPresent='2'/>
    <div class="setUpShop">
      <div class="productType">
        
        <!-- foem提交表单 -->
        <el-form :model="productType" :rules="productRule" ref="productType" label-width="100px">
          <el-form-item label="产品类型" prop="radio">
            <el-radio-group v-model="productType.radio">
              <el-radio :label="1">食品类</el-radio>
              <el-radio :label="2">化妆品类</el-radio>
              <el-radio :label="3">纸/卫生巾/消毒/洗衣液产品类</el-radio>
              <el-radio :label="4">初级农副产品/家庭手..</el-radio>
              <el-radio :label="5">初级农副产品类</el-radio>
              <el-radio :label="6">电器类</el-radio>
              <el-radio :label="7">儿童玩具类</el-radio>
              <el-radio :label="8">五金类</el-radio>
              <el-radio :label="9">酒/水/饮料</el-radio>
              <el-radio :label="10">服装类</el-radio>
              <el-radio :label="11">化工产品(危险化学品除外)</el-radio>
              <el-radio :label="12">生活用品</el-radio>
              <el-radio :label="13">建筑材料</el-radio>
              <el-radio :label="14">生产室内照明灯具</el-radio>
              <el-radio :label="15">板式家具</el-radio>
              <el-radio :label="16">钟表珠宝首饰</el-radio>
              <el-radio :label="17">文体用品</el-radio>
              <el-radio :label="18">电子产品</el-radio>
              <el-radio :label="19">工艺品</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="公司名称" prop="companyName">
            <el-input class="shopInput" v-model="productType.companyName" clearable></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="modelName">
            <el-input class="shopInput" v-model="productType.modelName" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input class="shopInput" v-model="productType.phoneNumber" clearable></el-input>
          </el-form-item>

          <!-- 上传文件 -->
         <div class="upload-box">
           <el-form-item label>
            <span class="upload-img">上传营业执照</span>
            <upload :show="false"  @on-Success="businessImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传商标注册证</span>
            <upload :show="false" @on-Success="brandImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传检验报告</span>
            <upload :show="false" @on-Success="checkoutImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传开户许可证</span>
            <upload :show="false" @on-Success="accountImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传生产许可证</span>
            <upload :show="false" @on-Success="productionImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传云端商城授权书</span>
            <upload :show="false" @on-Success="cloudImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传含税，含物流价格表</span>
            <upload :show="false" @on-Success="tallageImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传代加工企业营业执照</span>
            <upload :show="false" @on-Success="OEMImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传代加工企业生产许可证</span>
            <upload :show="false" @on-Success="OEMSImgonSuccess"/>
          </el-form-item>
        </div>
           <!-- 按钮 -->
            <div class="buttonBtn">
               <el-button type="primary"  @click="handleCancel()">取消</el-button>
               <el-button type="primary"  @click="handleSubmit()">提交</el-button>
            </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import upload from "@/components/publicMethod/upload";
import progressBar from "@/components/publicMethod/progressBar";
import { getProductType } from "@/api/openShop";

export default {
  name:'productType',
  components: {
       upload,
       progressBar
   },
  data() {
    return {
      productType: {
        radio: '',
        companyName: '',
        phoneNumber:'',
        modelName:'',
        business:'',
        brand:'',
        checkout:'',
        account:'',
        production:'',
        cloud:'',
        tallage:'',
        OEM:'',
        OEMS:'',
      },
      //提供厂家资料规则
      productRule: {
        companyName: [
                {
                  required: true,
                  message: "带*号不能为空",
                  trigger: "blur"
                }
              ],
        phoneNumber: [
               {
                required: true,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                message: '请输入正确的手机号',
                trigger: 'blur',
              }
            ],
        modelName: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
          ],
        radio: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
        AAXX: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      },
      productType:{

      },
    }
  },
  
  methods:{
    //上传营业执照
   businessImgonSuccess( e) {
       this.business = e.target.files[0]
    },
    //上传商标注册证
   brandImgonSuccess(e ) {
       this.brand = e.target.files[0]
    },
    //上传检验报告
   checkoutImgonSuccess(e ) {
       this.checkout = e.target.files[0]
    },
    //上传开户许可证
   accountImgonSuccess( e) {
       this.account = e.target.files[0]
    },
    //上传生产许可证
   productionImgonSuccess(e ) {
       this.production = e.target.files[0]
    },
    //上传云端商城授权书
   cloudImgonSuccess(e ) {
       this.cloud = e.target.files[0]
    },
    //上传含税，含物流价格表
   tallageImgonSuccess(e ) {
      this.tallage = e.target.files[0]
    },
    //上传代加工企业营业执照
   OEMImgonSuccess(e ) {
        this.OEM = e.target.files[0]
    },
    //上传代加工企业生产许可证
   OEMSImgonSuccess(e ) {
       this.OEMS = e.target.files[0]
    },
    //点击提交按钮
    handleSubmit( ) {
       this.$refs.productType.validate(res => {
        if (res) {

            //  var applyFor=JSON.parse(window.sessionStorage.getItem('applyFor'))
            //   console.log(applyFor,'applyFor',789457)
              
            //  let obj = {
            //      contactsName:applyFor.contactsName,
            //      contactsPhone:applyFor.contactsPhone,
            //      contactsAddress:applyFor.contactsAddress,
            //      contactsWx:applyFor.contactsWx,
            //      scId:this.productType.radio,
            //      companyName:this.productType.companyName,
            //      productName:this.productType.modelName,
            //      companyPhone:this.productType.phoneNumber,
            
            //   }

              let formData = new FormData()
              formData.append('scId',this.productType.radio)
              formData.append('companyName',this.productType.companyName)
              formData.append('productName',this.productType.modelName)
              formData.append('companyPhone',this.productType.phoneNumber)

              formData.append('companyBusinessLicense',this.business)
              formData.append('companyRegistrationCertificate',this.brand)
              formData.append('companyInspectionReport',this.checkout)
              formData.append('companyAccountPermit',this.account)
              formData.append('companyProductionLicense',this.production)
              formData.append('companyPriceTable',this.cloud)
              formData.append('generationCompanyBusinessLicense',this.tallage)
              formData.append('generationCompanyBusinessLicense',this.OEM )
              formData.append('generationCompanyProductionLicense',this.OEMS)
              
                for(var [key, value] of formData.entries()){
                 console.log(key, value);
                 }

              getProductType( formData ).then(( res )=>{
                   console.log(res,'res')
                if(res.code ==='200'){
                  setTimeout(() => {
                      this.$router.push({
                        path:'./foodCategory',
                        query: {
                            scId: this.productType.radio
                            }
                           });
                    }, 1000)          
              }else{
                      this.$message({
                        message: res.errorMsg,
                        type: 'error',
                        duration: 5 * 1000
                      })
                  }
               })
              
            }
         })
      },
    //点击取消按钮
    handleCancel() {
        this.$refs.productType.resetFields();
        this.productType = {}
    },
   }
};
</script>


<style lang="scss" scoped>

.productType {
  width: 578px;
  margin-left: 100px;
}
.el-radio {
  margin-bottom: 30px;
}
.el-radio-group {
  margin-top: 30px;
}
 .upload-img {
   margin-left: -70px;
   line-height: 40px;
 }
 .upload-box {
     .el-form-item {
         float: left;
         width: 210px;
         height: 150px;
     }
 }
.buttonBtn {
    margin-left: 160px;
}

</style>
