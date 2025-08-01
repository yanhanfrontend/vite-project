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
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <setting />
              </el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
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

            <el-scrollbar height="calc(100vh - 160px)">
              <el-table ref="multipleTableRef" :data="tableData" @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column type="selection" :selectable="selectable" width="35" />
                <el-table-column prop="date" label="Date" />
                <el-table-column label="Delivery Info">
                  <el-table-column prop="name" label="Name" />
                  <el-table-column label="Address Info">
                    <el-table-column prop="state" label="State" />
                    <el-table-column prop="city" label="City" />
                    <el-table-column prop="address" label="Address" />
                    <el-table-column prop="zip" label="Zip" />
                  </el-table-column>
                </el-table-column>
                <el-table-column label="Operations">
                  <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                      Edit
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                      Delete
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-scrollbar>
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

            <el-scrollbar height="calc(100vh - 160px)">
              <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto">
                <el-form-item label="Activity name" prop="name">
                  <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="Activity zone" prop="region">
                  <el-select v-model="ruleForm.region" placeholder="Activity zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                  </el-select>
                </el-form-item>
                <el-form-item label="Activity count" prop="count">
                  <el-select-v2 v-model="ruleForm.count" placeholder="Activity count" :options="options" />
                </el-form-item>
                <el-form-item label="Activity time" required>
                  <el-col :span="11">
                    <el-form-item prop="date1">
                      <el-date-picker v-model="ruleForm.date1" type="date" aria-label="Pick a date"
                        placeholder="Pick a date" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                  <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2">
                      <el-time-picker v-model="ruleForm.date2" aria-label="Pick a time" placeholder="Pick a time"
                        style="width: 100%" />
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="Instant delivery" prop="delivery">
                  <el-switch v-model="ruleForm.delivery" />
                </el-form-item>
                <el-form-item label="Activity location" prop="location">
                  <el-segmented v-model="ruleForm.location" :options="locationOptions" />
                </el-form-item>
                <el-form-item label="Activity type" prop="type">
                  <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox value="Online activities" name="type">
                      Online activities
                    </el-checkbox>
                    <el-checkbox value="Promotion activities" name="type">
                      Promotion activities
                    </el-checkbox>
                    <el-checkbox value="Offline activities" name="type">
                      Offline activities
                    </el-checkbox>
                    <el-checkbox value="Simple brand exposure" name="type">
                      Simple brand exposure
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Resources" prop="resource">
                  <el-radio-group v-model="ruleForm.resource">
                    <el-radio value="Sponsorship">Sponsorship</el-radio>
                    <el-radio value="Venue">Venue</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="Activity form" prop="desc">
                  <el-input v-model="ruleForm.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Create
                  </el-button>
                  <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
              </el-form>
            </el-scrollbar>
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

            <el-scrollbar height="calc(100vh - 160px)">
              <el-radio-group v-model="size">
                <el-radio value="large">Large</el-radio>
                <el-radio value="default">Default</el-radio>
                <el-radio value="small">Small</el-radio>
              </el-radio-group>

              <el-descriptions class="margin-top" title="With border" :column="3" :size="size" border>
                <template #extra>
                  <el-button type="primary">Operation</el-button>
                </template>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <user />
                      </el-icon>
                      Username
                    </div>
                  </template>
                  kooriookami
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <iphone />
                      </el-icon>
                      Telephone
                    </div>
                  </template>
                  18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <location />
                      </el-icon>
                      Place
                    </div>
                  </template>
                  Suzhou
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <tickets />
                      </el-icon>
                      Remarks
                    </div>
                  </template>
                  <el-tag size="small">School</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <office-building />
                      </el-icon>
                      Address
                    </div>
                  </template>
                  No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                </el-descriptions-item>
              </el-descriptions>
            </el-scrollbar>
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

            <el-scrollbar height="calc(100vh - 160px)">
              <el-upload v-model:file-list="fileList"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import {
  Grid, Operation, Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
  Document,
  Plus,
  Menu
} from '@element-plus/icons-vue'
import type { TableInstance } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { ComponentSize } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'

interface User {
  date: string
  name: string
  state: string
  city: string
  address: string
  zip: string
}

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<User[]>([])

const selectable = (row: User) => !["Tom", "Jerry"].includes(row.name)
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Jerry',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom2',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom3',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom4',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]

interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  location: string
  type: string[]
  resource: string
  desc: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: '',
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please select a location',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
const size = ref<ComponentSize>('default')

const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
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