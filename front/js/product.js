// Afficher l'ID lié à l'URL
const queryString_url_id = window.location.search

//Afficher uniquement le n° d'ID
const idSeul = queryString_url_id.slice(4)

//Importer la data du produit visé
const dataProduit = fetch(`http://localhost:3000/api/products/${idSeul}`)

//Afficher la data
dataProduit.then(async (reponseData) => {
    let produit = await reponseData.json()

    //Injecter la data
    document.querySelector('.item__img').innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`
    document.querySelector('#title').innerHTML =`${produit.name}`
    document.querySelector('#price').innerHTML =`${produit.price}`
    document.querySelector('#description').innerHTML =`${produit.description}`
    let options = '';
    options += `<option value="">--SVP, choisissez une couleur --</option>`;

    //Boucle pour rechercher les couleurs
    for (let i = 0; i < produit.colors.length; i++) {
            let color = produit.colors[i];
            options += `<option value="${color}">${color}</option>`;
    }
    document.querySelector('#colors').innerHTML = options;
})


//Gestion du panier
let contenuLocalStorage = localStorage.getItem('panier') || '[]';
let panier = JSON.parse(contenuLocalStorage);

//Actions lors du clic sur le bouton
let panierBtn = document.querySelector("#addToCart");
panierBtn.addEventListener("click", ajoutPanier =>{

    //Bouton panier & Panier
        let produit = {
            id:"",
            couleur:"",
            quantite: 0, 
        };

        //Récupération couleur
        let couleurOk = document.querySelector("#colors")
        let choixCouleur = couleurOk.value;
            console.log("Couleur : " + choixCouleur);

        //Récupération quantité
        let nombreOk = document.querySelector("#quantity");
        let choixNombre = nombreOk.value;
            console.log(nombreOk);

        //Alerte couleur vide
        if (choixCouleur == ""){
            alert("Veuillez choisir une couleur");
        }
        //Alerte qtité vide
        if (choixNombre == 0){
            alert("Veuillez choisir une quantité");
        }
        //Si tout est ok
        if(choixCouleur != "" && choixNombre != 0){

            //On injecte les données du produit
            produit.id = idSeul;
            produit.couleur = choixCouleur;
            produit.quantite = parseInt(choixNombre);

             // Condition pour le push
            if (produitDejaPresent(produit)) {
                ajouterQuantiteAuProduit(produit);
            } else {
                panier.push(produit);
            }
        
            console.log(panier);

            //Sauvegarde dans le localstorage en json
            localStorage.setItem('panier', JSON.stringify(panier));
    }
})

//Fonction pour vérifier si le produit est présent dans le panier
function produitDejaPresent(produit) {
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id === produit.id && panier[i].couleur === produit.couleur) {
            return true;
        }
    }
    return false;
}

// Fonction pour ajouter la quantité d'un produit déjà présent dans le panier
function ajouterQuantiteAuProduit(produit) {
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id === produit.id && panier[i].couleur === produit.couleur) {
            panier[i].quantite += produit.quantite;
                break;
        }
    }
}