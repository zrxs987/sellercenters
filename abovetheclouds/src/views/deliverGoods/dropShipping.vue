<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-form :inline="true" class="headerForm" style="margin-bottom: 1.5%;">
          <el-form-item label="快递公司" :label-width="formLabelWidth">
            <el-select
              size="medium"
              placeholder="快递公司"
              v-model="systemInformation.expressage"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.expressage"
                :key="value"
                :value="value"
                :label="item.eName"
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
                v-for="(item, value) in optionList.provinceList"
                :key="value"
                :value="value"
                :label="item.areaName"
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
                v-for="(item, value) in optionList.cityList"
                :key="value"
                :value="value"
                :label="item.areaName"
              ></el-option>
            </el-select>
            <el-select
              size="small"
              placeholder="请选择区"
              v-model="systemInformation.district"
              clearable
            >
              <el-option
                v-for="(item, value) in optionList.districtList"
                :key="value"
                :value="value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体地址">
            <el-input
              type="textarea"
              class="site"
              size="medium"
              :rows="2"
              resize="none"
              v-model="systemInformation.site"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleInquire">查询</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-form>
      </el-row>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      :header-cell-style="{background:'#dee1e6'}"
    >
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <span>{{ scope.row.disp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付状态">
        <template slot-scope="scope">
          <span>{{ scope.row.displ }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货状态">
        <template slot-scope="scope">
          <span>{{ scope.row.display}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式">
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

    <pagination :total="50"/>
  </div>
</template>

<script>
import {
  getAddressInfo,
  getLogisticsCompany,
  getCity,
} from "@/api/level3Linkage.js";
import pagination from "@/components/Pagination/index";

export default {
  name: "dropShipping",
  components: {
    pagination
  },
  data() {
    return {
      list: null,
      formLabelWidth: "90px",
      systemInformation: {
        expressage: "",
        province: "",
        city: "",
        district: "",
        site: ""
      },
      //下拉数据
      optionList: {
        expressage: [],
        provinceList: [],
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
        sort: "+id"
      },
      vals: "",
      tableData: [],
    };
  },
  created() {
    // this.fetchData();
    this._getLogisticsCompany();
    this.handlexxx();
   
  },
  methods: {
    // fetchData() {
  
    //   getOrderState({ storeId: 1, orderState: 20 })
    //     .then(res => {
    //       this.loading = true;
    //       if (res.code === "200") {
    //         this.loading = false;
    //         this.tableData = res.data;
    //         // this.fixOrderTotal = res.data.data.total;
    //       } else {
    //         this.$message({
    //           message: res.errorMsg,
    //           type: "error",
    //           duration: 5 * 1000
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    handleSelectCounty() {

    },


    //查询按钮
    handleInquire() {},
    // 重置按钮
    handleReset() {
      this.systemInformation = {};
    },
     
     handlexxx(val){
       this.vals = val;
      getAddressInfo({
        areaParentId: val,
        type: "1"
      }).then(data => {

        this.optionList.provinceList = data.data;
        
      })
     },

    //省
    handleSelectProvince(val) {

         getCity({
               areaParentId:++val,
               type: "2"
        }).then(data => {

          this.optionList.cityList = data.data;
        });
    },
    //市
    handleSelectCounty( val) {
      
    },
 
    //物流公司
    _getLogisticsCompany() {
      getLogisticsCompany().then(res => {
        res.data.forEach(item => {
          let esName = item.eName;
          this.optionList.expressage = res.data;
        })
      })
     },

  }
};
</script>


<style lang="scss" scoped>
.headerForm {
  height: 30px;
}
</style>
