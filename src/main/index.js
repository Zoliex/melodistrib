import { app, shell, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png'
import { readFileSync, writeFileSync, stat } from 'fs'
import makeDoc from './docx'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 750,
    height: 615,
    minWidth: 750,
    minHeight: 615,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    ...(is.dev ? { icon: join(__dirname, '../../resources/icon.png') } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    title: `Melodistrib - v${app.getVersion()}${is.dev ? ' - (Dev MODE)' : ''}`
  })

  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  ipcMain.handle('open-tracks-file', () => {
    const paths = dialog.showOpenDialogSync({
      title: 'Ouvrir un fichier de morceaux',
      properties: ['openFile'],
      filters: [{ name: 'Fichier morceaux', extensions: ['melt2'] }]
    })
    if (!paths) {
      return null
    }
    const content = readFileSync(paths[0], 'utf-8')
    return content
  })

  ipcMain.handle('open-musicians-file', () => {
    const paths = dialog.showOpenDialogSync({
      title: 'Ouvrir un fichier de musiciens',
      properties: ['openFile'],
      filters: [{ name: 'Fichier musiciens', extensions: ['melm2'] }]
    })
    if (!paths) {
      return null
    }
    const content = readFileSync(paths[0], 'utf-8')
    return content
  })

  ipcMain.handle('open-selected-tracks-file', () => {
    const paths = dialog.showOpenDialogSync({
      title: 'Ouvrir un fichier de selections de morceaux',
      properties: ['openFile'],
      filters: [{ name: 'Fichier sélections', extensions: ['mels2'] }]
    })
    if (!paths) {
      return null
    }
    const content = readFileSync(paths[0], 'utf-8')
    return content
  })

  ipcMain.on('save-tracks-file', async (evt, tracksFile) => {
    const path = dialog.showOpenDialogSync({
      title: 'Enregistrer un fichier de morceaux',
      properties: ['openFile', 'promptToCreate'],
      filters: [{ name: 'Fichier morceaux', extensions: ['melt2'] }],
      buttonLabel: 'Enregistrer'
    })
    if (!path) return
    stat(path[0], (err) => {
      if (err) {
        writeFileSync(path[0], tracksFile, 'utf-8')
        return
      }
      dialog
        .showMessageBox({
          type: 'warning',
          message: 'Ce fichier existe déjà. Voulez-vous le remplacer ?',
          buttons: ['Oui', 'Non']
        })
        .then((result) => {
          if (result.response == 0) {
            writeFileSync(path[0], tracksFile, 'utf-8')
          }
        })
    })
  })

  ipcMain.on('save-musicians-file', async (evt, tracksFile) => {
    const path = dialog.showOpenDialogSync({
      title: 'Enregistrer un fichier de musiciens',
      properties: ['openFile', 'promptToCreate'],
      filters: [{ name: 'Fichier musiciens', extensions: ['melm2'] }],
      buttonLabel: 'Enregistrer'
    })
    if (!path) return
    stat(path[0], (err) => {
      if (err) {
        writeFileSync(path[0], tracksFile, 'utf-8')
        return
      }
      dialog
        .showMessageBox({
          type: 'warning',
          message: 'Ce fichier existe déjà. Voulez-vous le remplacer ?',
          buttons: ['Oui', 'Non']
        })
        .then((result) => {
          if (result.response == 0) {
            writeFileSync(path[0], tracksFile, 'utf-8')
          }
        })
    })
  })

  ipcMain.on('save-selected-tracks-file', async (evt, tracksFile) => {
    const path = dialog.showOpenDialogSync({
      title: 'Enregistrer un fichier de sélection de morceaux',
      properties: ['openFile', 'promptToCreate'],
      filters: [{ name: 'Fichier selections', extensions: ['mels2'] }],
      buttonLabel: 'Enregistrer'
    })
    if (!path) return
    stat(path[0], (err) => {
      if (err) {
        writeFileSync(path[0], tracksFile, 'utf-8')
        return
      }
      dialog
        .showMessageBox({
          type: 'warning',
          message: 'Ce fichier existe déjà. Voulez-vous le remplacer ?',
          buttons: ['Oui', 'Non']
        })
        .then((result) => {
          if (result.response == 0) {
            writeFileSync(path[0], tracksFile, 'utf-8')
          }
        })
    })
  })

  ipcMain.on('export-word', (evt, tracks, tracksInfos, musicians) => {
    const path = dialog.showOpenDialogSync({
      title: 'Exporter les résultats',
      properties: ['openFile', 'promptToCreate'],
      filters: [{ name: 'Word Document', extensions: ['docx'] }],
      buttonLabel: 'Exporter'
    })
    if (!path) return
    stat(path[0], async (err) => {
      if (err) {
        writeFileSync(
          path[0],
          await makeDoc(JSON.parse(tracks), JSON.parse(tracksInfos), JSON.parse(musicians))
        )
        return
      }
      dialog
        .showMessageBox({
          type: 'warning',
          message: 'Ce fichier existe déjà. Voulez-vous le remplacer ?',
          buttons: ['Oui', 'Non']
        })
        .then(async (result) => {
          if (result.response == 0) {
            writeFileSync(
              path[0],
              await makeDoc(JSON.parse(tracks), JSON.parse(tracksInfos), JSON.parse(musicians))
            )
          }
        })
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
