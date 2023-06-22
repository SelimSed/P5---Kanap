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

            //-----TOTAL-----
            let totalPrix = 0;
            let totalQuantite = 0;

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

                    let couleurInput = pElements[0].textContent;

                    console.log(couleurInput);
                    console.log(typeof couleurInput);


                    //Modifier l'ancien prix par le nouveau
                    let prixRemplace = pElements[1];
                    prixRemplace.textContent = newPrice;
                    console.log(prixRemplace);
                    
                //-----MAJ DE LA QTITÉ-----
                    
                    //Localiser le bon id
                    let parentId = input.closest('.cart__item').getAttribute('data-id').toString();
                    
                    console.log(panier);
                    console.log(parentId);
                    console.log(couleurInput);

                    //Parcourir le tableau et localiser l'index à modifier
                    let j = panier.findIndex(element => element.id == parentId && element.couleur == couleurInput);
                    console.log(j);
                    //Modifier la quantité localisée
                    if (j !== -1) {
                        panier[j].quantite = nvlleInput;
                      }

                    console.log(panier);

                    //MAJ du localstorage
                    localStorage.setItem("panier", JSON.stringify(panier));

                    // Rafraîchir la page
                    //location.reload();
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

//-----FORMULAIRE & TABLEAU PRODUIT POUR REQUETE POST-----

let contact = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: ''
};

let products = [];

//Pattern PRENOM
let prenomPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
let prenomInput = document.getElementById('firstName');
let prenomError = document.getElementById('firstNameErrorMsg');

prenomInput.addEventListener('change', () => {
    let prenomValue = prenomInput.value;

    if (prenomPattern.test(prenomValue)) {
        prenomError.textContent = '';
        contact.firstName = prenomValue;
    } else {
        prenomError.textContent = 'Prénom invalide';
    }
    console.log(contact);
});

//Pattern NOM
let nomPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
let nomInput = document.getElementById('lastName');
let nomError = document.getElementById('lastNameErrorMsg');

nomInput.addEventListener('change', () => {
    let nomValue = nomInput.value;

    if (nomPattern.test(nomValue)) {
        nomError.textContent = '';
        contact.lastName = nomValue;
    } else {
        nomError.textContent = 'Nom invalide';
    }
    console.log(contact);
});

//Pattern ADRESSE
let adressePattern = /^(?:\d{1,3})\s[A-Za-z0-9\s\-.'\u00C0-\u017F]{1,100}$/;
let adresseInput = document.getElementById('address');
let adresseError = document.getElementById('addressErrorMsg');

adresseInput.addEventListener('change', () => {
    let adresseValue = adresseInput.value;

    if (adressePattern.test(adresseValue)) {
        adresseError.textContent = '';
        contact.address = adresseValue;
    } else {
        adresseError.textContent = 'Adresse invalide';
    }
    console.log(contact);
});

//Pattern VILLE
let villePattern = /^[A-Za-z\u00C0-\u017F\s\-']+$/;
let villeInput = document.getElementById('city');
let villeError = document.getElementById('cityErrorMsg');

villeInput.addEventListener('change', () => {
    let villeValue = villeInput.value;

    if (villePattern.test(villeValue)) {
        villeError.textContent = '';
        contact.city = villeValue;
    } else {
        villeError.textContent = 'Ville invalide';
    }
    console.log(contact);
});

//Pattern EMAIL
let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let emailInput = document.getElementById('email');
let emailError = document.getElementById('emailErrorMsg');

emailInput.addEventListener('change', () => {
    let emailValue = emailInput.value;

    if (emailPattern.test(emailValue)) {
        emailError.textContent = '';
        contact.email = emailValue;
    } else {
        emailError.textContent = 'Email invalide';
    }
    console.log(contact);
    });

    //Bouton COMMANDER
    let orderButton = document.getElementById('order');

    orderButton.addEventListener('click', event => {
    let toutEstOK = true;

    //Si les champs sont remplis
    let cleInputs = ['firstName', 'lastName', 'address', 'city', 'email'];
    for (let idInput of cleInputs) {
    let input = document.getElementById(idInput);
        if (input.value === '') {
            toutEstOK = false;
            break;
        }
    }

    //Si il n'y a pas d'erreurs
    let erreurEnsembleMessages = document.querySelectorAll('.error-message');
    for (let erreurMessage of erreurEnsembleMessages) {
        if (erreurMessage.textContent !== '') {
            toutEstOK = false;
            break;
        }
    }

    //Ajout des id dans le tableau products
    if (toutEstOK) {
        panier.forEach((element) => {
            products.push(element.id.toString());
        });
      }
    console.log(products);


    //REQUETE POST
    if (toutEstOK) {
        event.preventDefault(); //A SUPPRIMER APRES TEST -- BLOQUE LE REFRESH DE LA PAGE

        //Parametre de la requete POST
        fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },

            //Contenu de la requete POST
            body: JSON.stringify({contact, products})
        })

        //Conversion de la reponse en json
        .then(response => response.json())
            .then(data => {
                console.log(data);
                //Récupération de l'identifiant de commande via réponse de l'API
                let orderId = data.orderId;
                console.log(orderId);
                //Redirection vers la page de confirmation avec l'identifiant de commande
                window.location.href = `/front/html/confirmation.html?commande=${orderId}`;
            })
            .catch(error => {
                console.error('Erreur lors de la requête', error);
        });
    } 
    else {
        alert('Veuillez remplir tous les champs correctement.');
    }
});