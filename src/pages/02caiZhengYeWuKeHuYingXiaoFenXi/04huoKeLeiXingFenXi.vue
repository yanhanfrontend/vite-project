<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineProps } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  selectedView: {
    type: String,
    required: true
  },
  selectedKehu: {
    type: Boolean,
    required: true
  }
})

const chartRef = ref(null);
let myChart = null;

const getChartData = (view) => {
  // 根据不同的视图返回不同的数据
  if (view === '总行') {
    return [800, 500, 480, 690, 700, 560]
  } else {
    return [600, 400, 380, 590, 500, 460]
  }
}

const updateChart = () => {
  if (!myChart) return;
  
  const data = getChartData(props.selectedView);
  const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'];
  const prefix = props.selectedKehu ? '获客' : '活客';

  const option = {
    // legend: {
    //   data: ['人'],
    //   top: '0%'
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
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1类', '2类', '3类', '4类', '5类', '6类'],
      axisLabel: {
        padding: [2, 0]
      }
    },
    yAxis: {
      type: 'value',
      max: 1000,
      axisLabel: {
        padding: [0, 2]
      }
    },
    series: [{
      name: '人',
      data: data.map((value, index) => ({
        value,
        itemStyle: {
          color: colors[index]
        },
      })),
      type: 'bar',
      barWidth: '60%',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }]
  };

  myChart.setOption(option);
}

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  updateChart();
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});

watch([() => props.selectedView, () => props.selectedKehu], () => {
  updateChart();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
}
</style>