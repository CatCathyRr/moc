<template>
  <div style="padding: 20px 20px ;background-color: #EBEBEB; height: 88vh;">
    <div class="chart-con" style="font-family: VolvoNovum-Regular;padding: 16px;background-color:white ;border-radius: 5px;color: #000000; text-align: center">
      <div style="padding-top: 5px">
        <h3> {{ $t('input.pti') }}</h3>
      </div>
      </div>

      <div style="margin-top: 20px;padding: 16px;background-color:white ;border-radius: 5px;color: #000000; text-align: center; height: 72vh;">
  <!-- 选择烘房 -->
  <div style=" text-align: center">
    <div style="padding: 5px 30px; display: flex; justify-content: center">
      <div v-for="(item,index) in state.ovenlist">
      <span style="width: 80px; font-size: 17px;"  :key="item.id" :class="0==index ? 'activeClass' : 'noactiveClass' " :id="item.id" @click="changeOvenData(item.oven_type)">
        {{item.oven_type}}
      </span>
      <van-divider vertical  style="color: white;border: white;height: 10px;"/> 
    </div>
    </div>
  </div>



  <div class="chart-con gap" style="padding-top: 50px; text-align: center">
    <div style="padding: 5px 10px; display: flex; justify-content: center">
      <van-cell-group inset>
        <van-field
          v-model="choosedate"
          @focus="showchoosedate = true"
          style="border: 1px solid; padding: 3px"
          right-icon="arrow-down"
          placeholder='choose time'
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-field v-model="input" style="border: 1px solid; padding: 3px" placeholder="CDSID" />
      </van-cell-group>
    </div>
  </div>

  <div style="text-align: center; padding-top: 10px">{{ $t('analysispage.result') }}</div>

  <div class="chart-con gap" style="padding-top: 20px; text-align: center">
    <div style="padding: 5px 5px; display: flex; justify-content: center">
      <table>
        <th>{{ $t('analysispage.date') }}</th> <th>{{ $t('analysispage.pt') }}</th> <th>{{ $t('analysispage.diff') }}</th> <th>{{ $t('analysispage.accept') }}</th>

        <tr class="odd">
          <td>2023-09-07</td>
          <td>8:50</td>
          <td>3</td>
          <td><a>Yes</a></td>
        </tr>
        <tr class="odd">
          <td>2023-09-07</td>
          <td>Error</td>
          <td></td>
          <td><a></a></td>
        </tr>
        <tr class="odd">
          <td>2023-09-07</td>
          <td>8:50</td>
          <td>3</td>
          <td><a>Yes</a></td>
        </tr>
        <tr class="odd">
          <td>2023-09-07</td>
          <td>8:50</td>
          <td>3</td>
          <td><a>Yes</a></td>
        </tr>
        <tr class="odd">
          <td>2023-09-07</td>
          <td>8:50</td>
          <td>3</td>
          <td><a>Yes</a></td>
        </tr>
      
      </table>
    </div>
  </div>


  <div class="chart-con gap" style="padding-top: 50px; text-align: center">
    <div style="padding: 5px 30px; display: flex; justify-content: center">
      <van-button style="margin: 0 10px;"  size="small" type="primary" block>{{ $t('analysispage.download') }}</van-button>
      <van-button  style="margin: 0 10px;"  size="small" type="primary" block>{{ $t('analysispage.email') }}</van-button>
    </div>
  </div>

  <van-popup v-model:show="showchoosedate" round position="bottom">
    <van-picker title="日期" :columns="columns" @confirm="onConfirm" @cancel="showchoosedate = false" />
  </van-popup>
</div>
</div>

</template>

<script lang="ts" setup name="HomePage">
  import { useOvenListStore } from '@/store/modules/ovenlist';
  const input = ref('');
  const choosedate = ref('');
  const showchoosedate = ref(false);

  const state= reactive(
    {
      showtime:false,    
      showdeletedia:false,
      showgeneratedia:false,

      ovenlist:[], //烘房列表
      selectedOven: {   //被选中的烘房
        en:'',
        cn:'',
        type:'EDO',
        defaulttime:'',
        online:'1'
      },
      planlist:[],  
      isActive:false,
    }
  );

  const columns = [
    { text: 'last 7 days', value: 'last 7 days' },
    { text: 'last 30 days', value: 'last 30 days' },
    { text: 'last 3 months', value: 'last 3 months' },
  ];
  const onConfirm = ({ selectedValues }) => {
    choosedate.value = selectedValues[0];
    showchoosedate.value = false;
  };

  async function fetchOven() {
  
  const resList= useOvenListStore()
  await resList.run();
  state.ovenlist = resList.getOvenList;

  //取出默认烘房：  EDO 和 默认的时间  08:50
  state.selectedOven.type =  state.ovenlist[0]["oven_type"]  
  const time:string = state.ovenlist[0]["default_plan_time"]
  state.selectedOven.defaulttime = time.slice(0,5);
  
}

onMounted(() => {

fetchOven();  

});
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    font-size: 40px;

    img {
      width: 90px;
      height: 90px;
    }
  }

  .activeClass{
  color: #1c6bba;
  background-color: #ced9e5;
  border-radius: 5px;
  padding: 10px 15px;
  // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.noactiveClass{
  color: #ababab;
  border-radius: 5px;
  padding: 10px 15px;
  // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
  

  .chart-con {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 14px;

    .chart-wrap {
      width: 100%;
      box-sizing: border-box;
      background-color: #ffffff;
      padding: 16px 0px;
      border-radius: 10px;

      .title {
        box-sizing: border-box;
        width: 100%;
        padding: 0px 14px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }

      .ver-line {
        height: 40px;
        width: 5px;
        border-radius: 5px;
        background-color: #4e9d77;
      }

      .title-desc {
        font-size: 15px;
        color: #222222;
        margin-left: 11px;
        font-weight: bold;
      }

      .ring-chart {
        height: 200px;
        width: 100%;
        box-sizing: border-box;
        padding: 0px 14px;
        margin-top: 16px;
      }

      .line-chart-con {
        width: 100%;
        box-sizing: border-box;
        padding: 0px 14px;
        margin: 20px 0px;
      }
    }
  }
  /* 样式重置 */
  body,
  table,
  th,
  td {
    margin: 0;
    padding: 0;
    border: 0;
  
  }

  /* 表格容器 */
  .table-container {
    overflow-x: auto;
  }

  /* 表格样式 */
  table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ccc;
  }

  th,
  td {
    padding: 15px 20px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  th.ying-pian {
    background-color: #f2f2f2;
  }

  tr.odd {
    background-color: #f2f2f2;
  }

  tr.even {
    background-color: #ffffff;
  }

  /* 编辑链接样式 */
  a {
    text-decoration: none;
    color: #007bff;
  }

  .van-cell-group--inset {
    border-radius: 5px;
    border: 0.5px;
  }
</style>
