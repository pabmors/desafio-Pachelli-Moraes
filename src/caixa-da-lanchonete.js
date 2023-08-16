class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!metodoDePagamento || metodoDePagamento !== 'dinheiro' && metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito') {
            return "Forma de pagamento inválida!"
        } else if (!itens.length || itens[0].trim() === '') {
            return "Não há itens no carrinho de compra!"
        } else {
            let contadorItemExtra = 0;
            let contadorItemInvalido = 0;
            let cafeAcompanhado = [];
            let sanduicheAcompanhado = [];
            let chantilyAcompanhado = [];
            let queijoAcompanhado = [];
            let somaPreco = 0;
            for (let item of itens) {
                let [produto, quantidade] = item.split(',')
                for (let produtoBuscado of this.bancoDeDados) {
                    if (produto !== produtoBuscado.produto) {
                        contadorItemInvalido++;
                    }
                    if (contadorItemInvalido === this.bancoDeDados.length) {
                        return "Item inválido!"
                    } 
                    if (produto === 'cafe') {
                        cafeAcompanhado.push(produto);
                    }      
                    if (produto === 'sanduiche') {
                        sanduicheAcompanhado.push(produto);
                    }           
                    if (produtoBuscado.produto === produto) {
                        somaPreco += produtoBuscado.valor * quantidade
                    }
                }
                if (produto === 'chantily' || produto === 'queijo' || produto === 'combo1' || produto === 'combo2') {
                    contadorItemExtra++;
                    if (item === itens[itens.length - 1] && contadorItemExtra === itens.length) {
                        return "Item extra não pode ser pedido sem o principal"
                    }
                    if (produto === 'chantily') {
                        chantilyAcompanhado.push(produto);
                    }  
                    if (produto === 'queijo') {
                        queijoAcompanhado.push(produto);
                    }    
                }
                if (quantidade <= 0 || !quantidade || !quantidade.trim() || isNaN(quantidade)) {
                    return "Quantidade inválida!"
                }
                contadorItemInvalido = 0;
            }
            if (!cafeAcompanhado.length >= chantilyAcompanhado.length && chantilyAcompanhado.length > 0) {
                return "Item extra não pode ser pedido sem o principal"
            }
            if (!sanduicheAcompanhado.length >= queijoAcompanhado.length && queijoAcompanhado.length > 0) {
                return "Item extra não pode ser pedido sem o principal"
            }
            if (metodoDePagamento === 'dinheiro') {
                somaPreco -= somaPreco * 0.05
            } else if (metodoDePagamento === 'credito') {
                somaPreco += somaPreco * 0.03
            }
            return `R$ ${somaPreco.toFixed(2).replace('.', ',').toString()}`
        }
    }
}

CaixaDaLanchonete.prototype.bancoDeDados = [{
    produto: 'cafe',
    valor: 3
},{ 
    produto: 'chantily',
    valor: 1.5,
},{ 
    produto: 'suco',
    valor: 6.2,
},{ 
    produto: 'sanduiche',
    valor: 6.5,
},{ 
    produto: 'queijo',
    valor: 2,
},{ 
    produto: 'salgado',
    valor: 7.25,
},{ 
    produto: 'combo1',
    valor: 9.5,
},{ 
    produto: 'combo2',
    valor: 7.5,
}]

export { CaixaDaLanchonete };