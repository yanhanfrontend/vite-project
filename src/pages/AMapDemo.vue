<template>
  <div class="flex flex-row items-center gap-2 mb-2">
    <el-tag type="warning">热门城市</el-tag>

    <el-select v-model="city_id" placeholder="Select" style="width: 100px">
      <el-option
          v-for="item in hotcity"
          :key="item.code"
          :label="item.name"
          :value="item.code"
      />
    </el-select>

    <el-select v-model="area_id" placeholder="Select" style="width: 100px">
      <el-option
          v-for="item in areas"
          :key="item.area_id"
          :label="item.area_name"
          :value="item.area_id"
      />
    </el-select>
  </div>

  <div id="container"></div>
</template>

<script setup>
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import {$get, $post} from "../utils/request.js";

onMounted(() => {
  loadCities();

  initMap();
});

let hotcity = reactive([])
let city_id = ref('请选择');
let areas = reactive([])
let area_id = ref('请选择');

const loadCities = async () => {
  let response = await $get("/api/aj/getcitycode")
  hotcity = response.result.hotcity;
}

const loadAreas = async (citycode) => {
  let {result} = await $get("/api/aj/get_area",{citycode})
  areas = Object.keys(result).map(key => ({ area_id: key, area_name: result[key] }));
}

watch(city_id, (value) => {
  loadAreas(value)
  area_id.value = '请选择';
})

let map = null;
const initMap = () => {
  AMapLoader.load({
    key: "0fd695e611fe2dd22a43650aa6b602a6", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
      .then((AMap) => {
        map = new AMap.Map("container", {
          mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
          // 设置地图容器id
          // viewMode: "3D", // 是否为3D地图模式
          // zoom: 11, // 初始化地图级别
          // center: [116.397428, 39.90923], // 初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });
}

onUnmounted(() => {
  map?.destroy();
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>