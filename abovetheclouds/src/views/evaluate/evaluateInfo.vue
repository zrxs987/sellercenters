<template>
  <div>
    <div class="table-box">
      <table style="border-collapse:collapse;">
        <tr class="table-header">
          <td></td>
          <td>近一周</td>
          <td>近一个月</td>
          <td>近六个月</td>
          <td>六个月前</td>
          <td>总计</td>
        </tr>
        <tr>
          <td>
            <img src="../../styles/img/red.png" alt>
            <span class="flower">好评</span>
          </td>
          <td>0</td>
          <td>0</td>
          <td>10</td>
          <td>91</td>
          <td style="color: #409eff;">101</td>
        </tr>
        <tr>
          <td>
            <img src="../../styles/img/yellow.png" alt>
            <span class="flower">中评</span>
          </td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td style="color: #409eff;">0</td>
        </tr>
        <tr>
          <td>
            <img src="../../styles/img/gray.png" alt>
            <span class="flower">差评</span>
          </td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td style="color: #409eff;">0</td>
        </tr>
        <tr>
          <td class="flower">总计</td>
          <td style="color: #409eff;">0</td>
          <td style="color: #409eff;">0</td>
          <td style="color: #409eff;">0</td>
          <td style="color: #409eff;">0</td>
          <td style="color: #409eff;">101</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { getEvaluateInfo,getStatistics } from "@/api/evaluate"

export default {
  name:'evaluateInfo',
  data() {
    return {
      list: {
      }
    };
  },

 created() { 
    this._getEvaluateInfo();
  },

 methods:{
     _getEvaluateInfo(){
           
        // getEvaluateInfo({gevalStoreid:'1'}).then((res)=>{
        //    console.log(res,11111111)
        // }) 
     }
  },
};
</script>

<style lang="scss" scoped>
.table-box {
  width: 800px;
  margin: 100px auto;
  border-collapse: collapse;
  text-align: center;
  tr {
    border-collapse: collapse;
  }
  td {
    width: 150px;
    height: 50px;
    border: 1px solid gray;
    border-collapse: collapse;
  }
  .flower {
    line-height: 50px;
  }
  img {
    margin-bottom: -5px;
  }
  .table-header,
  .flower {
    font-weight: bold;
  }
}
</style>
