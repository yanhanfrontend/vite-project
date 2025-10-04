<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  selectedView: {
    type: String,
    required: true,
    validator: (value) => ['总行', '湖北省分行'].includes(value)
  },
  selectedKehu: {
    type: Boolean,
    required: true
  }
});

const chartRef = ref(null);
let myChart = null;

const loadChart = (selectedView, selectedKehu) => {
  if (!myChart) return;
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        const percent = ((params.value / params.data.total) * 100).toFixed(1);
        return `${params.name}<br/>${selectedKehu ? '获客' : '活客'}${percent}%`;
      }
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      formatter: function(name) {
        const data = option.series[0].data;
        const item = data.find(item => item.name === name);
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const percent = ((item.value / total) * 100).toFixed(1);
        return `${name} (${percent}%)`;
      }
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '50%',
        center: ['50%', '40%'],
        data: props.selectedView === '总行' ? [
          { value: 20, name: '中国工商银行', total: 90 },
          { value: 15, name: '中国农业银行', total: 90 },
          { value: 17, name: '中国银行', total: 90 },
          { value: 23, name: '中国建设银行', total: 90 },
          { value: 10, name: '交通银行', total: 90 },
          { value: 5, name: '其他', total: 90 }
        ] : [
          { value: 15, name: '中国工商银行', total: 70 },
          { value: 12, name: '中国农业银行', total: 70 },
          { value: 13, name: '中国银行', total: 70 },
          { value: 18, name: '中国建设银行', total: 70 },
          { value: 8, name: '交通银行', total: 70 },
          { value: 4, name: '其他', total: 70 }
        ],
        label: {
          show: true,
          formatter: function(params) {
            const percent = ((params.value / params.data.total) * 100).toFixed(1);
            return `${percent}%`;
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
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
  height: 200px;
}
</style>