<script setup lang="ts">
import useConfigStore from '@renderer/store/useConfigStore'
import useFps from '@renderer/composables/useFps'
import { computed } from 'vue'
import {DataType} from '@renderer/types'
import {CloseOne} from '@icon-park/vue-next'
interface Prop {
    type: DataType,
    placeholder?: string,
    tip?:string,
    buttonStyle?: 'success' | 'danger' | 'primary',
}
const props = defineProps<Prop>()
const {config} = useConfigStore()

const list = computed(() => {
     return props.type == 'size' ? config.sizes : config.frames
})

const {newValue, add, remove} = useFps()

</script>

<template>
    <el-select :placeholder="props.placeholder">
          <el-option v-for="(item, index) in list" :key="index" :label="item" :value="item">
            <div class="flex justify-between items-center">
              {{ item }}
              <div class="delIcon" @click="remove(props.type, index)" v-if="index > 1">
                <close-one theme="outline" size="12" />
              </div>
            </div>
          </el-option>
        </el-select>
        <div class="flex gap-1 mt-2 items-center">
          <el-input v-model="newValue" :placeholder="props.tip" />
          <el-button :type="props.buttonStyle" @click="add(props.type)">增加</el-button>
        </div>
</template>

<style lang="scss" scoped>
.delIcon {
  @apply text-slate-300 hover:scale-125 duration-300 hover:opacity-90 cursor-pointer hover:text-red-500;
}
</style>