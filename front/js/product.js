//recuperation du id dans l'url
const params = new URLSearchParams(location.search);
const id = params.get("id")
console.log(id)

let product = null
let select = document.getElementById("colors")
let itemQuantity = document.getElementById("quantity")

//affichage des information du canapé
function information(canape){
    //affichage de l'image
    let img = document.createElement("img")
    img.src = canape.imageUrl
    img.alt = canape.altTxt
    const itemimg = document.querySelector(".item__img")
    itemimg.appendChild(img)

    //affichage du nom du produit
    let h1 = document.getElementById("title")
    h1.textContent = canape.name

    //affichage du prix
    let span = document.getElementById("price")
    span.textContent = canape.price

    //description du canapé
    let p = document.getElementById("description")
    p.textContent = canape.description

    //affichage des couleurs du canapé
    
    for(let couleur of canape.colors){
        let option = document.createElement("option");
        option.textContent = couleur;
        option.value = couleur;
        select.appendChild(option);
    }

}

//recuperation des information du canapés
fetch("http://localhost:3000/api/products/"+id).then(res => res.json()).then(canape => {

   information(canape)
   console.log(canape)
   product = canape
})

//paramettrage boutton validation
function validation() {
    //recuperation du boutton
    let button = document.getElementById("addToCart")

    //clic sur le boutton
    button.addEventListener("click",function(){
        // console.log("clic sur boutton")
        ajoutPanier()


      
    })
}
// ajout dans le localstorage
function ajoutPanier() {
    let color = select.value
    if(!color) {
        alert("selectionner une couleur")
        return ;
    }
    let quantity = Number(itemQuantity.value)
    if(quantity < 1 || quantity > 100 ) {
        alert("selectionner un nombre entre 1 et 100")
        return ;
    }
    let element = {id: product_id, color: color, quantity: quantity}
    let panier = getPanier()
// recherche si le produit existe dans le panier    
    let produitExistent = panier.find(
        (prod) => prod.id == product._id && prod.color == color
    ) 

    if(produitExistent == null) {
    // si le produit existe pas dans le panier, on le rajoute    
        panier.push(element)
    }else{
    // si le produit existe et que sa quantité + la nouvelle quantité > 100, on affiche un message d erreur   
     if(produitExistent.quantity+quantity > 100) {
        alert("impossible d ajouter plus de 100 produits existent")
        return;
     }else{
    // si le produit existe et que sa quantité + la nouvelle quantité < 100, on mais a jours sa quantité    
        produitExistent.quantity = produitExistent.quantity+quantity
     }
    }
    
    localStorage.setItem("panier", JSON.stringify(panier))
    alert("le produit  a été ajoutée")
}

function getPanier() {
    let panier = localStorage.getItem("panier")
    if(panier == null) {
        return []
    
    } else {
        return JSON.parse(panier)
    }
    
}


validation()





