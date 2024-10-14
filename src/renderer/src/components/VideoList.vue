<script setup lang="ts">
import VideoItem from './VideoItem.vue'
import useConfigStore from '@renderer/store/useConfigStore'

const { config } = useConfigStore()
</script>

<template>
  <main class="overflow-y-auto h-80">
    <video-item
      v-for="(video, index) in config.files"
      :key="index"
      :video="video"
      :index="index"
      v-if="config.files.length"
    ></video-item>
    <div class="text-xs opacity-80 text-slate-600 text-center" v-else>暂无压缩视频</div>
  </main>
</template>

<style lang="scss">
/* 美化滚动条 */
// ::-webkit-scrollbar {
//     width: 10px;
// }

// ::-webkit-scrollbar-thumb {
//     background-color: #888;
// }

// ::-webkit-scrollbar-track {
//     background-color: #f1f1f1;
// }

/* 隐藏纵向滚动条 */
::-webkit-scrollbar {
  display: none;
}

/* 隐藏横向滚动条 */
::-webkit-scrollbar-track {
  display: none;
}
</style>
