<template>
  <div class="table-data">
    <el-table :data="tableData">
      <el-table-column prop="date" label="序号" width="100" />
      <el-table-column prop="name" label="分行名称" width="200" show-overflow-tooltip/>
      <el-table-column prop="address" label="资金（亿元）" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
  selectedView: {
    type: String,
    required: true,
    validator: (value) => ['总行', '湖北省分行'].includes(value)
  }
});

const totalData = ref([
  {
    date: '1',
    name: '南京分行',
    address: '7.12',
  },
  {
    date: '2',
    name: '武汉分行',
    address: '5.66',
  },
  {
    date: '3',
    name: '吉林分行',
    address: '2.87',
  },
  {
    date: '4',
    name: '长沙分行',
    address: '1.99',
  },
  {
    date: '5',
    name: '海口分行',
    address: '1.31',
  },
  {
    date: '6',
    name: '银川分行',
    address: '0.52',
  },
]);

const branchData = ref([
  {
    date: '1',
    name: '武汉市分行',
    address: '3.66',
  },
  {
    date: '2',
    name: '黄石市分行',
    address: '2.87',
  },
  {
    date: '3',
    name: '襄阳市分行',
    address: '2.45',
  },
  {
    date: '4',
    name: '宜昌市分行',
    address: '1.99',
  },
  {
    date: '5',
    name: '荆州市分行',
    address: '1.31',
  },
  {
    date: '6',
    name: '十堰市分行',
    address: '0.82',
  },
]);

const tableData = computed(() => {
  return props.selectedView === '总行' ? totalData.value : branchData.value;
});
</script>

<style scoped>
.table-data {
  width: 100%; 
  height: 297px;
  overflow: auto;
}
</style>