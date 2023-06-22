// Récupère l'ordreId de l'URL
let urlOrderId = window.location.search
//Cut des caractères inutiles
let orderId = urlOrderId.slice(10)
console.log(orderId);

// Mettre le n° de commande dans le code HTML
document.getElementById('orderId').textContent = orderId;

// Vide le localStorage
//window.localStorage.clear();