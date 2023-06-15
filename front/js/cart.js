//Recuperer le panier dans localstorage
let panierJson = localStorage.getItem('panier');
let panier = JSON.parse(panierJson);
console.log(panier);

//Création d'une boucle pour recuperer les différents id
for(let i = 0; i < panier.length; ++i){
    let idFetch = panier[i].id;

    const dataProduit = fetch(`http://localhost:3000/api/products/${idFetch}`)

    //Recuperer les infos de chaque produit et les transformer en json
    dataProduit.then(async (reponseData) => {
        let produit = await reponseData.json()

        //Rechercher les infos des produits un par un
            let panierId = panier[i].id;
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

            //----- MAJ DES QTITÉS ET PRIX -----

            //Cible les inputs et ecoute avec les changements avec "change"
            let lesInputs = document.querySelectorAll(".itemQuantity");
            lesInputs.forEach(input => {
                input.addEventListener('change', event => {
                    
                //---- MAJ DU PRIX ----

                    //Localiser l'input rempli
                    let source = event.target;
                    console.log(source);
                    
                    //Utiliser les parents de l'input pour remonter aux infos prix
                    let parent1 = input.closest('.cart__item__content__settings');
                    console.log(parent1);
                    let parent2 = parent1.previousElementSibling;
                    console.log(parent2);
                    let pElements = parent2.querySelectorAll('p');
                    console.log(pElements);

                    // Récupérer la valeur actuelle de l'input
                    let nvlleInput = source.value;
                    console.log(nvlleInput);

                    //MAJ de la variable prix
                    panierQuantite = nvlleInput;
                    newPrice = produit.price * panierQuantite;
                    console.log(newPrice);

                    //Modifier l'ancien prix par le nouveau
                    let prixRemplace = pElements[1];
                    prixRemplace.textContent = newPrice;
                    console.log(prixRemplace);

                    console.log(panier);

                //-----MAJ DE LA QTITÉ-----
                    
                    //Localiser le bon id
                    let parentId = input.closest('.cart__item').getAttribute('data-id').toString();
                    console.log(parentId);

                    // Parcourir le tableau et modifier la quantité
                    for (let j = 0; j < panier.length; ++j) {
                        if (panier[j].id === parentId) {
                        panier[j].quantite = nvlleInput;
                        break;
                        }
                        console.log(panier);
                    }

                    //MAJ du localstorage
                    localStorage.setItem("panier", JSON.stringify(panier));

                    // Rafraîchir la page
                    location.reload();
                });
            });
            
            //----- BOUTTON SUPPRIMER -----
            let suppBouton = document.querySelectorAll('.deleteItem');
            
            //Selection de l'ensemble des boutons supprimer
            suppBouton.forEach((button) => {
                button.addEventListener('click', () => {
                    
                    //Localiser le bon id
                    let parentId = button.closest('.cart__item').getAttribute('data-id');
                    console.log(parentId);
                    
                    // Recherche de l'index de la ligne à supprimer
                    let indexSupp = null;

                    for (let k = 0; k < panier.length; ++k) {
                        if (panier[k].id === parentId) {
                        indexSupp = k;
                        break;
                        }
                        console.log(indexSupp);
                    }

                    // Vérification si l'index est valide (null si non trouvé)
                    if (indexSupp !== null) {
                        panier.splice(indexSupp, 1);
                        console.log(panier);

                        // Mettre à jour le panier dans le stockage localStorage
                        localStorage.setItem('panier', JSON.stringify(panier));

                        // Rafraîchir la page
                        location.reload();
                    }
                });
            });
    }
    )
}
