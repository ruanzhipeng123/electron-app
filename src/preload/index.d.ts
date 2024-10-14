import { ElectronAPI } from '@electron-toolkit/preload'
import {CompressOptions} from '@renderer/types'
import { MainProcessNoticeType } from '../renderer/src/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress: (options: CompressOptions) => void,
      selectDirectory: () => Promise<any>,
      mainProcessNotice: (callback: (type: MainProcessNoticeType, data: any)=>void) => void
      stop: () => void
    }
  }
}
