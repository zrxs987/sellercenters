<template>
  <div class="app-container">
 <div class="filter-container">
      <el-row >
          <!-- <el-col :span="24" > -->
            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
       
             <el-col :span="5">
                <span>优惠卷状态 ：</span>
                 <el-input style="width: 60%;" placeholder="请输入" size="medium" v-model="queryData.sku" clearable></el-input>
            </el-col>
                <div class="btnClick">
                <el-button type="primary"  @click="handleInquire">查询</el-button>
                <el-button type="primary"  @click="handleReset">重置</el-button>
              </div>
            </el-form>
        </el-row>
        <div class="secondLevel">
            <el-button type="primary"  @click="handleApplyFor">发布优惠卷</el-button>
        </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      :header-cell-style="{background:'#dee1e6'}" 
    >
      <el-table-column align="center" label="优惠卷信息">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="总数" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="领取数"  align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余数" >
        <template slot-scope="scope">
          <span>{{ scope.row.disp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="使用数">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="未使用数">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="优惠卷状态">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
    </el-table>
   
     <pagination :total='50'/>
    <!-- 发布优惠卷-->
    <el-dialog
      class="ui-layout_edit-dialog"
      title="发布优惠卷"
      :visible.sync="isShow"
      width="500px"
      @close="handleCloseSystemInfo"
    >
      <div class="remark">
        <el-form :model="editData" :rules="editDataRule" ref="editData" class="ui-form">
          <el-form-item label="优惠卷类型" :label-width="formLabelWidth" prop="tax_point">
            <el-select size="small" v-model="editData.ProcessingType" clearable>
              <el-option
                v-for="(label, value) in optionList.disposeTyleList"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优惠面额" :label-width="formLabelWidth" prop="supplier_name">
            <el-input size="small" v-model="editData.supplier_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="消费金额" :label-width="formLabelWidth" prop="Purchase_link">
            <el-input size="small" v-model="editData.Purchase_link" clearable></el-input>
          </el-form-item>
          <el-form-item label="截止时间" :label-width="formLabelWidth" prop="Purchase_link">
             <el-select size="small" v-model="editData.ProcessingType" clearable>
              <el-option
                v-for="(label, value) in optionList.disposeTyleList"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="footerBtn">
            <el-button size="small" @click="handleCancel()">取消</el-button>
            <el-button size="small" type="primary" @click="handleAffirm()">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index'

export default {
  name: 'discountCouponList',
  components:{
      pagination
  },
  data() {
    return {
      isShow:false,
      formLabelWidth: "100px",
      list: null,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      filename: '',
      quantumTime:'',
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: '+id'
      },
      queryData:{},
      //下拉框
      fixOrderListPara:{
          status:'',
          technicianId:'',
      },
      //下拉列表
     orderConditionText:{
          statusList:[],
          technicianList:[],
      },
      editData:{

      },
      editDataRule:{

      },
      optionList:{

      },
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
 
    },
    //年月日时间
    changeStartTime() {

    },

    //查询按钮
    handleInquire() {

    },
    //重置按钮
    handleReset() {
       
    },
    //申请按钮
    handleApplyFor() {

    },
    handleCloseSystemInfo() {
        // this.isShow = true

    },
    // 申请按钮
    handleApplyFor() {
        this.isShow = true
    },
    // 弹框取消
    handleCancel(){

    },
    //弹框确认
    handleAffirm() {

    },

  }
}
</script>


<style lang="scss" scoped>

.ui-layout_edit-dialog  {
   /deep/.el-input__inner {
     width:300px;
     height:40px;
   }
   /deep/.el-form-item__content{
      width:300px !important;
   }
   .el-dialog__header{
  border-bottom: 1px solid red;
  }
  .footerBtn {
    margin-left:160px;
  }
 
}

</style>
