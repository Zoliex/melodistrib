import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron'
//import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFileSync, stat, writeFileSync } from 'node:fs'
import { makeDoc } from './lib/docx'

//const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
        width: 750,
        height: 615,
        minWidth: 750,
        minHeight: 615,
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs')
        },
        title: `Melodistrib - v${app.getVersion()}${process.env.NODE_ENV == 'development' ? ' - (Dev MODE)' : ''}`
    })

    if (process.env.NODE_ENV != 'development') {
        const menu = Menu.buildFromTemplate([])
        Menu.setApplicationMenu(menu)
    }

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(() => {
    createWindow()

    //Open file handler
    ipcMain.handle(
        'open-file',
        async (_event, title: string, filters: Electron.FileFilter[]): Promise<string | null> => {
            const paths = dialog.showOpenDialogSync({
                title,
                properties: ['openFile'],
                filters
            })

            //Check if file has been selected
            if (!paths) return null

            //Reading file content
            const content = readFileSync(paths[0], 'utf-8')
            return content
        }
    )

    //Save file handler
    ipcMain.on(
        'save-file',
        async (_event, title: string, data: string, filters: Electron.FileFilter[]) => {
            const path = dialog.showOpenDialogSync({
                title,
                properties: ['openFile', 'promptToCreate'],
                filters,
                buttonLabel: 'Enregistrer'
            })
            if (!path) return

            //Check if file exists
            stat(path[0], (err) => {
                if (err) {
                    //If file doesn't exist create it
                    writeFileSync(path[0], data, 'utf-8')
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
                            //If file exists replace it
                            writeFileSync(path[0], data, 'utf-8')
                        }
                    })
            })
        }
    )

    //Save file handler
    ipcMain.on(
        'export-word',
        async (_event, data: {
            tracks: Track[]
            musicians: Musician[]
            distribution: DistributionItem[]
            stats: Stats
        }) => {
            const path = dialog.showOpenDialogSync({
                title: "Exporter l'enchaînement en Word",
                properties: ['openFile', 'promptToCreate'],
                filters: [{ name: 'Fichier Word', extensions: ['docx'] }],
                buttonLabel: 'Exporter'
            })
            if (!path) return

            //Check if file exists
            stat(path[0], async (err) => {
                if (err) {
                    //If file doesn't exist create it
                    const buffer = await makeDoc(data)
                    writeFileSync(path[0], buffer, 'utf-8')
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
                            //If file exists replace it
                            const buffer = await makeDoc(data)
                            writeFileSync(path[0], buffer)
                        }
                    })
            })
        }
    )
})
