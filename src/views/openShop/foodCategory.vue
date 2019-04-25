<template>
  <div>
    <progressBar :atPresent='3'/>
    <div class="setUpShop" v-show="isShow">
      <!-- form提交表单 -->
      <el-form :model="setUpShop" label-width="80px">
        <div class="upload-box">
          <el-form-item label v-for="item in setUpShopList" :key="item.id">
            <span class="upload-img">{{item.titles}}</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
        </div>
           <div class="buttonBtn">
            <el-button type="primary" @click="handleCancel()">取消</el-button>
            <el-button type="primary" @click="handleSubmit()">提交</el-button>
          </div>
      </el-form>
    </div>

    <div class="audit-box" v-show="isSucceedShow">
      <div class="shopSuccessfully">
        <i class="iconfont icon-shenhe"></i>
        <p>审核中</p>
      </div>
    </div>
  </div>
</template>

<script>
import progressBar from "@/components/publicMethod/progressBar";
import upload from "@/components/publicMethod/upload";

export default {
  name:'foodCategory',
  components: {
    progressBar,
    upload
  },
  data() {
    return {
      isShow: true,
      isSucceedShow: false,
      // 申请开店定义
      setUpShop: {
        userName: "",
        phoneNumber: "",
        WechatID: ""
      },
      setUpShopList: [
        { titles: "上传营业执照"},
        { titles: "上传手持开户许可证"},
        { titles: "上传身份证正反面+手持"},
        { titles: "上传食品经营许可证"},
        { titles: "上传云端商城授权书"},
        { titles: "上传代加工企业营业执照"},
        { titles: "上传代加工企业营业执照"},
        { titles: "上传代加工企业营业执照"},
        { titles: "上传代加工企业营业执照"},
      ]
    };
  },
  methods: {
    bankImgonSuccess() {},
    //提交按钮
    handleSubmit() {
      this.isShow = false;
      this.isSucceedShow = true;
      
      setTimeout(() => {
            this.$router.push({path:'./contract'});
            // this.$router.push({path:'./productType'});
        }, 2000)
    },
    // 取消按钮
    handleCancel() {

    }
  }
};
</script>

<style scoped lang="scss">

.upload-img {
  margin-left: -60px;
  margin-top: 80px;
  line-height: 40px;
}
.upload-box {
    margin-left: 100px;
}
  .buttonBtn {
     margin-left: 240px;
  }

//审核
.audit-box {
  width: 400px;
  margin: 100px auto;
  text-align: center;
  /deep/.iconfont {
    font-size: 50px !important;
    color: #dc0203;
    margin-left: -5px;
  }
  p {
    font-size: 22px;
    line-height: 50px;
  }
}
</style>

