function validarInputs(elemento) {
    if (!elemento) {
        return null;
    }
    return elemento.value;
}

function validacaoNumero(valor) {
    if (!valor) return false;

    let valorConta = valor.replace(',', '.');
    let numero = Number(valorConta);

    if (isNaN(numero)) return false;
    if (numero <= 0) return false;

    return numero;
}

function validacaoInt(numero) {
    if (!numero) return false;
    let valor = Number.parseInt(numero, 10);

    if (isNaN(valor)) return false;
    if (valor < 1) return false;

    return valor;
}

function calcularGorjeta(conta, taxa, pessoas) {
    let valorTotal = conta * (1 + taxa / 100);
    let gorjeta = conta * (taxa / 100);
    let dividir = gorjeta / pessoas;

    return {
        dinheiro: valorTotal,
        valorPessoa: dividir,
        gorjeta: gorjeta,
    };
}

function msgErros(mensagem) {
    Swal.fire({
        title: 'Erro!',
        text: mensagem,
        color: '#000',
        background: '#d9bd9c',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#db744b',
        showClass: {
            popup: 'swal2-show',
            backdrop: 'swal2-backdrop-show',
            icon: 'swal2-icon-show',
        },
    });
}

function numeroComVirgula(valor) {
    return valor.toString().replace('.', ',');
}

let btn = document.getElementById('btn');
btn.addEventListener('click', (event) => {
    event.preventDefault();

    let taxaGarcom = document.querySelector('input[name="taxa"]:checked');
    let totalConta = document.getElementById('conta');
    let qtdPessoas = document.getElementById('pessoas');

    let taxa = validarInputs(taxaGarcom);
    let conta = validarInputs(totalConta);
    let pessoas = validarInputs(qtdPessoas);

    let valorPagamento = validacaoNumero(conta);
    let nPessoas = validacaoInt(pessoas);
    let garcom = validacaoInt(taxa);

    if (!valorPagamento) {
        msgErros('O valor inserindo no campo de "débito" está inválido.');
    }

    if (!nPessoas) {
        msgErros(
            'O valor inserindo no campo de "total a pagar por pessoa" está inválido.'
        );
    }

    if (!garcom) {
        msgErros('O valor inserindo no campo de "gorjeta" está inválido.');
    }

    if (valorPagamento && nPessoas && garcom) {
        let exibirResuldos = calcularGorjeta(valorPagamento, garcom, nPessoas);

        let valorPagar = numeroComVirgula(exibirResuldos.dinheiro.toFixed(2));
        let valorPessoas = numeroComVirgula(
            exibirResuldos.valorPessoa.toFixed(2)
        );
        let valorGarcom = numeroComVirgula(exibirResuldos.gorjeta.toFixed(2));

        document.getElementById('contaTotal').innerText = valorPagar;
        document.getElementById('gorjeta').innerText = valorGarcom;
        document.getElementById('qtdPessoas').innerText = valorPessoas;
    } else {
        msgErros(
            'Os valores inserindos nos campos acima são inválidos ou estão em branco.'
        );
    }
});
