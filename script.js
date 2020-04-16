const transacaoUl = document.getElementById('transactions')
const painelSaldoTotal = document.getElementById('balance')
const painelReceitas = document.getElementById('money-plus')
const painelDespesas = document.getElementById('money-minus')
let id = 0
let saldoTotal = [0, 0, 0]

const geradorID = () => ++id

const transacoes = [{ 
  id: geradorID(),
  nome: 'Sapado Usado',
  valor: 13.00,
  },
  { 
    id: geradorID(),
    nome: 'Carro',
    valor: -45000.00,
  },
  { 
    id: geradorID(),
    nome: 'Internet',
    valor: -100.00,
  }
  
]



const formatarValor = valor => {
  let sinal = valor < 0 ? '-' : '+'
  let valorAbsoluto = Math.abs(valor)
  let valorString = String(valorAbsoluto.toFixed(2)).replace('.', ',')
  return( sinal + 'R$ ' + valorString )
} 

const carregarTransacao = ( transacao ) => {
  let transacaoLi = document.createElement('li')
  let className = transacao.valor < 0 ? 'minus' : 'plus'
  let valorConvertido = formatarValor( transacao.valor )

  transacaoLi.classList.add(className)
  transacaoLi.setAttribute('id', transacao.id)

  transacaoLi.innerHTML = `${transacao.nome}
    <span>${valorConvertido}</span>
    <button onclick="(removerTransacao(${transacao.id}))"class="delete-btn">
    x
    </button>`
  transacaoUl.appendChild(transacaoLi)
}

const adicionarTransacao = ( nome, valor ) => {

  transacoes.push({
    id: geradorID(), 
    nome, 
    valor
  })
  transacaoUl.innerHTML = ''
  update()
}


const onClick = () => {
  event.preventDefault()
  let nome = document.getElementById('text').value
  let valor = document.getElementById('amount').value
  adicionarTransacao(nome, valor)
}

const update = () => {
  transacoes.forEach(carregarTransacao)
  atualizarPainel()
}

const atualizarPainel = () => {
  saldoTotal = [0, 0, 0]
  transacoes.forEach((transacao) => {
    let posicao = transacao.valor > 0? 1 : 2
    saldoTotal[posicao] += transacao.valor
  })

  saldoTotal[0] = saldoTotal[1] + saldoTotal[2]


  painelSaldoTotal.innerHTML = formatarValor(saldoTotal[0])
  painelReceitas.innerHTML = formatarValor(saldoTotal[1])
  painelDespesas.innerHTML = formatarValor(saldoTotal[2])
}

const removerTransacao = (id) => {
  let transacaoPExcluir = document.getElementById(id)
  transacaoPExcluir.remove()
}

document.getElementById('button').addEventListener('onclick', onClick, false)
update()