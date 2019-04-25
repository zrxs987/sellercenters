<template>
  <div class="app-container">
 <div class="filter-container">
      <el-row >
          <!-- <el-col :span="24" > -->
        <el-form :inline="true" class="headerForm"  style="margin-bottom: 1.5%;">

        <el-form-item label="快递公司"  :label-width="formLabelWidth">
          <el-select
              size="medium"
              placeholder="快递公司"
              v-model="systemInformation.expressage"
              clearable
            >
              <el-option
                v-for="(label, value) in optionList.expressage"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="退货地址" :label-width="formLabelWidth">
            <el-select
              size="small"
              placeholder="请选择省"
              v-model="systemInformation.province"
              @change="handleSelectProvince"
              clearable
            >
              <el-option
                v-for="(label, value) in optionList.provinceList"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>

            <el-select
              size="small"
              placeholder="请选择市"
              v-model="systemInformation.city"
              @change="handleSelectCounty"
              clearable
            >
              <el-option
                v-for="(label, value) in optionList.cityList"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
            <el-select size="small" placeholder="请选择区" v-model="systemInformation.district" clearable>
              <el-option
                v-for="(label, value) in optionList.districtList"
                :key="value"
                :value="value"
                :label="label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体地址" >
               <el-input type="textarea" class="site" size="medium" :rows="2" resize="none"  v-model="systemInformation.site" ></el-input>
           </el-form-item>      
              
                <el-button type="primary"  @click="handleInquire">查询</el-button>
                <el-button type="primary"   @click="handleReset">重置</el-button>
                <el-button type="primary"  @click="handleDownload">导出</el-button>
                 
            </el-form>
        </el-row>
    </div>

    <el-table
      ref="multipleTable"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      :header-cell-style="{background:'#dee1e6'}" 
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="订单编号" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称"  align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="金额"  align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <span>{{ scope.row.disp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货状态">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="配送状态">
        <template slot-scope="scope">
          <span>{{ scope.row.display}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算状态">
        <template slot-scope="scope">      
          <span>{{ scope.row.disptime }}</span>
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
// import { fetchList } from '@/api/article'
import pagination from '@/components/Pagination/index'

export default {
  name: 'dropShipping',
  components:{
      pagination
  },
  data() {
    return {
        list:null,
       formLabelWidth: "90px",
       systemInformation: {
        expressage: '',
        province: '',
        city: '',
        district: '',
        site:'',
      },
       //下拉数据
      optionList: {
        expressage: ['顺丰','韵达','中通','百世'],
        provinceList: ['江西','广东','河北','河南'],
        cityList: [],
        districtList: []
      },
      //分页
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: 50,
        type: undefined,
        sort: '+id'
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
    // 重置按钮
    handleReset() {
       this.systemInformation ={}
    },
    // 省
    handleSelectProvince() {

    },
    // 市
    handleSelectCounty() {

    },

  }
}
</script>


<style lang="scss" scoped>
// .el-row {
//   margin-bottom: 0px;
// }
.headerForm {
    height: 30px;
}
</style>
