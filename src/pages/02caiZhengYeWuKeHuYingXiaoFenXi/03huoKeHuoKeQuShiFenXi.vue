<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from 'vue';

const props = defineProps({
  selectedView: {
    type: String,
    required: true,
    validator: (value) => ['总行', '湖北省分行'].includes(value)
  },
  selectedKehu: {
    type: String,
    required: true,
    validator: (value) => ['获客', '活客'].includes(value)
  }
});
import * as echarts from 'echarts';
const chartRef = ref(null);
let myChart = null;

const loadChart = (selectedView, selectedKehu) => {
  if (!myChart) return;

  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  
  // 根据视图生成不同的数据
  const generateData = (isHeadOffice) => {
    const data2024 = months.map((_, index) => {
      const x = index / 11;
      const base = isHeadOffice ? 20 : 15;
      const quadratic = isHeadOffice ? -20 : -15;
      const amplitude = isHeadOffice ? 4 : 3;
      return (base + quadratic * (amplitude * x * x - amplitude * x + 1) + (isHeadOffice ? 10 : 8) * x + Math.random() * 2).toFixed(2);
    });

    const data2025 = months.map((_, index) => {
      const x = index / 11;
      const base = isHeadOffice ? 10 : 8;
      const quadratic = isHeadOffice ? 20 : 15;
      const amplitude = isHeadOffice ? 4 : 3;
      return (base + quadratic * (amplitude * x * x - amplitude * x + 1) + (isHeadOffice ? 15 : 12) * x + Math.random() * 2).toFixed(2);
    });

    return { data2024, data2025 };
  };

  const { data2024, data2025 } = generateData(selectedView === '总行');

  const option = {
    grid: {
      top: 30,
      right: 40,
      bottom: 50,
      left: 60,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          // backgroundColor: '#505765'
        }
      },
      formatter: function(params) {
        let result = params[0].axisValue + (selectedKehu ? '获客<br/>':'活客<br/>');
        params.forEach(param => {
          result += param.marker + param.seriesName + ': ' + param.value + '%<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['2024年', '2025年'],
      orient: 'horizontal',
      top: 0
    },
    xAxis: {
      type: 'category',
      data: months,
      boundaryGap: false,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 50,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: '2024年',
        data: data2024,
        type: 'line',
        smooth: 0.5,
        symbolSize: 8,
        lineStyle: {
          width: 3
        }
      },
      {
        name: '2025年',
        data: data2025,
        type: 'line',
        smooth: 0.5,
        symbolSize: 8,
        lineStyle: {
          width: 3
        }
      }
    ]
  };

  option && myChart.setOption(option);
};

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  loadChart(props.selectedView, props.selectedKehu);
});

watch(() => props.selectedView, (newValue) => {
  loadChart(newValue, props.selectedKehu);
});
</script>

<style scoped>
.chart {
  width: 100%; 
  height: 320px;
}
</style>