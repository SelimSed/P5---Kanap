//Recuperer le panier dans localstorage
let panierJson = localStorage.getItem('panier');
let panier = JSON.parse(panierJson);
console.log(panier);

//Création d'une boucle pour recuperer les produits du fetch
for(i = 0; i < panier.length; i++){

    //Recuperer les autres infos du produit
    const dataProduit = fetch(`http://localhost:3000/api/products/${panier[i].id}`)
    dataProduit.then(async (reponseData) => {
        let produit = await reponseData.json()
        console.log(produit);

        let arrayProduit = [];
        arrayProduit.push(produit);
        console.log(arrayProduit);

    //Boucle pour rechercher les infos des produits un par un
    for (let a = 0; a < panier.length; a++) {
        let panierId = panier[a].id;
        let panierColor = panier[a].couleur;
        let panierQuantite = panier[a].quantite;
        let imageUrl = produit[a].imageUrl;
        let altTxt = produit[a].altTxt;
        let productName = produit[a].name;
        let price = produit[a].price;

        let panierComplet = ""
        panierComplet += 
        `<article class="cart__item" data-id="${panierId}" data-color="${panierColor}">
        <div class="cart__item__img">
        <img src="${imageUrl}" alt="${altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${productName}</h2>
            <p>${panierColor}</p>
            <p>${price}</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panierQuantite}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
        </article>`;
    
        //Injecter les données
        console.log(panierComplet);
        document.querySelector('#cart__items').innerHTML = panierComplet
    }
    }
    )
}
