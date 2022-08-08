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
    let quantity = itemQuantity.value
    if(quantity < 1 || quantity > 100 ) {
        alert("selectionner un nombre entre 1 et 100")
        return ;
    }
    let element = {id: product._id, color: color, quantity: quantity}
    let panier = getPanier()
    panier.push(element)
    localStorage.setItem("panier", JSON.stringify(panier))
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





