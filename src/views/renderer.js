/**
 * Processos de Renderização - Front-end
 */
console.log("Processo de renderização")

// Botão OK (Janela Sobre)
function fechar() {
    api.closeAbout()
}

// capturar o id de text-area (! Importante !)
const area = document.getElementById('txtArea')

// iniciar o app com foco na área de digitação
area.focus

// numeração automática de linhas
function atualizarLinhas() {
    // capturar o id do container das linhas
    const linhasNumeradas = document.getElementById('linhas')
    // Variável de apoio usada na renderização das linhas no HTML
    let linhasNumeradasHTML = ""
    // Divide o conteúdo da área de texto (tag - textArea) em um array de linhas, utilizando \n como delimitador de (nova linha)
    let linha = area.value.split('\n')
    // percorrer o array de linhas adicionando um número de  linha a cada loop 
    for (let i = 0; i < linha.length; i++) {
        linhasNumeradasHTML += i + 1 + '<br>'

    }
    linhasNumeradas.innerHTML = linhasNumeradasHTML
}

// iniciar automaticamente a função junto com o app
atualizarLinhas()

// Adicionar um evento de entrada a área de texto (textArea) atualizar as linhas numeradas
area.addEventListener('input', () => {
    atualizarLinhas()
})

//Adicionar um evento de rolagem  a área de texto (textarea) para sincronizar com as linhas
area.addEventListener('scroll', () => {
    document.getElementById('linhas').scrollTop = area.scrollTop
})

//Identação do código ao 
area.addEventListener('keydown', (event) => {
    // Se a tecla TAB for pressionada
    if (event.key === 'Tab') {
        // Ingnorar o comportamento padrão
        event.preventDefault()
        // váriaveis de apoio
        const textarea = event.target
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        // definir o número de espaços para o TAB
        // Dica: Usar o "\t" para um TAB real do sistemas
        const ident = '  ' // Tab que vale 2 espaços
        // Adicionar  a identação no ponto do cursor
        textarea.value = textarea.value.substring(0, start) + ident + textarea.value.substring(end)
        // mover o cursor para frente após a identação
        textarea.selectionStart = textarea.selectionEnd = start + ident
    }
})

// Mudar a cor do texto
api.setColor((event, color) => {
    if (area) {
        // trocar cor da fonte  (style - css)
        area.style.color = color
    }
})

// Novo Arquivo / Abrir arquivo 
// Novo Arquivo: Carregar a estrutura e mudar o título
// Abrir Arquivo: Abrir um arquivo existente 
api.setFile((event, file) => {
    area.value = file.content
    // capturar o ID do título
    const nomeArquivo = document.getElementById('titulo')
    nomeArquivo.innerHTML = `${file.name} - Mini Dev Editor`
    atualizarLinhas()
})

