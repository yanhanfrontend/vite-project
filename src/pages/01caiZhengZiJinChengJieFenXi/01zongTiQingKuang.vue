<template>
  <div class="card-set">
    <el-row :gutter="20">
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
  }
});

const totalData = ref([
  {
    avatar: 'https://img.icons8.com/?size=100&id=484&format=png&color=b18412',
    title: '支付金额（亿元）',
    description: '6903.20'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=484&format=png&color=b18412',
    title: '支付笔数（笔）',
    description: '16449522'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=202&format=png&color=b18412',
    title: '承接金额（亿元）',
    description: '20338.83'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=202&format=png&color=b18412',
    title: '承接笔数（笔）',
    description: '8528260'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=12089&format=png&color=b18412',
    title: '资金承接率',
    description: '33.94%'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=12089&format=png&color=b18412',
    title: '笔数承接率',
    description: '51.85%'
  }
]);

const branchData = ref([
  {
    avatar: 'https://img.icons8.com/?size=100&id=484&format=png&color=b18412',
    title: '支付金额（亿元）',
    description: '6273.20'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=484&format=png&color=b18412',
    title: '支付笔数（笔）',
    description: '16387522'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=202&format=png&color=b18412',
    title: '承接金额（亿元）',
    description: '20118.83'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=202&format=png&color=b18412',
    title: '承接笔数（笔）',
    description: '8521960'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=12089&format=png&color=b18412',
    title: '资金承接率',
    description: '31.34%'
  },
  {
    avatar: 'https://img.icons8.com/?size=100&id=12089&format=png&color=b18412',
    title: '笔数承接率',
    description: '61.15%'
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