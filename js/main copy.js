const form = document.getElementById('novoItem')
const listaItens = document.querySelector('[data-lista]')
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((element) => {
    criaElemento(element)
})

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const nome = event.target.elements["nome"]
    const quantidade = event.target.elements["quantidade"]

    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (!existe) {
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0

        criaElemento(itemAtual)

        itens.push(itemAtual)
    } else {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(object) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = object.quantidade
    numeroItem.dataset.id = object.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += object.nome
    novoItem.appendChild(btnDeleta(object.id))

    listaItens.appendChild(novoItem)
}

function atualizaElemento(object) {
    document.querySelector("[data-id='" + object.id + "']").innerHTML = object.quantidade
    // console.log("Elemento de ID: " + document.querySelector("[data-id='" + object.id + "']").dataset.id + " atualizado")
}

function btnDeleta(id) {
    const btn = document.createElement('button')
    btn.innerText = "x"

    btn.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return btn
}

function deletaElemento(element, id) {
    element.remove();

    // remover o item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    
    // escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
}
