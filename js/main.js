const data = document.getElementById('data')
const destino = document.getElementById('destino')
const novoItem = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []

data.querySelector('#novaData').value = localStorage.getItem("dia");

data.addEventListener("submit", (event) => {
    // event.preventDefault()
    const dia = event.target.elements["novaData"]
    localStorage.setItem("dia", dia.value)
})

destino.querySelector('#novoDestino').value = localStorage.getItem("destino")

destino.addEventListener("submit", (event) => {
    // event.preventDefault()
    const novoDestino = event.target.elements["novoDestino"]
    localStorage.setItem("destino", novoDestino.value)
})

itens.forEach((element) => {
    renderizaElemento(element)
})

novoItem.addEventListener("submit", (event) => {
    // event.preventDefault()
    const nome = event.target.elements["nome"]
    const quantidade =event.target.elements["quantidade"]
    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(!existe) {
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0
        itemAtual.check = false;

        try{
            itens.push(itemAtual)
            renderizaElemento(itemAtual)
        } catch {
            event.preventDefault()
            throw Error('não foi possível criar o elemento!')
        }
    } else {
        itemAtual.id = existe.id

        try{
            atualizaElemento(itemAtual)
            itens[itens.findIndex( elemento => elemento.id === existe.id)] = itemAtual
        } catch{
            throw Error('Não foi possível atualizar o item!')
        }
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

const elementosListados = document.querySelectorAll('input[type="checkbox"]')
elementosListados.forEach((element) => {
    element.addEventListener("click", (element) => {
        const idElemento = element.target.id
        const indexElemento = itens.findIndex(elemento => elemento.id == idElemento)

        itens[indexElemento].check = !itens[indexElemento].check
        
        localStorage.setItem("itens", JSON.stringify(itens))
    })
})

function renderizaElemento(object) {
    const novoItem = document.createElement('div')

    novoItem.classList.add('item')
    novoItem.innerHTML = `
        <span>${object.quantidade}</span>
        <input type="checkbox" id="${object.id}">
        <label for="${object.id}">${object.nome}</label>`

    novoItem.appendChild(renderizarBtnDelete(object.id))
    lista.appendChild(novoItem)

    if(object.check) {
        checked(object.id)
    }
}

function renderizarBtnDelete(id) {
    const btnDelete = document.createElement('button')

    btnDelete.classList.add('btn-delete')
    btnDelete.setAttribute("type","submit")
    btnDelete.setAttribute("value","")
    btnDelete.innerHTML = `<img src="img/delete.svg">`

    btnDelete.addEventListener("click", (event) => {
        // event.preventDefault()
        const itemForm = event.target.parentNode
        deletaElemento(itemForm.parentNode, id)
    })

    return btnDelete
}

function atualizaElemento(object) {
    const element = document.getElementById(object.id).parentNode
    element.querySelector('span').innerText = object.quantidade
}

function deletaElemento(event, id) {
    event.remove()
    itens.splice(itens.findIndex(element => element.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}

function checked(id) {
    document.getElementById(id).checked = true
}
