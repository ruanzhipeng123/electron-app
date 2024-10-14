import {dialog} from 'electron'

export const selectDirectory = async () => {
    const res = await dialog.showOpenDialog({
        title: '选择文件夹',
        properties: ['openDirectory', 'createDirectory']
    })
    console.log(res);
    return res.canceled === false ? res.filePaths[0] : ''
}