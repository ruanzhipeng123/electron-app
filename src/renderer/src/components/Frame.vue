<script setup lang="ts">
import useConfigStore from '@renderer/store/useConfigStore'
const {config} = useConfigStore()
</script>

<template>
   <main class="bg-white p-3 flex gap-2">
    <el-select
      v-model="config.size"
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="(item, index) in config.sizes"
        :key="index"
        :label="item"
        :value="item"
      />
    </el-select>

    <el-select
      v-model="config.frame"
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="(item, index) in config.frames"
        :key="index"
        :label="item"
        :value="item"
      />
    </el-select>
   </main>
</template>

<style lang="scss" scoped>
</style>