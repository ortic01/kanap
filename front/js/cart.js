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
            alert("veuillez entrer un nombre suprerieur ou egale a 1")
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

// insertion du prix total
function priceTotal() {
   
    productTotalPrice = productLocalStorage.reduce((total, product) => total + product.price * product.quantity, 0)
    totalPrice.textContent = productTotalPrice
}


// insertion de la quantité total
function quantityTotal() {
    
    productTotalQuantity = productLocalStorage.reduce((total, product) => total + product.quantity, 0)
    totalQuantity.textContent = productTotalQuantity
}



// changement de la nouvelle quantité + prix
function changePriceAndQuantity (id, newValue, price, color) {
    
    let canapetoUpdate = productLocalStorage.find(canape => canape.id === id && canape.color === color)
    let difference = newValue - canapetoUpdate.quantity
    productTotalPrice = productTotalPrice + difference * price
    totalPrice.textContent = productTotalPrice
    canapetoUpdate.quantity = Number(newValue)
    localStorage.setItem("panier", JSON.stringify(productLocalStorage))
    
    quantityTotal()
    
}
// supprimer un produit en modifiant la quantité et le prix total
function deleteProduct(id, color, price) {
    console.log(id)
    console.log(color)
    let article = document.querySelector('article[data-id="' + id + '"][data-color="' + color + '"]')
    console.log(article)
    let canapetoUpdate = productLocalStorage.find(canape => canape.id === id && canape.color === color)
    productTotalPrice = productTotalPrice - canapetoUpdate.quantity * price
    totalPrice.textContent = productTotalPrice
    productLocalStorage = productLocalStorage.filter(canape => canape.id !== id || canape.color !== color)
    localStorage.setItem("panier", JSON.stringify(productLocalStorage))
    quantityTotal()
    article.remove()
}  

// insertion formulaire 
function getForm() {
    
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    
    form.city.addEventListener('change', function() {
        validCity(this);
    });

   
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value.trim())) {
            firstNameErrorMsg.textContent = '';
        } else {
            firstNameErrorMsg.textContent = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value.trim())) {
            lastNameErrorMsg.textContent = '';
        } else {
            lastNameErrorMsg.textContent = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value.trim())) {
            addressErrorMsg.textContent = '';
        } else {
            addressErrorMsg.textContent = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value.trim())) {
            cityErrorMsg.itextContent = '';
        } else {
            cityErrorMsg.textContent = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.textContent = '';
        } else {
            emailErrorMsg.textContent = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();



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




/*
if (!productLocalStorage) {

} else {

    for (let i=0; i < productLocalStorage.length; i++) {


        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productLocalStorage[i].id);

        
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productLocalStorage[i].img;

 }
}
*/