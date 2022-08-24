//------------------------------------------------------
// fonction du panier
//------------------------------------------------------
function getPanier() {
    let panier = localStorage.getItem("panier")
    if(panier == null) {
        return []
    
    } else {
        return JSON.parse(panier)
    }
    
}

let productLocalStorage = getPanier()
let section = document.querySelector("#cart__items")
//------------------------------------------------------
// fonction pour la cration du panier
//------------------------------------------------------

    // Création de la balise "article" 
function product(canape, quantiteValue, colorValue) {
    let productArticle = document.createElement("article");
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", canape._id)
    productArticle.setAttribute("data-color", colorValue)

    section.appendChild(productArticle)

     // Insertion de l'élément "div" pour l'image produit
    let productDivImg = document.createElement("div");
    productDivImg.className = "cart__item__img"
    productArticle.appendChild(productDivImg);

    // Insertion de l'image
    let productImg = document.createElement("img");
    productImg.src = canape.imageUrl
    productImg.alt = canape.altTxt
    productDivImg.appendChild(productImg)

    // Insertion de l'élément "div" pour la description produit
    let productDivcontent = document.createElement("div")
    productDivcontent.className = "cart__item__content"
    productArticle.appendChild(productDivcontent)

    // Insertion de l'élément "div"
    let productDivDescription = document.createElement("div")
    productDivDescription.className = "cart__item__content__description"
    productDivcontent.appendChild(productDivDescription)

    // Insertion du titre h2
    let h2 = document.createElement("h2")
    h2.textContent = canape.name
    productDivDescription.appendChild(h2)

    // Insertion de la couleur
    let color = document.createElement("p")
    color.textContent = colorValue
    productDivDescription.appendChild(color)

    // Insertion du prix
    let price = document.createElement("p")
    price.textContent = canape.price+"€"
    productDivDescription.appendChild(price)

    // Insertion de l'élément "div"
    let productDivSettings = document.createElement("div")
    productDivSettings.className = "cart__item__content__settings"
    productDivcontent.appendChild(productDivSettings)

    // Insertion de l'élément "div"
    let productDivQuantity = document.createElement("div")
    productDivQuantity.className = "cart__item__content__settings__quantity"
    productDivSettings.appendChild(productDivQuantity)

    // Insertion de "Qté : "
    let qte = document.createElement("p")
    qte.textContent = "Qté :"
    productDivQuantity.appendChild(qte)

    // Insertion de la quantité
    let input = document.createElement("input")
    input.type = "number"
    input.className = "itemQuantity"
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = quantiteValue
    input.addEventListener("change", (event) => {
        if (input.value < 1) {
            alert("veuillez entrer un nombre superieur ou egale a 1")
            input.value = 1
            
        } else if(input.value > 100) {
            alert("veuillez entrer un nombre inferieur ou egale a 100")
            input.value = 100
        }
        changePriceAndQuantity(canape.id, input.value, canape.price, colorValue )})
    productDivQuantity.appendChild(input)

    // Insertion de l'élément "div"
    let settingDelete = document.createElement("div")
    settingDelete.className ="cart__item__content__settings__delete"
    productDivSettings.appendChild(settingDelete)

    // Insertion de "p" supprimer
    let supprimer = document.createElement("p")
    supprimer.className = "deleteItem"
    supprimer.textContent = "Supprimer"
    settingDelete.appendChild(supprimer) 
    supprimer.addEventListener("click", () => {
        deleteProduct(canape._id, colorValue, canape.price)   
    })
   
}
let totalPrice = document.querySelector("#totalPrice")
let totalQuantity = document.querySelector("#totalQuantity")
let productTotalQuantity = 0
let productTotalPrice = 0

//------------------------------------------------------
// fonction pour l'insertion du prix total
//------------------------------------------------------
function priceTotal() {
    productTotalPrice = productLocalStorage.reduce((total, product) => total + product.price * product.quantity, 0)
    totalPrice.textContent = productTotalPrice
}

//------------------------------------------------------
// fonction pour l'insertion de la quantité total
//------------------------------------------------------
function quantityTotal() {
    productTotalQuantity = productLocalStorage.reduce((total, product) => total + product.quantity, 0)
    totalQuantity.textContent = productTotalQuantity
}

