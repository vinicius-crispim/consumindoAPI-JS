const endereco = {
    'logradouro': '',
    'bairro': '',
    'localidade': '',
    'uf': '',
    'cep': '',
};

function searchCEP(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {
        if (/^[0-9]{8}$/.test(cep)) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`).then(response => response.json()).
            then(responseBody => {
                if (responseBody.erro) {
                    throw new Error('Este CEP não existe');
                } else {
                    addAddress(responseBody);

                }
            }).catch(erro => console.log(erro));
        }
    }


    function addAddress(responseBody) {
        endereco.logradouro = responseBody.logradouro;
        endereco.bairro = responseBody.bairro;
        endereco.localidade = responseBody.localidade;
        endereco.uf = responseBody.uf;
        endereco.cep = responseBody.cep;
        showAddress(endereco);
    }

    function showAddress(endereco) {
        document.querySelector("#endereco").value = endereco.logradouro;
        document.querySelector("#bairro").value = endereco.bairro;
        document.querySelector("#estado").value = endereco.uf;
        document.querySelector("#cidade").value = endereco.localidade;
    }
}