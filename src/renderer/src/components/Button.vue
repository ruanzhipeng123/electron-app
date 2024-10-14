<script setup lang="ts">
import useVideo from '@renderer/composables/useVideo'
import useCompress from '@renderer/composables/useCompress'

const {removeAll, removeAllVideo, stop} = useVideo()
const { isRun } = useCompress()
</script>

<template>
   <main class="flex justify-center">
        <el-button type="primary" size="small" @click="stop">停止转码</el-button>
        <el-button type="danger" size="small" @click="removeAll" :disabled="isRun">删除全部</el-button>
        <el-button type="danger" size="small" @click="removeAllVideo" :disabled="isRun">重置视频</el-button>
   </main>
</template>

<style lang="scss" scoped>
</style>