<template>
  <div class="pt-10 px-2.5 pb-0">
    <el-row :gutter="10">
      <el-col :span="24" class="text-center text-2xl">
        财政资金承接分析
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="8">
        <el-space direction="vertical" fill>
          <el-card shadow="never">
            <template #header>
              <div class="card-header flex justify-between items-center">
                <span class="card-title">总体情况</span>
              </div>
            </template>
            <zongTiQingKuang :selected-view="selectedView" />
          </el-card>

          <el-card shadow="never">
            <template #header>
              <div class="card-header">
                <span class="card-title">承接趋势</span>
              </div>
            </template>
            <chengJieQuShi :selected-view="selectedView" />
          </el-card>
        </el-space>
      </el-col>

      <el-col :span="16">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <el-space wrap>
                <el-select v-model="selectedView" placeholder="选择视图" size="large" style="width: 200px;">
                  <el-option v-for="item in viewOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="selectedYear" placeholder="年" size="large" style="width: 120px;">
                  <el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="selectedMonth" placeholder="月" size="large" style="width: 120px;">
                  <el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-space>
            </div>
          </template>
          <Map :selected-view="selectedView" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span class="card-title">同业承接情况</span>
            </div>
          </template>
          <tongYeChengJieQingKuang :selected-view="selectedView" />
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span class="card-title">流入流出情况</span>
            </div>
          </template>
          <liuRuLiuChuQingKuang :selected-view="selectedView" />
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
              <span class="card-title">大额资金流入流出</span>
              <el-select v-model="daEZiJinSelectedView" placeholder="选择视图" size="large" style="width: 120px;">
                <el-option v-for="item in daEZiJinOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </template>
          <daEZiJinLiuRuLiuChu :selected-view="selectedView" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import zongTiQingKuang from './01zongTiQingKuang.vue'
import chengJieQuShi from './02chengJieQuShi.vue'
import liuRuLiuChuQingKuang from './03liuRuLiuChuQingKuang.vue'
import Map from './04Map.vue'
import tongYeChengJieQingKuang from './05tongYeChengJieQingKuang.vue'
import daEZiJinLiuRuLiuChu from './06daEZiJinLiuRuLiuChu.vue'

const selectedView = ref('总行')
const viewOptions = ref([
  { value: '总行', label: '总行' },
  { value: '湖北省分行', label: '湖北省分行' },
])

const selectedYear = ref('2024年')
const yearOptions = ref([
  { value: '2019', label: '2019年' },
  { value: '2020', label: '2020年' },
  { value: '2021', label: '2021年' },
  { value: '2022', label: '2022年' },
  { value: '2023', label: '2023年' },
  { value: '2024', label: '2024年' },
  { value: '2025', label: '2025年' }
])

const selectedMonth = ref('12月')
const monthOptions = ref([
  { value: '1', label: '1月' },
  { value: '2', label: '2月' },
  { value: '3', label: '3月' },
  { value: '4', label: '4月' },
  { value: '5', label: '5月' },
  { value: '6', label: '6月' },
  { value: '7', label: '7月' },
  { value: '8', label: '8月' },
  { value: '9', label: '9月' },
  { value: '10', label: '10月' },
  { value: '11', label: '11月' },
  { value: '12', label: '12月' }
])

const daEZiJinSelectedView = ref('流入')
const daEZiJinOptions = ref([
  { value: '流入', label: '流入' },
  { value: '流出', label: '流出' },
])
</script>

<style scoped>
.el-card {
  margin: 10px 0;
}

.el-card .card-title {
  font-size: 28px;
}
</style>