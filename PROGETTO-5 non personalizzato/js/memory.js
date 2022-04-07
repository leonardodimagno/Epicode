let arrayAnimali = ['🐱', '🦉' ,'🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 
//1. interval 
var  interval;

//2. una agganciata alla classe find 
let iconsFind = document.querySelectorAll('.find');

//3. una agganciata al'id modal 
let modal = document.querySelector('#modal')

//4. una agganciata alla classe timer
let timer = document.querySelector('.timer');


//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)

function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

// una funzione che rimuove la classe active e chiama la funzione startGame()
function playAgain() {
    modal.classList.remove('active');
    startGame();
}

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
function startGame() {
   
    clearInterval(interval);

    let arrayConfronto= [];
    
    var arrayShuffle = shuffle(arrayAnimali);

    let lista = document.querySelector('#griglia');

    while(lista.hasChildNodes()){
        lista.removeChild(lista.firstChild);
    }
   
    //lista.innerHTML = '';

    for(let i = 0; i<24; i++){
        let box = document.createElement('div');
        let element  = document.createElement('div');
        element.className = 'icon';
        element.innerHTML = arrayShuffle[i];
        box.appendChild(element);
        lista.appendChild(box);
    }

    startTimer();

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    for(let i = 0; i<icons.length; i++){
        icons[i].addEventListener('click', displayIcon );
    }


}
 



function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function openModal() {
if(iconsFind.length === 24){
    clearInterval(interval);
    modal.classList.add('active')
    document.querySelector('#tempoTrascorso').innerHTML = timer.innerHTML;
 }
}

// una funzione che nasconde la modale alla fine e riavvia il gioco
function closeModal() {

}

// una funzione che calcola il tempo e aggiorna il contenitore sotto
function startTimer() {
    let sec = 0;
    let min = 0;
    

    
    interval = setInterval(function(){
        sec++;
        if(sec >= 60){
           sec = 0;
        min++; 
         if ( min >= 60){
             min= 0;
            
         }
        
        }
       timer.innerHTML = 'Tempo: '+ min + ' minuti ' + sec + 'secondi'
    }, 1000);
    
}
    
    
    
    
    
   