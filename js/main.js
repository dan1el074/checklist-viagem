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
    criaElemento(element)
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

        criaElemento(itemAtual)
        
        itens.push(itemAtual)
    } else {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        console.log(existe)

        itens[itens.findIndex( elemento => elemento.id === existe.id)] = itemAtual
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

const elementosListados = document.querySelectorAll('input[type="checkbox"]')
elementosListados.forEach((e) => {
    e.addEventListener("click", (e) => {
        const idElemento = e.target.id
        const indexElemento = itens.findIndex(elemento => elemento.id == idElemento)

        if(e.target.checked) {
            itens[indexElemento].check = true
        } else {
            itens[indexElemento].check = false
        }

        localStorage.setItem("itens", JSON.stringify(itens))
    })
})

function criaElemento(object) {
    const novoItem = document.createElement('div')

    const inputQuantidade = document.createElement('span')
    inputQuantidade.innerText = object.quantidade

    const checkbox = document.createElement('input')
    checkbox.setAttribute("type","checkbox")
    checkbox.setAttribute("id",object.id)

    const label = document.createElement('label')
    label.setAttribute("for", object.id)
    label.innerText = object.nome
    
    const br = document.createElement('br')

    novoItem.appendChild(inputQuantidade)
    novoItem.appendChild(checkbox)
    novoItem.appendChild(label)
    novoItem.appendChild(btnDelete(object.id))
    novoItem.appendChild(br)
    lista.appendChild(novoItem)

    if(object.check) {
        checked(object.id)
    }
}

function atualizaElemento(object) {
    const element = document.getElementById(object.id).parentNode
    element.querySelector('span').innerText = object.quantidade
}

function btnDelete(id) {
    const imgDelete = document.createElement('img')
    imgDelete.setAttribute("src","img/delete.svg")

    const btnDelete = document.createElement('button')
    btnDelete.classList.add('btn-delete')
    btnDelete.setAttribute("type","submit")
    btnDelete.setAttribute("value","")
    btnDelete.appendChild(imgDelete)

    btnDelete.addEventListener("click", (event) => {
        // event.preventDefault()
        const form = event.target.parentNode
        deletaElemento(form.parentNode,id)
    })

    return btnDelete
}

function deletaElemento(event, id) {
    event.remove()
    itens.splice(itens.findIndex(element => element.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}

function checked(id) {
    document.getElementById(id).checked = true
}
