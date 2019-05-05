<template>
  <div class="app-container">
 <div class="filter-container">
      <el-row >
          <!-- <el-col :span="24" > -->
            <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">
       
             <el-col :span="12">
                 <span>收件地址：</span>
                 <span class="default">{{location}}&nbsp;&nbsp;&nbsp;</span>
                 <!-- <span class="default">张小姐&nbsp;&nbsp;</span>
                 <span class="default">18012345678&nbsp;&nbsp;</span> -->
                 <span class="location">默认地址&nbsp;&nbsp;</span>
                 <span class="location">新增地址&nbsp;&nbsp;</span>
            </el-col>

             <el-col :span="3">
                 <span>快递公司：</span>
                 <span class="default">{{expressage}}</span>
            </el-col>

               <div class="btnClick">
                <el-button type="primary"  @click="handleSubscribe">一键预约</el-button>
              </div>
            </el-form>
        </el-row>
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
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column  align="center" label="商品名称">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column   align="center" label="金额">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" >
        <template slot-scope="scope">
          <span>{{ scope.row.disp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付状态">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货状态" >
        <template slot-scope="scope">
          <span>{{ scope.row.display}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式" >
        <template slot-scope="scope">
          <span>{{ scope.row.display}}</span>
        </template>
      </el-table-column>
     <el-table-column align="center" label="成交时间">
        <template slot-scope="scope">  
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
    </el-table>

     <pagination  :total='50'/>
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index'

export default {
  name: 'booking',
  components:{
      pagination
  },
  data() {
    return {
      dataList: null,
      listLoading: true,
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: '+id'
      },
      location:'广东省深圳市南山区泰邦科技大厦503 张小姐 18012345678', 
      expressage:'韵达快递',

    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
 
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

    //一键预约
    handleSubscribe() {

    },
  }
}
</script>


<style>
.default {
    color: gray;
}

.location {
    color: #FF6464;
}
</style>
