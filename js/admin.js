/* fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
    headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2JmMmMwNTgzNTAwMTg1MjMwZGMiLCJpYXQiOjE3MDIzNzg0ODIsImV4cCI6MTcwMzU4ODA4Mn0.xal6NOPoOpqLUGLqqYBtsozU7pnoqP1fSguhoh99GqA"
    }
    }) */

class Prodotto{

    static arrayId=[];

    constructor(nome, descrizione, brand, url, prezzo, valuta){
        this.nome=nome;
        this.descrizione=descrizione;
        this.brand=brand;
        this.url=url;
        this.prezzo=`${prezzo} ${valuta}`;        
        this.id=generaIDprodotto();
        this.userId=generaID();        
        this.createdAt = new Date().toISOString();
        this.updateAt = new Date().toISOString();

        function generaID() {
            let alfaNumeri = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let id="";
            for (let i = 0; i < 24; i++) {
                id += alfaNumeri.charAt(Math.floor(Math.random() * alfaNumeri.length));
              }
            return id
        }

        function generaIDprodotto() {
            let id="";
            let idDiverso=false;
            
            while(idUguale){
                id=generaID();
                idUguale=false;
                for (const ele of arrayId) {
                    if(ele==id){
                        idUguale=true;
                        id="";
                        break
                    }
                }
    
            }
            arrayId.push(id);
            return id
        }



    }





}
function mettiElementi(){
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'GET', 
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2JmMmMwNTgzNTAwMTg1MjMwZGMiLCJpYXQiOjE3MDIzNzg0ODIsImV4cCI6MTcwMzU4ODA4Mn0.xal6NOPoOpqLUGLqqYBtsozU7pnoqP1fSguhoh99GqA'
        }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error))
}
function mettiForm() {
    let main = document.querySelector("main");
    main.innerHTML=`                    
    `
}

function aggiungiElemento() {
    let nome = document.querySelector("#nome").value;
    let descrizione = document.querySelector("#descrizione").value;
    let brand = document.querySelector("#brand").value;
    let url = document.querySelector("#url").value;
    let prezzo = document.querySelector("#prezzo").value;
    let valuta = document.querySelector("#valuta").value;
    if(nome && descrizione && brand && url && prezzo){
        console.log("okokok");
    }
}



document.addEventListener("DOMContentLoaded",()=>{

    
    






    







})
    