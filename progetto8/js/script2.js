document.addEventListener('DOMContentLoaded',function(){
    
    let prodotti = [];
    let carrello = [];

    let stringaProdotti = localStorage.getItem('prodotti')
    prodotti = JSON.parse(stringaProdotti);
    let container = document.getElementById('container');
    
    for( let i = 0; i < prodotti.length; i++){
        let card = document.createElement('div');
        card.className = 'card';
      
        let contenuto = document.createElement('div');
        contenuto.className = 'text-center';
        contenuto.innerText = prodotti[i].numero + '\n' + prodotti[i].euroRicarica + '€';
        let contenitoreBtn = document.createElement('div');
        let btn = document.createElement('button');
        btn.addEventListener('click',function(){
            let oggetto ={
                numero:prodotti[i].numero,
                euroRicarica:prodotti[i].euroRicarica
            }
            carrello.push(oggetto);
            let stringaCarrello = JSON.stringify(carrello);
            localStorage.setItem('carrello',stringaCarrello);


        })
        btn.className = 'btn btn-danger';
        btn.innerText = 'Aggiungi';
        contenitoreBtn.appendChild(btn);
        card.appendChild(contenuto);
        card.appendChild(contenitoreBtn);
        container.appendChild(card);

    }

})