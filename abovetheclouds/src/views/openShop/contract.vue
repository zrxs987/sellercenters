<template>
  <div>
    <!-- 步骤栏 -->
    <progressBar :atPresent="5"/>
    <div class="setUpShop">
    <el-form label-width="80px" v-model="uploading" v-show="isShow" enctype="multipart/form-data">
      <div class="upload-box clearfix">
        <el-form-item label>
          <span class="upload-img">上传盖章后的合同</span>
          <upload :show="false" @on-Success="contractImgonSuccess"/>
        </el-form-item>
      </div>
      <div class="buttonBtn">
        <el-button type="primary" @click="handleCancel()">取消</el-button>
        <el-button type="primary" @click="handleSubmit()">提交</el-button>
      </div>
    </el-form>
    <!-- 开店成功 -->
    <div class="audit-box" v-show="isSucceedShow">
      <div class="shopSuccessfully">
        <i class="iconfont icon-kaidian"></i>
        <p>开店成功</p>
        <el-button class="addition" round>添加对应的编号</el-button>
      </div>
    </div>
    <!-- 上传产品 -->
    <el-dialog title="上传产品" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="formProduct">
        <el-form-item label="标题" prop="headlines">
          <el-input class="shopInput" v-model="formProduct.headlines" placeholder="请输入标题" type="password"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input class="shopInput" v-model="formProduct.price" placeholder="请输入价格" type="password"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop=" integral">
          <el-input class="shopInput" v-model="formProduct.integral" placeholder="请输入积分" type="password"></el-input>
        </el-form-item>
        <el-form-item label class="from-upload" label-width="40px">
          <span class="upload-img">上传图片</span>
          <upload :show="false" @on-Success="bankImgonSuccess"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleModifyPwd()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import upload from "@/components/publicMethod/upload";
import progressBar from "@/components/publicMethod/progressBar";
import { getaddContract } from "@/api/openShop";

export default {
  name:'contract',
  components: {
    upload,
    progressBar
  },
  data() {
    return {
      dialogFormVisible:false,//上传产品弹框
      isSucceedShow: false,
      isShow: true,
      //上传产品定义
      formProduct: {
        headlines: "",
        price: "",
        integral: ""
      },

      uploading:{
         //盖章的合同
         contract:'',
      },
    }
  },
  methods: {
    //取消
    handleCancel() {

    },
    //上传盖章后的合同
    contractImgonSuccess(e) {
       this.contract = e.target.files[0]

    },
    //提交
    handleSubmit() {
       let formData = new FormData()
       formData.append('contract',this.contract)
       console.log(formData.get("contract"));
       console.log(formData);

      getaddContract(formData).then((res)=>{
        if(res.code === '200'){
          this.isShow = false
          this.isSucceedShow = true
             setTimeout(() => {
              this.dialogFormVisible = true
        }, 2000)
        }else{
               this.$message({
                message: res.errorMsg,
                type: 'error',
                duration: 5 * 1000
              })
            }
        })
    },

    bankImgonSuccess() {

    },
    // 提交按钮
    handleModifyPwd() {
        this.dialogFormVisible = false
    },

  }
};
</script>

<style lang="scss" scoped>
.el-steps {
  margin-top: 80px;
}

.buttonBtn {
  margin-left: 210px;
}
.upload-img {
  margin-left: -60px;
  line-height: 50px;
}
 .upload-box {
   width: 500px;
   margin-top: 50px;
   margin: 0 auto;
     .el-form-item {
         width: 210px;
         height: 150px;
     }
 }
//审核
.audit-box {
  width: 400px;
  height: 400px;
  margin: 100px auto;
  text-align: center;
  /deep/.iconfont {
    font-size: 50px !important;
    color: #dc0203;
    margin-left: -5px;
  }
  p {
    font-size: 22px;
    line-height: 30px;
  }
  .addition {
    margin-left: 0px;
    background-color: #fce8e8 !important;
    color: #dc0203;
  }
}
.dialog-footer{
    text-align: center;
    margin-left: -80px;
}
.from-upload {
  width: 200px;
  margin-left: 80px;
}
</style>
