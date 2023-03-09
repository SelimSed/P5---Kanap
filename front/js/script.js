fetch("http://localhost:3000/api/products")     //Connecter l'API.
    .then(reponse => reponse.json())            //Si il y a une réponse, convertir le fichier en json
        .then(api => {

            for(let data of api){
                console.log(data)

                document.querySelector('#items').innerHTML +=
                    `<a href="./product.html?id=${data._id}">
                    <article>
                        <img src="${data.imageUrl}" alt="${data.altTxt}">
                        <h3 class="productName">${data.name}</h3>
                        <p class="productDescription">${data.description}</p>
                    </article>
                    </a>`
            }
        }
    )

    .catch(erreur => console.log(erreur));      //En cas d'erreur afficher l'erreur dans la console
