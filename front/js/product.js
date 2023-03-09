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
//Ajout panier
let panierBtn = document.querySelector("#addToCart");
panierBtn.addEventListener("click", ajoutPanier =>{

    //Couleur
    let couleurOk = document.querySelector("#colors")
    let choixCouleur = couleurOk.value;
        console.log("Couleur : " + choixCouleur);

    //Quantité
    let nombreOk = document.querySelector("#quantity");
    let choixNombre = nombreOk.value;
        console.log("Nombre : " + choixNombre);

    //Bouton panier & Panier
    let panier = []
    if (choixCouleur == ""){
        alert("Veuillez choisir une couleur");
    }
    if (choixNombre == 0){
        alert("Veuillez choisir une quantité");
    }
    if(choixCouleur != "" && choixNombre != 0){

    }
    //if (panier.length == 0){
            //alert("Votre panier est vide");
    //}

})
a