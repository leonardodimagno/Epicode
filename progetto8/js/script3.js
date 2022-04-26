document.addEventListener('DOMContentLoaded',function(){
   
    let stringaCarrello = localStorage.getItem('carrello');

    carrello = JSON.parse(stringaCarrello);
    let ul = document.querySelector('.container ul');
    let totale = 0;
    let span = document.querySelector('span');

    for (let i=0 ; i< carrello.length; i++){
        let lista= document.createElement('li');
        let btn = document.createElement('button');
        lista.innerHTML = carrello[i].numero + '' + carrello[i].euroRicarica + '';
        totale += +carrello[i].euroRicarica;
        ul.appendChild(lista);
        
        span.innerText = 'il totale è ' + totale +'€';
        
        
    }

})