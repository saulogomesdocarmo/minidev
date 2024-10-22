console.log("Processo Principal")
// Importação de pacotes (bibliotecas)
// NativeTheme (forçar um thema no sistema operacional)
// Menu (criar menu personalizado)
// shell (acessar links externos)
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron/main')
const path = require('node:path')

// Janela principal
let win // Importante neste projeto o escopo da variável  win deve ser global
function createWindow() {
    nativeTheme.themeSource = 'dark' //Janela sempre escura
    win = new BrowserWindow({
        width: 1010, // Largura em Pixels
        height: 720, // Altura em Pixels
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // Menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}
// Janela Sobre (secundária)
function aboutWindow() {
    nativeTheme.themeSource = 'dark'
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        autoHideMenuBar: true, // esconder o menu
        resizable: false, // impedir o redimensionamento
        minimizable: false, // impedir minimizar a janela
        // titleBarStyle: 'hidden' //esconder a barra de estilo (ex: totem de atendimento), 
    })
    about.loadFile('./src/views/sobre.html')
}
// Execução Assíncrona do aplicativo Electron
app.whenReady().then(() => {
    createWindow()
    // Comportamento do MAC ao fechar uma janela
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Encerrar a aplicação quando a janela for fechada (Windows e Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// template do Menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Novo',
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: 'Abrir',
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: 'Salvar',
                accelerator: 'CmdOrCtrl+S'
            },
            {
                label: 'Salvar Como',
                accelerator: 'CmdOrCtrl+Shift+S'
            },
            {
                type: 'separator'
            },
            {
                label: 'Sair',
                accelerator: 'Alt+F4',
                click: () => app.quit(

                )
            }
        ]
    },
    {
        label: 'Editar',
        submenu: [
            {
                label: 'Desfazer',
                role: 'undo'
            },
            {
                label: 'Refazer',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Recortar',
                role: 'cut'
            },
            {
                label: 'Copiar',
                role: 'copy'
            },
            {
                label: 'Colar',
                role: 'paste'
            },

        ]
    },
    {
        label: 'Zoom',
        submenu: [
            {
                label: 'Aumentar',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir ',
                role: 'zoomOut'
            },
            {
                label: 'Reduzir ',
                role: 'resetZoom'
            },
        ]
    },
    {
        label: 'Cor',
        submenu: [
            {
                label: 'Amarelo',
            },
            {
                label: 'Azul',
            },
            {
                label: 'Laranja',
            },
            {
                label: 'Pink',
            },
            {
                label: 'Roxo',
            },
            {
                label: 'Verde',
            },
            {
                type: 'separator'
            },
            {
                label: 'Restaurar a cor padrão'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Repositório',
                click: () => shell.openExternal('https://github.com/saulogomesdocarmo/minidev.git')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    },


] 