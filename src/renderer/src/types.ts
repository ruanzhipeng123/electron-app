export type DataType = 'size' | 'frame'

export enum MainProcessNoticeType {
  END = 'end',
  PROGRESS = 'progress',
  ERROR = 'error',
  DIREDCTORY_CHECK = 'directoryCheck',
  STOP = 'stop'
}

//视频状态
export enum VideoState {
  READAY = 'readay',
  COMPRESS = 'compress',
  ERROR = 'error',
  FINISH = 'finish'
}

export type VideoType = {
  name: string
  path: string
  progress: number
  state: VideoState
}

export type CompressOptions = {
  file: VideoType
  fps: number
  size: string
  saveDirectory: string
}