//------------------------------------------------------
// fonction pour changement de la nouvelle quantité +le prix
//------------------------------------------------------
function changePriceAndQuantity (id, newValue, price, color) {
    let canapetoUpdate = productLocalStorage.find(canape => canape.id === id && canape.color === color)
    let difference = newValue - canapetoUpdate.quantity
    productTotalPrice = productTotalPrice + difference * price
    totalPrice.textContent = productTotalPrice
    canapetoUpdate.quantity = Number(newValue)
    localStorage.setItem("panier", JSON.stringify(productLocalStorage))
    
    quantityTotal()
    
}
//------------------------------------------------------
// fonction pour supprimer un produit, la modification de la quantité et du prix sera faite automatiquement
//------------------------------------------------------
function deleteProduct(id, color, price) {
    let article = document.querySelector('article[data-id="' + id + '"][data-color="' + color + '"]')
    let canapetoUpdate = productLocalStorage.find(canape => canape.id === id && canape.color === color)
    productTotalPrice = productTotalPrice - canapetoUpdate.quantity * price
    totalPrice.textContent = productTotalPrice
    productLocalStorage = productLocalStorage.filter(canape => canape.id !== id || canape.color !== color)
    localStorage.setItem("panier", JSON.stringify(productLocalStorage))
    quantityTotal()
    article.remove()
}  
let validations = []
//------------------------------------------------------
// fonction du formulaire
//------------------------------------------------------ 
function getForm() {
    // ajoute la class cart__order__form
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validations[0] = validFirstName(this);
    });

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function() {
        validations[1] =  validLastName(this);
    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function() {
        validations[2] =  validAddress(this);
    });

    // Ecoute de la modification ville
    form.city.addEventListener('change', function() {
        validations[3] = validCity(this);
    });

   // Ecoute de la modification de l'adresse email
    form.email.addEventListener('change', function() {
        validations[4] = validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value.trim())) {
            firstNameErrorMsg.textContent = '';
            return true
        } else {
            firstNameErrorMsg.textContent = 'Veuillez renseigner ce champ.';
            return false
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value.trim())) {
            lastNameErrorMsg.textContent = '';
            return true
        } else {
            lastNameErrorMsg.textContent = 'Veuillez renseigner ce champ.';
            return false
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value.trim())) {
            addressErrorMsg.textContent = '';
            return true
        } else {
            addressErrorMsg.textContent = 'Veuillez renseigner ce champ.';
            return false
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value.trim())) {
            cityErrorMsg.itextContent = '';
            return true
        } else {
            cityErrorMsg.textContent = 'Veuillez renseigner ce champ.';
            return false
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.textContent = '';
            return true
        } else {
            emailErrorMsg.textContent = 'Veuillez renseigner votre email.';
            return false
        }
    };
    }
getForm();

//------------------------------------------------------
// fonction sur la recuperation des données du panier sur les canapés
//------------------------------------------------------

function getCanape(prod) {
    fetch("http://localhost:3000/api/products/"+prod.id).then(res => res.json()).then(canape => {

    product(canape, prod.quantity, prod.color)
    productTotalPrice = productTotalPrice + prod.quantity * canape.price
    totalPrice.textContent = productTotalPrice
})
}

for (let i=0; i < productLocalStorage.length; i++){
    let prod = productLocalStorage[i]
    getCanape(prod)
}
quantityTotal()

//------------------------------------------------------
// fonction sur la confirmation de l'envoie
//------------------------------------------------------

function confirmation () {
    // si panier a pas d'articles, l'envoie est impossible
    let error = validations.find(valid => valid == false)
    if (error) {
        return
    }
    if(productLocalStorage.length == 0) {
        alert("Vous ne pouvez pas passee commande, car le panier est vide")
        return
    }
    let products = productLocalStorage.map(product => product.id)
    console.log(products)
    let form = document.querySelector(".cart__order__form");

    //récuperation des données du formulaire dans un objet
    let contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        city: form.city.value,
        address: form.address.value
    }

    // envoie du fomulaire et des produit dans le panier + localStorage (data) 
    let data = {products: products, contact: contact}
    // envoie a la resource api
    fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        headers: {  'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
}
    
    ).then(response => response.json()).then(response => {
        console.log(response)
        localStorage.clear()
        // envoyé à la page de confirmation 
        location.href="confirmation.html?orderId=" + response.orderId
    })
}

// click sur le boutton confirmation
let bouttonCommande = document.getElementById("order")
bouttonCommande.addEventListener('click', function(event) {
    event.preventDefault()
    confirmation()
}) // fin de l'envoie de l'envoie du formulaire
