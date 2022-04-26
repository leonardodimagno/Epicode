
class Oggetto{
    constructor(numero,euroRicarica){
        this.numero = numero;
        this.euroRicarica = euroRicarica;
    }
}




document.addEventListener('DOMContentLoaded',function(){

    let prodotti = [];
    let input = document.querySelectorAll('#form input')
    let aggiungi = document.getElementById('aggiungi');
    aggiungi.addEventListener('click',function(){

       let numero1 = input[0].value.trim();
       let euroRicarica1 = input[1].value;
       if(numero1 != ''&& euroRicarica1 > 0){
           let oggetto = new Oggetto(numero1,euroRicarica1)
           prodotti.push(oggetto);
           let stringaProdotti = JSON.stringify(prodotti);
           localStorage.setItem('prodotti',stringaProdotti);
           input[0].value = '';
           input[1].value = '';


       }
      
      

    })
    
})




let div = document.getElementById('orologio');







let hrs = 0;
let min = 0;
let sec = 0;
let timer;

let cronometroDigitale = div.children[1];
print();

function setCronometro() {
    sec++;
    if(sec >= 60) {
       sec = 0;
       min++; 
       if(min >= 60) {
        min = 0;
        hrs++;
       }
    }
    print();
}

function print() {
    cronometroDigitale.innerHTML = (hrs > 9 ? hrs : '0'+hrs) + ':' 
                                 + (min > 9 ? min : '0'+min) + ':' 
                                 + (sec > 9 ? sec : '0'+sec);
}

function start() {
    timer = setInterval(setCronometro, 1000);
}

function stop() {
    clearInterval(timer);
}


