import useConfigStore from '@renderer/store/useConfigStore'
import { MainProcessNoticeType, VideoState, VideoType } from '@renderer/types'
import { ElMessage } from 'element-plus'
import { ref, toRefs } from 'vue'

const isRun = ref(false)
export default () => {
  const isNotice = ref(false)
  const { config } = useConfigStore()
  const video = ref<VideoType>()
  const { videoSaveDirectory } = toRefs(config)

  const validate = () => {
    let message = ''
    if (videoSaveDirectory.value.trim() === '') {
      message = '视频目录不能为空'
    }
    if (config.files.length === 0) {
      message = '请选择视频文件'
    }
    if (!video.value) {
      message = '视频压缩完毕'
    }
    if (message) ElMessage.warning(message)
    return message === ''
  }

  const getCompressFile = () => {
    video.value = config.files.find((video) => video.state == VideoState.READAY)
    if (video.value) video.value.state = VideoState.COMPRESS
    else isRun.value = false
  }

  const progressNotice = () => {
    // window.api.progressNotice((progress: number) => {
    //   console.log(progress)
    //   video.value!.progress = progress
    // })
    console.log(123123)
    console.log(video)
    window.api.mainProcessNotice((type: MainProcessNoticeType, data: any) => {
      console.log(data)
      switch (type) {
        case MainProcessNoticeType.PROGRESS:
          video.value!.progress = data
          break
        case MainProcessNoticeType.END:
          video.value!.state = VideoState.FINISH
          compress()
          break
        case MainProcessNoticeType.DIREDCTORY_CHECK:
          ElMessage.warning({ message: data, grouping: true })
          video.value!.state = VideoState.READAY
          isRun.value = false
          break
        case MainProcessNoticeType.STOP:
          ElMessage.warning({ message: '转码停止了', grouping: true })
          isRun.value = false
          break
      }
    })
  }

  const run = () => {
    if (!isNotice.value) {
      progressNotice()
    }
    isNotice.value = true
    if (isRun.value) return
    isRun.value = true
    compress()
  }

  const compress = () => {
    getCompressFile()
    if (validate() === false) {
      isRun.value = false
      return
    }
    window.api.compress({
      file: { ...video.value! },
      fps: Number(config.frame),
      size: config.size,
      saveDirectory: config.videoSaveDirectory
    })
  }

  return {
    isRun,
    run,
    progressNotice
  }
}
