//Recuperer le panier dans localstorage
let panierJson = localStorage.getItem('panier');
let panier = JSON.parse(panierJson);
console.log(panier);

//Création d'une boucle pour recuperer les différents id
for(let i = 0; i < panier.length; i++){
    let idFetch = panier[i].id;

    const dataProduit = fetch(`http://localhost:3000/api/products/${idFetch}`)

    //Recuperer les infos de chaque produit et les transformer en json
    dataProduit.then(async (reponseData) => {
        let produit = await reponseData.json()

        //Rechercher les infos des produits un par un
            let panierId = panier[i].id;
            console.log(panierId);
            let panierColor = panier[i].couleur;
            let panierQuantite = panier[i].quantite;
            let imageUrl = produit.imageUrl;
            let altTxt = produit.altTxt;
            let productName = produit.name;
            let price = produit.price * panierQuantite;

            let panierComplet = ""
            panierComplet = 
            `<article class="cart__item" data-id="${panierId}" data-color="${panierColor}">
            <div class="cart__item__img">
            <img src="${imageUrl}" alt="${altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${productName}</h2>
                <p>${panierColor}</p>
                <p>${price} €</p>
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
            document.querySelector('#cart__items').innerHTML += panierComplet

            //MAJ des quantités
            let inputQuantite = document.querySelector(".itemQuantity");
            inputQuantite.addEventListener('change', function() {

                // Récupérer la valeur actuelle de l'input
                let nvlleInput = inputQuantite.value;
                inputQuantite.value = parseInt(nvlleInput);
                console.log(nvlleInput);

                //MAJ des variables
                panierQuantite = nvlleInput;
                price = produit.price * panierQuantite;
                console.log(price);
                
                //Localiser le bloc
                let article = (document.querySelector('[data-id ="'+ panierId +'"]'));

                //let element = document.getElementById('.cart__item__content__description');
                //console.log(element);
                //let closestElement = element.closest('div');
                //console.log(closestElement);

                //Afficher les données
                article.querySelector('.cart__item__content__description').innerHTML =
                `<h2>${productName}</h2>
                <p>${panierColor}</p>
                <p>${price} €</p>`
            });

            //Bouton supprimer
            let suppBouton = document.querySelectorAll('.deleteItem');
            
            //Selection de l'ensemble des boutons supprimer
            suppBouton.forEach((button) => {
                button.addEventListener('click', () => {
                    
                    //Localiser le bon id
                    let parentElement = button.closest('.cart__item').getAttribute('data-id');
                    console.log(parentElement);
                    
                    // Recherche de l'index de la ligne à supprimer
                    let indexSupp = -1;

                    for (let a = 0; a < panier.length; a++) {
                        if (panier[a].id === parentElement) {
                        indexSupp = a;
                        break;
                        }
                        console.log(indexSupp);
                    }

                    // Vérification si l'index est valide (-1 si non trouvé)
                    if (indexSupp !== -1) {
                        panier.splice(indexSupp, 1);
                        console.log(panier);

                        // Mettre à jour le panier dans le stockage local (localStorage) si nécessaire
                        localStorage.setItem('panier', JSON.stringify(panier));

                        // Rafraîchir la page ou effectuer d'autres actions nécessaires
                        location.reload();
                    }
                });
            });
            console.log('FIN');
    }
    )
}
