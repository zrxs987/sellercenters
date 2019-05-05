<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row >
            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
               <el-col :span="6"  >
                 <span>成交时间：</span>
                    <el-date-picker
                    style="width: 60%;"
                        v-model="quantumTime"
                        type="daterange"
                         value-format="yyyy-MM-dd HH:mm"
                        @change="changeStartTime"
                        range-separator=""
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
               </el-col>
             <el-col :span="5">
                <span>商品名称：</span>
                <el-select filterable style="width:60%;" placeholder="请选择"  v-model="fixOrderListPara.status" >
                  <el-option v-for="item in orderConditionText.statusList" :key="item.statusId" :label="item.statusText" :value="item.statusId"></el-option>
                </el-select>
            </el-col>
              <el-col :span="5">
                 <span>售后服务：</span>
                <el-select filterable style="width: 60%;" placeholder="请选择"  v-model="fixOrderListPara.technicianId">
                  <el-option   v-for="item in orderConditionText.technicianList" :key="item.technicianId" :label="item.technicianName" :value="item.technicianId"></el-option>
                </el-select>
               </el-col>
              <div class="btnClick">
                <el-button type="primary"  @click="handleInquire">查询</el-button>
                <el-button type="primary"   @click="handleReset">重置</el-button>
                <el-button type="primary"  @click="handleDownload">导出</el-button>
              </div>          
            </el-form>
        </el-row>
        <div class="classify">
             <ul>
               <li @click="handleMarch">最近三月订单</li>
               <span class="longString"></span>
               <li>待付款订单</li>
               <span class="longString"></span>
               <li>待发货订单</li>
               <span class="longString"></span>
               <li>已发货订单</li>
               <span class="longString"></span>
               <li>退款中订单</li>
               <span class="longString"></span>
               <li>换货订单</li>
               <span class="longString"></span>
               <li @click="handleEvaluate">待评价订单</li>
               <span class="longString"></span>
               <li>完成订单</li>
               <span class="longString"></span>
               <li>关闭订单</li>
             </ul>
        </div>
    </div>

   <div class="el-table-box">
           <el-table v-loading="loading"
            style="width: 100%;"
            :header-cell-style="{background:'#dee1e6'}" 
            border
            fit 
            :data='fixOrderList' 
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" />
            <!-- <el-table-column width="50"></el-table-column> -->
            <el-table-column prop="orderNo" label="订单编号"></el-table-column>
            <el-table-column prop="strModel" label="收款人" ></el-table-column>
            <el-table-column prop="strMalfunction" label="商品名称" ></el-table-column>
            <el-table-column prop="placeTime" label="金额"  width="110"></el-table-column>
            <el-table-column prop="technicianInfo" label="订单状态" ></el-table-column>
            <el-table-column prop="alipay" label="支付状态"></el-table-column>
            <el-table-column prop="deliverGoods" label="发货状态"></el-table-column>
            <el-table-column prop="way" label="支付方式"></el-table-column>
            <el-table-column prop="distribution" label="配送方式" ></el-table-column>
            <el-table-column prop="turnover" label="成交时间"></el-table-column>
            <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                         <span style="color: #409eff;cursor:pointer;margin-left: 0;" class="line"  @click="handleDelete(scope.row)" >删除</span>
                  </template>
            </el-table-column>
          </el-table>
          <pagination :current-page="fixOrderListPara.page+1" :total="50" :page-sizes="[10,20,30,50]" 
          :page-size="fixOrderListPara.limit" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" />
        </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import {getEvaluate,getRecentlyTrimester} from '@/api/classify'

export default {
  name: 'classify',
  	components:{
			pagination
		},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: '',
        commodity: '',
        type:'',
        sort: '+id'
      },
      downloadLoading: false,
      quantumTime:'',

      fixOrderList:[
        {orderNo:'123456',strModel:'张三',strMalfunction:'云南白药牙膏',placeTime:'15',technicianInfo:'代发货',
         alipay:'未支付',deliverGoods:'未发货',way:'现金',distribution:'厂家配送',turnover:'2018-12-15',address:'123456',},
        {orderNo:'123456',strModel:'张三',strMalfunction:'云南白药牙膏',placeTime:'15',technicianInfo:'代发货',
         alipay:'未支付',deliverGoods:'未发货',way:'现金',distribution:'厂家配送',turnover:'2018-12-15',address:'123456',},
        {orderNo:'123456',strModel:'张三',strMalfunction:'云南白药牙膏',placeTime:'15',technicianInfo:'代发货',
         alipay:'未支付',deliverGoods:'未发货',way:'现金',distribution:'厂家配送',turnover:'2018-12-15',address:'123456',},
        {orderNo:'123456',strModel:'张三',strMalfunction:'云南白药牙膏',placeTime:'15',technicianInfo:'代发货',
         alipay:'未支付',deliverGoods:'未发货',way:'现金',distribution:'厂家配送',turnover:'2018-12-15',address:'123456',},
        {orderNo:'123456',strModel:'张三',strMalfunction:'云南白药牙膏',placeTime:'15',technicianInfo:'代发货',
         alipay:'未支付',deliverGoods:'未发货',way:'现金',distribution:'厂家配送',turnover:'2018-12-15',address:'123456',},
        {orderNo:'123456',strModel:'张三',strMalfunction:'云南白药牙膏',placeTime:'15',technicianInfo:'代发货',
         alipay:'未支付',deliverGoods:'未发货',way:'现金',distribution:'厂家配送',turnover:'2018-12-15',address:'123456',},
        {orderNo:'123456',strModel:'张三',strMalfunction:'云南白药牙膏',placeTime:'15',technicianInfo:'代发货',
         alipay:'未支付',deliverGoods:'未发货',way:'现金',distribution:'厂家配送',turnover:'2018-12-15',address:'123456',},
        {orderNo:'123456',strModel:'张三',strMalfunction:'云南白药牙膏',placeTime:'15',technicianInfo:'代发货',
         alipay:'未支付',deliverGoods:'未发货',way:'现金',distribution:'厂家配送',turnover:'2018-12-15',address:'123456',},
      ],
      fixOrderTotal:null,
      orderConditionText:{
        statusList:[],
        technicianList:[],
      },
      fixOrderListPara:{
        limit:10,
        page:0,
        total:0,
      },
      loading:false,
    }
  },

  methods:{
      // 搜索按钮
      handleInquire() {

      },
      //重置按钮
      handleReset() {
       
      },
      //分页
      handleSizeChange() {

      },
      //分页
      handleCurrentChange( ) {

      },
      // 获取时间
      changeStartTime( ) {

      },
      // 获取勾选框的值
      handleSelectionChange(val) {
      this.multipleSelection = val
 
    },
    //删除
    handleDelete( ) {

    },
    // 导出按钮
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
      }
    },
    //待评价订单
    handleEvaluate() {
        getEvaluate({storeId:15,evaluationState:1}).then((res)=>{
             console.log(res,1111)
        })
    },
    //最近三月
    handleMarch() {
        getRecentlyTrimester({storeId:1}).then((res)=>{
             
        })
    },
  },

}
</script>

<style lang="scss" scoped>

.app-container {
  min-height: 100%;
  width: 100%;
 }
  .el-table-box {
    margin-top: 10px;
  }

  .classify {
    ul{
      li{
        list-style: none;
        float: left;
        margin-left: 30px;
        line-height: 60px;
        color: gray;
      }
      li:hover{
        color: red;
      }
      .longString{
        height: 20px;
        background-color: gainsboro;
        width: 2px;
        float: left;
        margin-top: 20px;
        margin-left: 20px;
      }
    }
  }

</style>

