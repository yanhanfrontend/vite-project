<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  selectedView: {
    type: String,
    default: 'day'
  }
});

const chartRef = ref(null);
let myChart = null;

const loadMap = (mapType) => {
  if (!myChart) return;

  myChart.showLoading();
  const url = mapType === '湖北省分行'
    ? 'https://geo.datav.aliyun.com/areas_v3/bound/420000_full.json'
    : 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json';

  fetch(url)
    .then(response => response.json())
    .then(geoJson => {
      myChart.hideLoading();
      echarts.registerMap(mapType === '湖北省分行' ? 'Hubei' : 'China', geoJson);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>资金承接率：22.51%<br/>笔数承接率：10.19%'
        },
        visualMap: {
          left: 'right',
          top: 'top',
          min: 0,
          max: 100,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          },
          text: ['高', '低'],
          textStyle: {
            color: '#fff'
          },
          calculable: true
        },
        series: [
          {
            name: '地区数据',
            type: 'map',
            map: mapType === '湖北省分行' ? 'Hubei' : 'China',
            label: {
              show: true
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                areaColor: '#ff9900',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: mapType === '湖北省分行' ? [
              { name: '武汉市', value: Math.floor(Math.random() * 100) },
              { name: '黄石市', value: Math.floor(Math.random() * 100) },
              { name: '十堰市', value: Math.floor(Math.random() * 100) },
              { name: '宜昌市', value: Math.floor(Math.random() * 100) },
              { name: '襄阳市', value: Math.floor(Math.random() * 100) },
              { name: '鄂州市', value: Math.floor(Math.random() * 100) },
              { name: '荆门市', value: Math.floor(Math.random() * 100) },
              { name: '孝感市', value: Math.floor(Math.random() * 100) },
              { name: '荆州市', value: Math.floor(Math.random() * 100) },
              { name: '黄冈市', value: Math.floor(Math.random() * 100) },
              { name: '咸宁市', value: Math.floor(Math.random() * 100) },
              { name: '随州市', value: Math.floor(Math.random() * 100) },
              { name: '恩施土家族苗族自治州', value: Math.floor(Math.random() * 100) },
              { name: '仙桃市', value: Math.floor(Math.random() * 100) },
              { name: '潜江市', value: Math.floor(Math.random() * 100) },
              { name: '天门市', value: Math.floor(Math.random() * 100) },
              { name: '神农架林区', value: Math.floor(Math.random() * 100) }
            ] : [
              { name: '北京', value: Math.floor(Math.random() * 100) },
              { name: '天津', value: Math.floor(Math.random() * 100) },
              { name: '河北省', value: Math.floor(Math.random() * 100) },
              { name: '山西省', value: Math.floor(Math.random() * 100) },
              { name: '内蒙古自治区', value: Math.floor(Math.random() * 100) },
              { name: '辽宁省', value: Math.floor(Math.random() * 100) },
              { name: '吉林省', value: Math.floor(Math.random() * 100) },
              { name: '黑龙江省', value: Math.floor(Math.random() * 100) },
              { name: '上海', value: Math.floor(Math.random() * 100) },
              { name: '江苏省', value: Math.floor(Math.random() * 100) },
              { name: '浙江省', value: Math.floor(Math.random() * 100) },
              { name: '安徽省', value: Math.floor(Math.random() * 100) },
              { name: '福建省', value: Math.floor(Math.random() * 100) },
              { name: '江西省', value: Math.floor(Math.random() * 100) },
              { name: '山东省', value: Math.floor(Math.random() * 100) },
              { name: '河南省', value: Math.floor(Math.random() * 100) },
              { name: '湖北省', value: Math.floor(Math.random() * 100) },
              { name: '湖南省', value: Math.floor(Math.random() * 100) },
              { name: '广东省', value: Math.floor(Math.random() * 100) },
              { name: '广西壮族自治区', value: Math.floor(Math.random() * 100) },
              { name: '海南省', value: Math.floor(Math.random() * 100) },
              { name: '重庆', value: Math.floor(Math.random() * 100) },
              { name: '四川省', value: Math.floor(Math.random() * 100) },
              { name: '贵州省', value: Math.floor(Math.random() * 100) },
              { name: '云南省', value: Math.floor(Math.random() * 100) },
              { name: '西藏自治区', value: Math.floor(Math.random() * 100) },
              { name: '陕西省', value: Math.floor(Math.random() * 100) },
              { name: '甘肃省', value: Math.floor(Math.random() * 100) },
              { name: '青海省', value: Math.floor(Math.random() * 100) },
              { name: '宁夏回族自治区', value: Math.floor(Math.random() * 100) },
              { name: '新疆维吾尔自治区', value: Math.floor(Math.random() * 100) },
              { name: '台湾省', value: Math.floor(Math.random() * 100) },
              { name: '香港特别行政区', value: Math.floor(Math.random() * 100) },
              { name: '澳门特别行政区', value: Math.floor(Math.random() * 100) }
            ]
          }
        ]
      };
      myChart.setOption(option);
    });
};

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  loadMap(props.selectedView);
});

watch(() => props.selectedView, (newValue) => {
  loadMap(newValue);
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 760px;
}
</style>