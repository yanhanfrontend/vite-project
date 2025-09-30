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

  <div id="container" class="w-full h-[500px]"></div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, shallowRef, watch} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import {$get} from "../utils/request.js";

const ZOOM = 12;

let currentAMap = null;
let map = shallowRef(null);
let hotcity = ref([])
let city_id = ref('请选择');
let areas = ref([])
let area_id = ref('请选择');

const loadCities = async () => {
  let response = await $get("/api/aj/getcitycode")
  hotcity.value = response.result.hotcity;
}

const loadAreas = async (citycode) => {
  let {result} = await $get("/api/aj/get_area", {citycode})
  areas.value = Object.keys(result).map(key => ({area_id: key, area_name: result[key]}));
}

const districtSearch = () => {
  let areaName = areas.value.find(item => item.area_id == area_id.value).area_name;

  var district = new currentAMap.DistrictSearch({
    extensions: "all", //返回行政区边界坐标等具体信息
    level: "district", //设置查询行政区级别为区
  });
  district.search(areaName, function (status, result) {
    var bounds = result.districtList[0].boundaries; //获取朝阳区的边界信息
    var polygons = [];
    if (bounds) {
      for (var i = 0; i < bounds.length; i++) {
        var polygon = new currentAMap.Polygon({
          map: map.value, //显示该覆盖物的地图对象
          strokeWeight: 1, //轮廓线宽度
          path: bounds[i], //多边形轮廓线的节点坐标数组
          fillOpacity: 0.7, //多边形填充透明度
          fillColor: "#CCF3FF", //多边形填充颜色
          strokeColor: "#CC66CC", //线条颜色
        });
        polygons.push(polygon);
      }
      map.value.setFitView(); //将覆盖物调整到合适视野
    }
    map.value.setZoom(ZOOM);
  });
}

const loadShops = async () => {
  districtSearch();

  let {shop_data} = await $get("/api/at/shop", {
    city_id: city_id.value,
    area_id: area_id.value
  })
  shop_data.forEach(item => {
    const marker = new currentAMap.Marker({
      position: [item.map_longitude, item.map_latitude],
      title: item.shop_name,
    });
    map.value.add(marker);
    let content = `
      <div class="flex items-center">
        <div class="mr-1"><img class="w-26" src="${item.shop_ico}"/></div>
        <div class="text-base text-[#666]">
          <div>商城：${item.shop_name}</div>
          <div>地址：${item.addr}</div>
          <div>电话：${item.mobile}</div>
          <div>简介：${item.shop_desc}</div>
        </div>
      </div>
    `
    marker.on("click", (e) => {
      let infoWindow = new currentAMap.InfoWindow({
        content,
        offset: new AMap.Pixel(0, -30),
      })
      infoWindow.open(map.value, e.target.getPosition());
    })
  })
}

watch(city_id, (value) => {
  loadAreas(value)
  area_id.value = '请选择';
})

watch(area_id, (value) => {
  if (value !== '请选择') {
    loadShops()
  }
  map.value.clearMap();
})

const initMap = () => {
  AMapLoader.load({
    key: "0fd695e611fe2dd22a43650aa6b602a6",
    version: "2.0",
    plugins: [
      "AMap.ToolBar",
      "AMap.Scale",
      "AMap.HawkEye",
      "AMap.MapType",
      "AMap.Geolocation",
      "AMap.ControlBar",
      "AMap.DistrictSearch",
    ],
  }).then((AMap) => {
    currentAMap = AMap;
    map.value = new AMap.Map("container", {
      viewMode: "3D",
      pitch: 45,
      zoom: ZOOM,
      center: [114.36, 30.4],
    });

    map.value.addControl(new AMap.ToolBar({
      position: {
        right: '20px',
        bottom: '200px'
      }
    }));

    map.value.addControl(new AMap.Scale());

    map.value.addControl(new AMap.HawkEye({isOpen: true}));

    map.value.addControl(new AMap.MapType());

    map.value.addControl(new AMap.Geolocation());

    map.value.addControl(new AMap.ControlBar());
  }).catch((e) => {
    console.log(e);
  });
}

onMounted(() => {
  loadCities();

  initMap();
});

onUnmounted(() => {
  map.value.destroy();
});
</script>