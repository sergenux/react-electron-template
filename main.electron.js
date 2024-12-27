import electron from 'electron'
import path from 'node:path'
import process from 'node:process'

const appDir = './build/client'

const entryUrl = process.env.DEV_SERVER_URL || 'fs://app/'

electron.protocol.registerSchemesAsPrivileged([
  {
    scheme: 'fs',
    privileges: {
      standard: true,
      supportFetchAPI: true
    }
  }
])

function createWindow() {
  const window = new electron.BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  window.maximize()
  window.loadURL(entryUrl)
}

electron.app.whenReady().then(() => {
  const fallbackUrl = new URL(path.join(appDir, '/index.html'), import.meta.url)

  electron.protocol.handle('fs', async (request) => {
    let pathname = new URL(request.url).pathname
    const isManifest = pathname.endsWith('__manifest')

    if (!isManifest && (pathname.endsWith('/') || !path.extname(pathname))) {
      pathname = path.join(pathname, 'index.html')
    }

    const url = new URL(path.join(appDir, pathname), import.meta.url)

    return electron.net.fetch(url).catch(() => electron.net.fetch(fallbackUrl))
  })

  createWindow()

  electron.app.on('activate', function () {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    electron.app.quit()
  }
})
