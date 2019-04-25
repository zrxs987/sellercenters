<template>
  <div>
    <!-- 步骤栏 -->
   <progressBar :atPresent='2'/>
    <div class="setUpShop">
      <div class="productType">
        
        <!-- foem提交表单 -->
        <el-form label-width="100px" v-model="productType">
          <el-form-item label="选择产品类型">
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
          <el-form-item label="公司名称">
            <el-input class="shopInput" v-model="productType.name"></el-input>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input class="shopInput" v-model="productType.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input class="shopInput" v-model="productType.name"></el-input>
          </el-form-item>

          <!-- 上传文件 -->
         <div class="upload-box">
           <el-form-item label >
            <span class="upload-img">上传营业执照</span>
            <upload :show="false"  @on-Success="bankImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传商标注册证</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传检验报告</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传开户许可证</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传生产许可证</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传云端商城授权书</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传含税，含物流价格表</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传代加工企业营业执照</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
          </el-form-item>
          <el-form-item label>
            <span class="upload-img">上传代加工企业生产许可证</span>
            <upload :show="false" @on-Success="bankImgonSuccess"/>
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
        name: ""
      },
    }
  },
  methods:{
      bankImgonSuccess( ) {

      },
      // 点击下一步
      handleSubmit( ) {
         this.$router.push({path:'./foodCategory'});
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
