console.log("Processo Principal")
// Importação de pacotes (bibliotecas)
// NativeTheme (forçar um thema no sistema operacional)
// Menu (criar menu personalizado)
// shell (acessar links externos)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron/main')
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
    // A linha abaixo obtem a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let about
    // validar a janela pai
    if (main) {
        about = new BrowserWindow({
            width: 320,
            height: 160,
            autoHideMenuBar: true, // esconder o menu
            resizable: false, // impedir o redimensionamento
            minimizable: false, // impedir minimizar a janela
            // titleBarStyle: 'hidden' //esconder a barra de estilo (ex: totem de atendimento), 
            parent: main, // estabelece uma hierarquia de janela
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    about.loadFile('./src/views/sobre.html')
    // fechar a janela quando receber mensagem do processo de renderização
    ipcMain.addListener('close-about', () => {
        // console.log("Recebi a mensagem close-about")
        // Validar se a janela foi destruida
        if (about && !about.isDestroyed()) {
            about.close()
        }

    })
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
                accelerator: 'CmdOrCtrl+N',
                click: () => novoArquivo()
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
                click: () => win.webContents.send("set-color", "#e5b567")
            },
            {
                label: 'Azul',
                click: () => win.webContents.send("set-color", "#9cdcfe")
            },
            {
                label: 'Laranja',
                click: () => win.webContents.send("set-color", "#e87d3e")
            },
            {
                label: 'Pink',
                click: () => win.webContents.send("set-color", "#b05279")
            },
            {
                label: 'Roxo',
                click: () => win.webContents.send("set-color", "#9e86c8")
            },
            {
                label: 'Verde',
                click: () => win.webContents.send("set-color", "#9cdcfe")
            },
            {
                type: 'separator',
                click: () => win.webContents.send("set-color", "#b4d273")
            },
            {
                type: 'separator',
            },
            {
                label: 'Restaurar a cor padrão',
                click: () => win.webContents.send("set-color", "#9cdcfe")
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
                label: 'LinkedIn',
                click: () => shell.openExternal('https://www.linkedin.com/in/saulo-gomes-do-carmo-74156719a/')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    },


]

// Novo Arquivo >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Passo 1: Criar estrutura de dados de um arquivo e setar o título
// Um arquivo inicia sem título, sem conteúdo, não está salvo e o local padrão vai ser a pasta de documentos.
function novoArquivo() {
    file = {
        name: "Sem título",
        content: "",
        saved: false,
        path: app.getPath('documents') + 'titulo'
    }
    // console.log(file)
    // enviar ao renderizador a estrutura de um novo arquivo e título 
    win.webContents.send('set-file',file)
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<