<template>
  <div>
    <div class="personalData">
      <el-form ref="personalData" :model="personalData" :rules="personalDataRule"  label-width="100px">

        <el-form-item label="地址详情" prop="adventure">
             <el-input type="textarea" :rows="2" resize="none"  placeholder="请填写省/市/区"  v-model="personalData.adventure"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="location">
             <el-input type="textarea" :rows="3" resize="none" placeholder="请输入详细信息,如街道,小区,楼栋号"  v-model="personalData.location"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" >
          <el-input placeholder="请填写邮编" v-model="personalData.postalService"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名" prop="consignee">
          <el-input placeholder="请填写收货人姓名" v-model="personalData.consignee"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input placeholder="请填写手机号码" v-model="personalData.phoneNumber"></el-input>
        </el-form-item>
          <el-form-item label="" >
          <el-checkbox-group v-model="personalData.type">
            <el-checkbox label="设为默认地址" name="type" :true-label="1" :false-label="0"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button  type="primary" style="width:8%;margin-bottom:30px;margin-left: 100px;" @click.native.prevent="handleSave">保存</el-button>
        <el-button  type="primary" style="width:8%;margin-bottom:30px;margin-left: ;" @click.native.prevent="handleReset">重置</el-button>
      </el-form>
      <div class="addressSeveral"> 
          <p>以保存7条地址，还可以保存13条地址</p>
      </div>
    <el-table
      :data="list"
     
      border
      fit
      highlight-current-row
      :header-cell-style="{background:'#dee1e6'}" 
    >
      <el-table-column align="center" label="收货人">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column  align="center" label="所在地址">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column   align="center" label="详细地址">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮编" >
        <template slot-scope="scope">
          <span>{{ scope.row.disp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话/手机">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设置地址">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import { getBusinessAddress, getIdAddress, getModificationAddress} from "@/api/locationManage";
 
export default {
  name: "addLocation",

  data() {
    return {
      personalData: {
         province:'',
         city:'',
         district:'',
         adventure:'',
         location:'',
         postalService:'',
         consignee:'',
         phoneNumber:'',
         type:'0',
      },
     //申请开店规则
    personalDataRule: {
      adventure: [
               {
                required: true,
                message: "带*号不能为空",
                trigger: "blur"
              }
             ],
      phoneNumber:[ 
               {
                required: true,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                message: '请输入正确的手机号',
                trigger: 'blur',
              }
           ],
      consignee: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      location: [
            {
            required: true,
            message: "带*号不能为空",
            trigger: "blur"
           }
        ],
      },
     personalData:{},
      list:[],
    }
  },
 methods: {
  //保存
 handleSave() {
    this.$refs.personalData.validate(res => {
    if (res) {
      
      let obj = {
        storeId:1,
        sellerName:this.personalData.consignee,
        areaId:'',
        cityId:'',
        areaInfo:this.personalData.adventure,
        address:this.personalData.location,
        telphone:this.personalData.phoneNumber,
        isDefault:this.personalData.type,
      }
       getBusinessAddress(obj).then((res)=>{
            console.log(res,'111')
         })
        }
       })
     },

  //重置   
 handleReset() {
      this.$refs.personalData.resetFields();
      this.personalData = {}
 },

    
  }  
};
</script>

<style lang="scss" scoped>
.personalData {
  
  margin-top: 50px;
  .el-form {
     margin-left: 100px;
  }
}
.el-input {
  width: 300px;
}
.upload-img {
  margin-left: -70px;
  font-weight: bold;
}
/deep/.el-input__inner {
     width:300px;
     height:40px;
   }
/deep/.el-textarea__inner {
    width:300px;
}
.addressSeveral {
  width: 40%;
  // margin-left: 100px;
  background-color: gainsboro;
  p {
    line-height: 50px;
    margin-left: 20px;
    color: #fff;
  }
}
.select {
  width: 150px;
}

</style>
