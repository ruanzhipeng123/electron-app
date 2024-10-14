import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffprobePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { CompressOptions, MainProcessNoticeType } from '../renderer/src/types'
import { existsSync } from 'fs'

ffmpeg.setFfmpegPath(ffmpegPath.path.replace('app.asar', 'app.asar.unpacked'))
ffmpeg.setFfprobePath(ffprobePath.path.replace('app.asar', 'app.asar.unpacked'))

export default class Ffmpeg {
  ffmpeg: any
  window: BrowserWindow
  constructor(
    private event: IpcMainInvokeEvent,
    private options: CompressOptions
  ) {
    this.ffmpeg = ffmpeg(this.options.file.path)
    this.window = BrowserWindow.fromWebContents(this.event.sender)!
    console.log(4563456)
  }

  progressEvent(progress) {
    this.window.webContents.send(
      'mainProcessNotice',
      MainProcessNoticeType.PROGRESS,
      progress.percent
    )
    console.log('Processing:' + progress.percent + '% done')
  }

  error(err) {
    console.log('An error occurred: ' + err.message)
  }

  end() {
    this.window.webContents.send('mainProcessNotice', MainProcessNoticeType.END, 'end')
    console.log('Processing finished !')
  }

  private getSaveFilePath() {
    const info = path.parse(this.options.file.name)
    return path.join(this.options.saveDirectory, info.name + '-' + this.options.size + info.ext)
  }

  private validate() {
    if (!existsSync(this.options.saveDirectory)) {
      // dialog.showErrorBox('温馨提示', '目录不存在')
      this.window.webContents.send(
        'mainProcessNotice',
        MainProcessNoticeType.DIREDCTORY_CHECK,
        '目录不存在'
      )
      return false
    }
    return true
  }

  stop() {
    this.ffmpeg.kill('SIGKILL')
    this.window.webContents.send('mainProcessNotice', MainProcessNoticeType.STOP, '')
  }

  run() {
    // console.log(this.options)
    // ffmpeg(this.options.file.path)
    if (!this.validate()) return
    this.ffmpeg
      .videoCodec('libx264')
      .fps(this.options.fps)
      // .size(this.options.size)
      .size('320x400')
      .on('progress', this.progressEvent.bind(this))
      .on('error', this.error.bind(this))
      .on('end', this.end.bind(this))
      // .save(path.resolve(__dirname, '../../weixin-finish.mp4'))
      // .save(path.join(this.options.saveDirectory, this.options.file.name))
      .save(this.getSaveFilePath())
  }
}
