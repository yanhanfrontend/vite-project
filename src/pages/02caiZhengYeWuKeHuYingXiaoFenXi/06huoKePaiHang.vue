<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);

onMounted(() => {
  var option;
  const myChart = echarts.init(chartRef.value);
  const data = [];
  for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
  }
  option = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      max: 1000,
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'category',
      data: ['南京分行', '武汉分行', '吉林分行', '长沙分行', '海口分行'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data,
        itemStyle: {
          color: function (params) {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
            return colors[params.dataIndex];
          }
        },
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
        }
      }
    ],
    // legend: {
    //   show: true,
    //   formatter: '人'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        const data = params[0];
        return data.name + '：' + data.value + ' 人';
      }
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  };
  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] = Math.min(1000, data[i] + Math.round(Math.random() * 100));
      } else {
        data[i] = Math.min(1000, data[i] + Math.round(Math.random() * 50));
      }
    }
    myChart.setOption({
      series: [
        {
          type: 'bar',
          data,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true,
          }
        }
      ]
    });
  }
  setTimeout(function () {
    run();
  }, 0);
  setInterval(function () {
    run();
  }, 3000);

  option && myChart.setOption(option);
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
}
</style>