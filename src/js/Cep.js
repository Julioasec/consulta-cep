class Cep{
    constructor(cep, logradouro, complemento, bairro, uf){
        
      this.cep = document.getElementById(cep) ;
      this.logradouro = document.getElementById(logradouro);
      this.complemento = document.getElementById(complemento);
      this.bairro = document.getElementById(bairro);
      this.uf = document.getElementById(uf);
      this.consultaCep = this.consultaCep.bind(this)
    }
 
    //faz a requisição pra API
    async consultaCep(){
      let cep = this.cep.value;
      cep = cep.replace(/\s|\W/g,'')

     if(cep.length == 8){
      try{
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta)
        .then(resposta=>resposta.data)
        .then(data => {
          this.setarPropriedades(data);
        })
        .catch(erro =>{
          this.cepError()
          console.log(erro.message);
        })
        }
        catch(erro){ 
          console.log(erro.message)}
  }else if(cep.length == 0){
        this.cepError('')
  }else{
    this.cepError('Informe 8 Dígitos.')
  }

     }
     
     
    
    // trata a resposta
     async setarPropriedades(resposta){
      let data = await resposta;

      if(!data.hasOwnProperty('erro')){
        this.cep.value = data.cep;
        this.logradouro.value = data.logradouro;
        this.complemento.value = data.complemento;
        this.bairro.value = data.bairro;
        this.uf.value = `${data.localidade}/${data.uf}`
      }else{
        this.cepError()
      }
     
  }

  //apaga todos os campos e informa uma mensagem(resposta negativa da API)
  cepError(mensagem= 'Cep Não Existe'){
    this.cep.value = mensagem;
    this.logradouro.value = '';
    this.complemento.value = '';
    this.bairro.value = '';
    this.uf.value = '';
  }

  //vigia o input de cep 
  vigiaListener(){
     

    this.cep.addEventListener("click", function (){
      this.value = ''
    })

    this.cep.addEventListener("blur", this.consultaCep)

    this.logradouro.addEventListener('click', function() {
      this.select();
      this.setSelectionRange(0,9999)
      navigator.clipboard.writeText(this.value)
    })
    this.complemento.addEventListener('click', function() {
      this.select();
      this.setSelectionRange(0,9999)
      navigator.clipboard.writeText(this.value)
    })
    this.bairro.addEventListener('click', function() {
      this.select();
      this.setSelectionRange(0,9999)
      navigator.clipboard.writeText(this.value)
    })
    this.uf.addEventListener('click', function() {
      this.select();
      this.setSelectionRange(0,9999)
      navigator.clipboard.writeText(this.value)
    })
  }

  //inicia a classe
  init(){
    this.vigiaListener()
  }

  //faz a validação do cep
  validaCep(cep){
    let novoCep;
    novoCep = cep.replace(/\s|\W/g,'')
    
    if(novoCep.length !== 8){
      this.cepError('O Cep deve conter 8 números')
      return{status:false}
    }
  }
}

export default Cep;