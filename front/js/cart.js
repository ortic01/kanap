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

function product(canape, quantiteValue, colorValue) {
    let productArticle = document.createElement("article");
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", canape._id)
    productArticle.setAttribute("data-color", colorValue)

    section.appendChild(productArticle)

    let productDivImg = document.createElement("div");
    productDivImg.className = "cart__item__img"
    productArticle.appendChild(productDivImg);


    let productImg = document.createElement("img");
    productImg.src = canape.imageUrl
    productImg.alt = canape.altTxt
    productDivImg.appendChild(productImg)

    let productDivcontent = document.createElement("div")
    productDivcontent.className = "cart__item__content"
    productArticle.appendChild(productDivcontent)

    let productDivDescription = document.createElement("div")
    productDivDescription.className = "cart__item__content__description"
    productDivcontent.appendChild(productDivDescription)

    let h2 = document.createElement("h2")
    h2.textContent = canape.name
    productDivDescription.appendChild(h2)

    let color = document.createElement("p")
    color.textContent = colorValue
    productDivDescription.appendChild(color)

    let price = document.createElement("p")
    price.textContent = quantiteValue*canape.price+"€"
    productDivDescription.appendChild(price)

    let productDivSettings = document.createElement("div")
    productDivSettings.className = "cart__item__content__settings"
    productDivcontent.appendChild(productDivSettings)

    let productDivQuantity = document.createElement("div")
    productDivQuantity.className = "cart__item__content__settings__quantity"
    productDivSettings.appendChild(productDivQuantity)

    let qte = document.createElement("p")
    qte.textContent = "Qté :"
    productDivQuantity.appendChild(qte)

    let input = document.createElement("input")
    input.type = "number"
    input.className = "itemQuantity"
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = quantiteValue
    productDivQuantity.appendChild(input)

    let settingDelete = document.createElement("div")
    settingDelete.className ="cart__item__content__settings__delete"
    productDivSettings.appendChild(settingDelete)

    let supprimer = document.createElement("p")
    supprimer.className = "deleteItem"
    supprimer.textContent = "Supprimer"
    settingDelete.appendChild(supprimer)
}

function getCanape(prod) {
    fetch("http://localhost:3000/api/products/"+prod.id).then(res => res.json()).then(canape => {

   product(canape, prod.quantity, prod.color)

})
}

for (let i=0; i < productLocalStorage.length; i++){
    let prod = productLocalStorage[i]
    getCanape(prod)
}

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