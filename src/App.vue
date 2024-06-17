<script setup>
// 第一步先导入
//import { useUserStore } from '@/stores/index'
// 第二步下定义
//const userStore = useUserStore()
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <!-- 第三步使用 -->
  <!-- <div>我是APP {{ userStore.token }}</div> -->
  <el-config-provider :locale="zh">
    <router-view></router-view>
  </el-config-provider>
</template>
