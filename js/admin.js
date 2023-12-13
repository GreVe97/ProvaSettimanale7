/* fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
    headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2JmMmMwNTgzNTAwMTg1MjMwZGMiLCJpYXQiOjE3MDIzNzg0ODIsImV4cCI6MTcwMzU4ODA4Mn0.xal6NOPoOpqLUGLqqYBtsozU7pnoqP1fSguhoh99GqA"
    }
    }) */
let urlAPI = "https://striveschool-api.herokuapp.com/api/product/";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2JmMmMwNTgzNTAwMTg1MjMwZGMiLCJpYXQiOjE3MDIzNzg0ODIsImV4cCI6MTcwMzU4ODA4Mn0.xal6NOPoOpqLUGLqqYBtsozU7pnoqP1fSguhoh99GqA"

let arrayProdotti = [];
memorizzoProdottiDaAPI();


function memorizzoProdottiDaAPI() {
    fetch(urlAPI, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(json => {
            arrayProdotti = json;
            console.log(arrayProdotti);
        })
        .catch(error => console.log(error))    
}



function creaProdotto(nome, descrizione, brand, url, prezzo) {
    if (controlla(nome)){
        let prodotto={};
        prodotto.name=nome;
        prodotto.description=descrizione;
        prodotto.brand=brand;
        prodotto.imageUrl=url;
        prodotto.price=prezzo;
        return prodotto;
    }else{
        throw new Error("Nome prodotto già esistente");
    }
}
function controlla(nome) {
    for (const ele of arrayProdotti) {
        if (ele.name == nome) {
            return false;
        }
    }
    return true;
}


function mettiElementi() {
    let div = document.querySelector("#oggetti");
    div.innerHTML = "";
    div.classList.add("presente");
    arrayProdotti.forEach(ele => {
        div.innerHTML += `<div>
                            <div class="card d-flex align-items" style="width: 18rem; height: 99%">
                                        <img src="${ele.imageUrl}" class="card-img-top" alt="Copertina">
                                        <div class="card-body d-flex flex-column justify-content-between">
                                            <div class="">
                                                <h5 class="card-title">${ele.name}</h5>
                                                <span class="badge rounded-pill text-bg-dark">${ele.brand}</span>
                                                <p class="card-text">${ele.description}</p>
                                            </div>
                                            <div>
                                                <p class="card-text"><span class="prezzo">${ele.price}</span>€</p>
                                                <button class="btn btn-primary" onclick="modificaProdotto(event,'${ele.name}')">Modifica</button>
                                                <button class="btn btn-danger">Elimina</button>
                                            </div>
                                        </div>
                            </div>
                        </div>`
    });

}

function modificaProdotto(e, nome) {
    console.log(nome);
    let card = e.target.closest("div .card");
    let prodotto = arrayProdotti.find(ele => ele.name == nome);
    console.log(prodotto);
    console.log(prodotto.controlla("ciao"));
    console.log(prodotto);
    console.log(arrayProdotti);
    let oldHTML = card.innerHTML;

    card.innerHTML = `
                     <form class="" onsubmit="event.preventDefault()">                    
                    <label  class="form-label ms-3 mt-2 mb-0 fw-semibold">Nuovo url immagine</label>
                    <input type="url" class="form-control mb-3 url"  value="${prodotto.imageUrl}" required>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div class="">
                            <div class="card-title">
                            <label class="form-label ms-2 mb-0 fw-semibold">Nuovo nome</label>
                            <input type="text" class="form-control mb-0 nome" value="${prodotto.name}" required>
                            <p class="p-0 pt-1 ms-2 text-danger invisible" >*Nome già assegnato, inserire un altro nome.</p>
                            </div> 
                            <label class="form-label ms-2 mb-0 fw-semibold">Nuovo Brand</label>
                            <input type="text" class="form-control mb-3 brand" value="${prodotto.brand}" required>                           
                            
                            <label class="form-label card-text ms-2 mb-0 fw-semibold">Nuova Descrizione</label>
                            <textarea class="form-control card-text mb-3 descrizione"  aria-label="With textarea " value="" required>${prodotto.description}</textarea>                            
                        </div>
                        <div>
                            <label class="form-label ms-2 mb-0 fw-semibold">Nuovo Prezzo</label>
                            <input type="number" class="form-control mb-3 prezzo" value="${prodotto.price}" required> 
                            <button type="submit" class="btn btn-primary" onclick="modifica(event)">Conferma</button>
                            <button class="btn btn-danger" id="annulla" onclick="" > Annulla</button>
                        </div>
                    </div>
                    </form> `

    console.log(oldHTML);
    card.querySelector("#annulla").addEventListener("click", (e) => {
        indietro(e.target, oldHTML)
    })
}

function indietro(e, html) {
    let card = e.closest(".card");
    console.log(card.innerHTML);
    console.log(card);
    card.innerHTML = html;
}

function modifica(e) {
    let card =e.target.closest(".card");
    card.querySelector("p").classList.add("invisible");
    card.querySelector(".nome").classList.remove("border", "border-danger");
    let nome = card.querySelector(".nome").value.trim();
    let descrizione = card.querySelector(".descrizione").value.trim();
    let brand = card.querySelector(".brand").value.trim();
    let url = card.querySelector(".url").value.trim();
    let prezzo = card.querySelector(".prezzo").value;
    let modelloUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    console.log(modelloUrl.test(url));
    if (modelloUrl.test(url)) {
        try {
            if (nome && descrizione && brand && prezzo) {
                fetch(urlAPI+"657987ea26761400183c486d", {
                    method: "PUT",
                    body: JSON.stringify({
                        name: nome,
                        description: descrizione,
                        brand: brand,
                        imageUrl: url,
                        price: prezzo,
                    }), 
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
            }
        } catch (error) {
            card.querySelector("p").classList.remove("invisible");
            card.querySelector(".nome").classList.add("border", "border-danger");
        }

    }


   

}




function mettiForm() {
    let div = document.querySelector("#form");
    div.innerHTML = `  
    <form class="row g-3" onsubmit="event.preventDefault()">
    <div class="col-md-4">
      <label for="nome" class="form-label">Nome oggetto</label>
      <input type="text" class="form-control " id="nome" required>
      <p class="p-0 pt-1 ms-2 text-danger invisible" id="nomePreso">* Nome già assegnato, inserire un altro nome.</p>
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
    document.querySelector("#nomePreso").classList.add("invisible");
    document.querySelector("#nome").classList.remove("border", "border-danger");
    let nome = document.querySelector("#nome").value.trim();
    let descrizione = document.querySelector("#descrizione").value.trim();
    let brand = document.querySelector("#brand").value.trim();
    let url = document.querySelector("#url").value.trim();
    let prezzo = document.querySelector("#prezzo").value;
    let modelloUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    console.log(modelloUrl.test(url));
    if (modelloUrl.test(url)) {
        try {
            if (nome && descrizione && brand && prezzo) {
                let prodotto = creaProdotto(nome, descrizione, brand, url, prezzo)
                console.log(prodotto);
                aggiungi(prodotto);
            }
        } catch (error) {
            document.querySelector("#nomePreso").classList.remove("invisible");
            document.querySelector("#nome").classList.add("border", "border-danger");
        }

    }
}

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
        .then(data => {
            console.log(data)
            memorizzoProdottiDaAPI();
        })
        .catch(error => console.error("Errore:", error));

}


