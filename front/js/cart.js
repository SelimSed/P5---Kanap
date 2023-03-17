//Recuperer le panier dans localstorage
let panierJson = localStorage.getItem('panier');
let panier = JSON.parse(panierJson);
console.log(panier);

//Recuperer les autres infos du produit
const dataProduit = fetch(`http://localhost:3000/api/products/${panier.id}`)
dataProduit.then(async (reponseData) => {
    let produit = await reponseData.json()
    console.log(produit);

//Création d'une boucle pour injecter les données produit par produit


//Injecter les données
document.querySelector('#cart__items').innerHTML +=
`<article class="cart__item" data-id="${panier.id}" data-color="${panier.couleur}">
<div class="cart__item__img">
  <img src="${produit.imageUrl}" alt="${produit.altTxt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${produit.name}</h2>
    <p>${panier.couleur}</p>
    <p>${produit.price}</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier.quantite}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`
})