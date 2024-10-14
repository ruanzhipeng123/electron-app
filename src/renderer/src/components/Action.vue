<script setup lang="ts">
import { Plus, UpdateRotation } from '@icon-park/vue-next'
import useVideo from '@renderer/composables/useVideo'
import useCompress from '@renderer/composables/useCompress'
import { onMounted } from 'vue';

const {addFile} = useVideo()
const {run, isRun} = useCompress()
// onMounted(() => {
//   progressNotice()
// })
onMounted(() => {
  console.log(123);
  // progressNotice()
})
</script>

<template>
  <main class="">
    <section class="flex justify-center gap-2">
      <div class="button">
        <el-upload
          action="#"
          ref="upload"
          :http-request="addFile"
          :show-file-list="false"
          drag
          multiple
          :limit="5"
          accept="video/*"
          class="flex items-center"
        >
          <plus theme="outline" size="42" fill="#333" />
        </el-upload>
      </div>
      <div class="button" @click="run">
        <update-rotation theme="outline" size="42" :class="{isRun: isRun}" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.isRun {
  @apply animate-spin text-slate-300 cursor-wait;
}
.button {
  @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600;
}

:deep(.el-upload-dragger) {
    padding: 0 !important;
    border: none !important;
}
</style>
