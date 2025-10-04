<template>
  <div class="card-set">
    <el-row :gutter="10">
      <el-col :span="12" v-for="(item, index) in displayData" :key="index">
        <div class="card-item">
          <div class="avatar-section">
            <img :src="item.avatar" alt="Avatar" class="avatar" style="width: 50px;height: 50px;" />
          </div>
          <div class="content-section">
            <div class="title">{{ item.title }}</div>
            <div class="description">{{ item.description }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'

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

const totalData = ref([
  {
    avatar: 'https://img.icons8.com/?size=100&id=7820&format=png&color=b18412',
    title: '客户总数（人）',
    description: '106903'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=7820&format=png&color=b18412',
    title: '新增获客数（人）',
    description: '1644'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=202&format=png&color=b18412',
    title: '获客总金额（万元）',
    description: '60338.83'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=2025&format=png&color=b18412',
    title: '获客总笔数（笔）',
    description: '1219'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=202&format=png&color=b18412',
    title: '活客总金额（万元）',
    description: '50128.94'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=2025&format=png&color=b18412',
    title: '活客总笔数（笔）',
    description: '1185'
  }
]);

const branchData = ref([
{
    avatar: 'https://img.icons8.com/?size=100&id=7820&format=png&color=b18412',
    title: '客户总数（人）',
    description: '56903'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=7820&format=png&color=b18412',
    title: '新增获客数（人）',
    description: '644'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=202&format=png&color=b18412',
    title: '获客总金额（万元）',
    description: '4338.83'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=2025&format=png&color=b18412',
    title: '获客总笔数（笔）',
    description: '219'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=202&format=png&color=b18412',
    title: '活客总金额（万元）',
    description: '6128.94'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=2025&format=png&color=b18412',
    title: '活客总笔数（笔）',
    description: '185'
  }
]);

const displayData = computed(() => {
  return props.selectedView === '总行' ? totalData.value : branchData.value;
});
</script>

<style scoped>
.card-set {
  height: 300px;
}

.el-row {
  height: 100%;
}

.card-item {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px rgba(30, 144, 255, 0.1);
  transition: all 0.3s ease;
}

.card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(30, 144, 255, 0.2);
}

.avatar-section {
  margin-right: 15px;
}

.content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.description {
  font-size: 20px;
  color: #1E90FF;
  font-weight: bold;
}
</style>