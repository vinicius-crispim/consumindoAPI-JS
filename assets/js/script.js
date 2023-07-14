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
            try {
                fetch(`https://viacep.com.br/ws/${cep}/json/`).
                then(response => response.json()).
                then(response => {
                    if (response.erro){
                        throw new Error('Este CEP não existe');
                    }else {
                        addAddress(response);
                    }
                })
            } catch (error) {
                console.log(error);
            }
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