<template>
  <el-container class="layout-container-demo" style="height: calc(100vh - 20px)">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <message />
              </el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">
                Option 1
                <el-button type="primary" size="mini" @click="increment">
                  Increment
                </el-button>
              </el-menu-item>
              <el-menu-item index="1-2">
                Option 2
                <el-button type="primary" size="mini" @click="increment">
                  Increment
                </el-button>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">
                {{ name }} {{ count }} {{ doubleCount }}
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px">
        <div class="flex justify-between items-center w-full h-full right-20px">
          <div class="block text-lg md:text-xl font-normal text-gray-500">
            Vite + Vue3 + TypeScript + Element Plus
          </div>

          <div>
            <el-dropdown>
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>View</el-dropdown-item>
                  <el-dropdown-item>Add</el-dropdown-item>
                  <el-dropdown-item>Delete</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <el-main>
        <el-tabs type="border-card" class="demo-tabs">
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label flex items-center">
                <el-icon>
                  <Menu />
                </el-icon>
                <span>表格</span>
              </span>
            </template>

            <TableDemo />
          </el-tab-pane>

          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label flex items-center">
                <el-icon>
                  <Operation />
                </el-icon>
                <span>表单</span>
              </span>
            </template>

            <FormDemo />
          </el-tab-pane>

          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label flex items-center">
                <el-icon>
                  <Document />
                </el-icon>
                <span>描述列表</span>
              </span>
            </template>

            <DescListDemo />
          </el-tab-pane>

          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label flex items-center">
                <el-icon>
                  <Grid />
                </el-icon>
                <span>照片墙</span>
              </span>
            </template>

            <PhotoWall />
          </el-tab-pane>

          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label flex items-center">
                <el-icon>
                  <Grid />
                </el-icon>
                <span>高德地图</span>
              </span>
            </template>

            <AMapDemo />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {
  Grid, Operation,
  Document,
  Menu
} from '@element-plus/icons-vue'
import TableDemo from './pages/TableDemo.vue'
import FormDemo from './pages/FormDemo.vue'
import DescListDemo from './pages/DescListDemo.vue'
import PhotoWall from './pages/PhotoWall.vue'
import AMapDemo from './pages/AmapDemo.vue'

import { storeToRefs } from 'pinia'
import { useCounterStore } from './store/counterStore'

const store = useCounterStore()
const { increment } = store
const { count, name, doubleCount } = storeToRefs(store)
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}
</style>