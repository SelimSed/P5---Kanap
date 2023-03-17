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

let panier = []

//Ajout panier
let panierBtn = document.querySelector("#addToCart");
panierBtn.addEventListener("click", ajoutPanier =>{

    //Bouton panier & Panier
        let produit = {
            id:"",
            couleur:"",
            quantite: "", 
        };
        panier.push(produit);

        //Récupération couleur
        let couleurOk = document.querySelector("#colors")
        let choixCouleur = couleurOk.value;
            console.log("Couleur : " + choixCouleur);

        //Récupération quantité
        let nombreOk = document.querySelector("#quantity");
        let choixNombre = nombreOk.value;
            console.log("Nombre : " + choixNombre);

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
            produit.quantite = choixNombre;
        
            console.log(panier);

            //Sauvegarde dans le localstorage en json
            localStorage.setItem('panier', JSON.stringify(panier));
    }
})


            //Création d'une condition pour fusionner les produits similaires
            // Vérifiez s'il existe déjà un produit avec le même ID dans le panier
            //if (panier["produit"] && panier["produit"].id == produit.id) {
            //    panier["produit"].quantite++;
            //} 
            // Sinon, créez un nouveau produit en ajoutant 1 au numéro du produit
            //else {
            //  panier["produit"] = produit;
            //}