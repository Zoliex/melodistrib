import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openTracksFile: () => ipcRenderer.invoke('open-tracks-file'),
  openMusiciansFile: () => ipcRenderer.invoke('open-musicians-file'),
  openSelectionsFile: () => ipcRenderer.invoke('open-selected-tracks-file'),
  saveTracksFile: (tracksFile) => ipcRenderer.send('save-tracks-file', tracksFile),
  saveMusiciansFile: (musiciansFile) => ipcRenderer.send('save-musicians-file', musiciansFile),
  saveSelectionsFile: (selectionsFile) =>
    ipcRenderer.send('save-selected-tracks-file', selectionsFile),
  exportAsWord: (tracks, tracksInfo, musicians) =>
    ipcRenderer.send('export-word', tracks, tracksInfo, musicians)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
