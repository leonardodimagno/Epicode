$(document).ready( main );

function main()
{   
    preparaSchema();
}

function preparaSchema()
{         
    
    let immagini = ['amare.png','amare.png','amare1.png','amare1.png',
                     'arrabbiato.png','arrabbiato.png','bello.png','bello.png',                                   
                    'piangere.png','piangere.png','ridere.png' ,'ridere.png',
                  'shock.png','shock.png','spavento.png','spavento.png'];
    crea_e_mischia_immagini();

    for (let i=0; i<16; i++)
    {
      
        let src_immagine = " src='img/" + immagini[i] + "'";
        let img = "<img " + src_immagine +  "/>";
        
        let id_div = "id= 'div" + i + "'";
        let stato_div = " stato = 'coperta'";

        $("#struttura").append("<div " + id_div + 
                               stato_div + " class='carta'>" + img + "</div>");
    }

   
    $("div>img").slideToggle();

  
    let conta_carte = 16;            
    let id_prima_carta = "nessuna";

    $("#struttura>div").on("click", voltaCarta);

    function voltaCarta()
    {
      let questa_carta = "#"+this.id;          
      let prima_carta = "#"+id_prima_carta;

 
      if ($(questa_carta).attr("stato") === "indovinata"
          || prima_carta===questa_carta
      )
      {return;}
      
      $(questa_carta+">img").slideToggle(200).delay(120); 
      
      if (id_prima_carta==="nessuna") 
      {            
       
        id_prima_carta = this.id;
      }
      else 
      {           
       
        if ( $(questa_carta+">img").attr("src") ===
              $(prima_carta+">img").attr("src") )
        {
         
          $(questa_carta).attr("stato", "indovinata");
          $(prima_carta).attr("stato", "indovinata");

          
          id_prima_carta = "nessuna";

          conta_carte -= 2;
          if (conta_carte === 0)
          {
            $("#vittoria").css('visibility', 'visible');
          }


        }
        else            
        {
          
          $(prima_carta+">img").slideToggle(200).delay(120);
          $(questa_carta+">img").slideToggle(200);

          $(questa_carta).attr("stato", "coperta"); 
          $(prima_carta).attr("stato", "coperta"); 

          id_prima_carta = "nessuna";
        }
      }
    }

     function crea_e_mischia_immagini()
    {
      for (let i=1; i<=8; i++)
      { 
        immagini.push("img"+i+".jpg");
        immagini.push("img"+i+".jpg");
      }

     
      for (let i=0; i<100; i++)
      {
        let pos_carta1 = Math.trunc( Math.random() * 16);
        let pos_carta2 = Math.trunc( Math.random() * 16);

      
        if (pos_carta1 !== pos_carta2)
            {
          let temp = immagini[pos_carta1];
          immagini[pos_carta1] = immagini[pos_carta2];
          immagini[pos_carta2] = temp;  
        }
      }
    }            
}