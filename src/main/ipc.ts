import { IpcMainInvokeEvent, ipcMain } from 'electron'
import Ffmpeg from './ffmpeg'
import { selectDirectory } from './directory';
import { CompressOptions } from '../renderer/src/types';

let ffmpeg = null as Ffmpeg | null
ipcMain.handle('compress', async (event: IpcMainInvokeEvent,options: CompressOptions) => {
    console.log('abc');
    const compress = new Ffmpeg(event, options)
    ffmpeg = compress
    compress.run()
})

ipcMain.on('stop', () => {
    ffmpeg?.stop()
})

ipcMain.handle('selectDirectory', async () => {
    return selectDirectory()
})

// ipcMain.handle('progressNotice', async (event: IpcMainInvokeEvent,options: CompressOptions) => {
//     const compress = new Ffmpeg(event, options)
//     compress.run()
// })