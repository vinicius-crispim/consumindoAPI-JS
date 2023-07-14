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
            buscaEndereco()
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

    //forma de evitar varios 'then' e muitas callbacks (Inferno de Callbacks)
    async function buscaEndereco() {
        try {
            let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            let consultaCEPConvertido = await consultaCEP.json();
            if (consultaCEPConvertido.erro) {
                throw new Error('Este CEP não existe');
            }
            addAddress(consultaCEPConvertido);

        } catch (error) {
            console.log(error);
        }

    }
}