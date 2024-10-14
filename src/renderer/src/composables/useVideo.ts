import { ElMessage, UploadRequestOptions } from 'element-plus'
import useConfigStore from '@renderer/store/useConfigStore'
import { VideoState, VideoType } from '@renderer/types'

export default () => {
  const { config } = useConfigStore()
  const addFile = (options: UploadRequestOptions) => {
    console.log(options)
    const name = options.file.name
    const path = options.file.path
    config.files.push({ name, path, progress: 0, state: VideoState.READAY })
  }

  const remove = async (index: number) => {
    try {
      const video = config.files[index]
      if (video.state === VideoState.COMPRESS) {
        ElMessage.warning('请等待视频压缩完成?')
      } else {
        // ElMessageBox.confirm('确定删除吗?')
        config.files.splice(index, 1)
      }
    } catch (error) {}
  }

  const removeAll = () => {
    config.files = []
  }

  const removeAllVideo = () => {
    config.files.forEach((item) => {
      item.progress = 0
      item.state = VideoState.READAY
    })
  }

  const stop = () => {
    window.api.stop()
  }

  //获取视频背景颜色
  const bgColor = (video: VideoType) => {
    return {
      // [VideoState.READAY]: '#F9F871',
      [VideoState.COMPRESS]: '#F9F871',
      [VideoState.ERROR]: '#f3a683',
      [VideoState.FINISH]: '#4FFBDF'
    }[video.state]
  }

  return {
    addFile,
    remove,
    removeAll,
    bgColor,
    removeAllVideo,
    stop
  }
}
