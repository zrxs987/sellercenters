<template>
  <div class="app-container">
 <div class="filter-container">
      <!-- <el-row >

            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
       
             <el-col :span="5">
                <span>收货人 ：</span>
                 <el-input style="width: 60%;" placeholder="请输入" size="medium" v-model="queryData.sku" clearable></el-input>
            </el-col>
               <div class="btnClick">
                <el-button type="primary"  @click="handleReset">重置</el-button>
                <el-button type="primary"  @click="handleInquire">查询</el-button>
                <el-button type="primary"  @click="handleDownload">导出</el-button>
              </div>
            </el-form>
        </el-row> -->
    </div>

    <el-table
      ref="multipleTable"
      :data="dataList"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      :header-cell-style="{background:'#dee1e6'}" 
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />

      <el-table-column align="center" label="订单编号" prop="number">
      </el-table-column>
      <el-table-column label="商品名称" align="center" prop="tradeName">

      </el-table-column>
      <el-table-column label="金额"  align="center" prop="money">

      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="orderForm">

      </el-table-column>
      <el-table-column align="center" label="寄件信息" prop="sender">
        <template slot-scope="scope">
          <span class="examine">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发件信息" prop="addresser">
        <template slot-scope="scope">
          <span class="examine">查看详情</span>
        </template>
      </el-table-column>
     <el-table-column align="center" label="成交时间" prop="time">

      </el-table-column>
    </el-table>

     <pagination  :total='50'/>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index'

export default {
  name: 'subscribe',
  components:{
      pagination
  },
  data() {
    return {
      
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      dataList:[
        {number:'89751236547',tradeName:'云南白药牙膏',money:'22',orderForm:'已预约',sender:'查看详情',addresser:'查看详情',time:'2019-3-12 10:30'},
        {number:'89751236547',tradeName:'云南白药牙膏',money:'22',orderForm:'已预约',sender:'查看详情',addresser:'查看详情',time:'2019-3-12 10:30'},
        {number:'89751236547',tradeName:'云南白药牙膏',money:'22',orderForm:'已预约',sender:'查看详情',addresser:'查看详情',time:'2019-3-12 10:30'},
        {number:'89751236547',tradeName:'云南白药牙膏',money:'22',orderForm:'已预约',sender:'查看详情',addresser:'查看详情',time:'2019-3-12 10:30'},
      ],
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

    handleSelectionChange(val) {
      this.multipleSelection = val
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
    //查询按钮
    handleInquire() {

    },
    //重置按钮
    handleReset() {
       
    },

  }
}
</script>

<style lang="scss" scoped>
 .examine {
   color: #FF6464;
 }
</style>

