/**
 * Segurança e Desempenho
 */

const { contextBridge, ipcRenderer } = require('electron')

// processos de comunicação entre renderer e main
contextBridge.exposeInMainWorld('api', {
    // A linha abaixo cria uma função que envia uma mensagem ao processo principal
    // send -> enviar
    // on -> receber
    closeAbout: ()=> ipcRenderer.send('close-about'),
    setColor: (color) => ipcRenderer.on('set-color',color)
})