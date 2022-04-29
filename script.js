document.querySelector('.busca').addEventListener('submit', async (event) => {
    
    event.preventDefault();
    
    let input = document.querySelector('#searchInput').value;
   
    if(input ){
        clearInfo();
       showWarning('Carregando dados...');
        let url  = `https://viacep.com.br/ws/${encodeURIComponent(input)}/json/`;
        let results = await fetch(url);
        let json = await results.json();
        let cod = results.status;
        
      showInfo({
          bairro:json.bairro,
          cep: json.cep,
          logradouro:json.logradouro,
          localidade: json.localidade,
          uf: json.uf
      }) 
    }

    else{
        clearInfo();
        showWarning("Insira um CEP!")
    }});


//mensagem de erro
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
};

//armazenar dados do cep
function showInfo(json){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.localidade}, ${json.uf}`;
    document.querySelector('.endInfo').innerHTML = `${json.logradouro}`;
    document.querySelector('.bairroInfo').innerHTML = `${json.bairro}`;
    document.querySelector('.titulo2').innerHTML = `${json.cep}`;
    document.querySelector('.resultado').style.display = "block"
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}