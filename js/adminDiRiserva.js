/* fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
    headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2JmMmMwNTgzNTAwMTg1MjMwZGMiLCJpYXQiOjE3MDIzNzg0ODIsImV4cCI6MTcwMzU4ODA4Mn0.xal6NOPoOpqLUGLqqYBtsozU7pnoqP1fSguhoh99GqA"
    }
    }) */
    let urlAPI = "https://striveschool-api.herokuapp.com/api/product/";
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2JmMmMwNTgzNTAwMTg1MjMwZGMiLCJpYXQiOjE3MDIzNzg0ODIsImV4cCI6MTcwMzU4ODA4Mn0.xal6NOPoOpqLUGLqqYBtsozU7pnoqP1fSguhoh99GqA"
    
    let arrayProdotti=[];
    
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2JmMmMwNTgzNTAwMTg1MjMwZGMiLCJpYXQiOjE3MDIzNzg0ODIsImV4cCI6MTcwMzU4ODA4Mn0.xal6NOPoOpqLUGLqqYBtsozU7pnoqP1fSguhoh99GqA'
            }
        })
            .then(response => response.json())
            .then(json => {console.log(json)
                            arrayProdotti=json})
            .catch(error => console.log(error))
    console.log(arrayProdotti);
    
    class Prodotto {
    
        static arrayNomi = [];
    
        constructor(nome, descrizione, brand, url, prezzo) {
            console.log(arguments);
            if (controlla(nome)) {        //A quanto pare l'API non accetta due oggetti con lo stesso nome
                this.name = nome;
                this.description = descrizione;
                this.brand = brand;
                this.imageUrl = url;
                this.price = prezzo;
                Prodotto.arrayNomi.push(nome);
                console.log(Prodotto.arrayNomi);
            } else {
                console.log("object");
                throw new Error("Nome prodotto già esistente");
            }
            function controlla(nome) {
                console.log(nome);
                for (const ele of Prodotto.arrayNomi) {
                    if (ele == nome) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    
    /* let ciao = new Prodotto("casa", "descrizione", "brand", "url", "prezzo", "valuta");
    let prodotto1 = new Prodotto("meme", "descrizione", "brand", "url", "prezzo", "valuta");
    
    console.log(prodotto1); */
    
    
    /* function mettiElementi() {
        fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2JmMmMwNTgzNTAwMTg1MjMwZGMiLCJpYXQiOjE3MDIzNzg0ODIsImV4cCI6MTcwMzU4ODA4Mn0.xal6NOPoOpqLUGLqqYBtsozU7pnoqP1fSguhoh99GqA'
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.log(error))
    } */
    function mettiForm() {
        let main = document.querySelector("main");
        main.innerHTML = `  
        <form class="row g-3" onsubmit="event.preventDefault()">
        <div class="col-md-4">
          <label for="nome" class="form-label">Nome oggetto</label>
          <input type="text" class="form-control " id="nome" required>
          <p class="p-0 pt-1 ms-2 text-danger visually-hidden" id="nomePreso">* Nome già assegnato, inserire un altro nome.</p>
        </div>
        <div class="col-md-4">
          <label for="descrizione" class="form-label">Descrizione oggetto</label>
          <textarea class="form-control" id="descrizione" aria-label="With textarea" required></textarea>          
        </div>
        <div class="col-md-4">
          <label for="brand" class="form-label">Brand oggetto</label>
          <input type="text" class="form-control" id="brand" required>
        </div>
        <div class="col-md-3">
          <label for="url" class="form-label">Url immagine</label>
          <input type="url" class="form-control" id="url" required>
          </select>
        </div>
        <div class="col-md-3">
          <label for="prezzo" class="form-label">Prezzo</label>
            <input type="number" class="form-control" id="prezzo" required>    
        </div>    
        <div class="col-12">
          <input class="btn btn-secondary" type="reset" value="Reset">
          <button class="btn btn-primary" type="submit" onclick="aggiungiElemento()">Conferma</button>
        </div>
      </form> 
        `
    }
    
    function aggiungiElemento() {
        document.querySelector("#nomePreso").classList.add("visually-hidden");
        document.querySelector("#nome").classList.remove("border", "border-danger");
        let nome = document.querySelector("#nome").value;
        let descrizione = document.querySelector("#descrizione").value;
        let brand = document.querySelector("#brand").value;
        let url = document.querySelector("#url").value;
        let prezzo = document.querySelector("#prezzo").value;
        let modelloUrl = /^(ftp|http|https):\/\/[^ "]+$/;
        console.log(modelloUrl.test(url));
        if (modelloUrl.test(url)) {
            try {
                if (nome && descrizione && brand && prezzo) {
                    let prodotto = new Prodotto(nome, descrizione, brand, url, prezzo);
                    console.log(prodotto);
                    aggiungi(prodotto);
                }
            } catch (error) {
                document.querySelector("#nomePreso").classList.remove("visually-hidden");
                document.querySelector("#nome").classList.add("border", "border-danger");
            }
    
        }
    }
    /* {
        "name": "Completo elegante",
        "descrizione": "Un completo adatto ad ogni occasione",
        "brand": "Armanicomio",
        "url": "https://www.dhresource.com/webp/m/0x0/f2/albu/g18/M00/77/45/rBVapGIZ37yAfEVOAAQbdbMEqEc785.jpg",
        "prezzo": "99 $"
    } */
    function aggiungi(prodotto) {
        fetch(urlAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(prodotto),
        })
            .then(response => response.json())
            .then(data =>{ console.log(data)})
            .catch(error => console.error("Errore:", error));
    
    }
    
    
    /* document.addEventListener("DOMContentLoaded", () => {
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    })
     */