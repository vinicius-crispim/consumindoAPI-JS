var consultaCEP = fetch("https://viacep.com.br/ws/83708100/json/").then(response => response.json()).
then(responseBody => console.log(responseBody.cep));

console.log(consultaCEP);