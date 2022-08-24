let section = document.getElementById("items")

//------------------------------------------------------
// fonction pour creation d'une carte de canapé
//------------------------------------------------------
function carte(canape){
    let a = document.createElement("a")
    a.href = "./product.html?id="+canape._id
    section.appendChild(a)
    let article = document.createElement("article")
    a.appendChild(article)
    let img = document.createElement("img")
    img.src = canape.imageUrl
    img.alt = canape.altTxt
    article.appendChild(img)
    let h3 = document.createElement("h3")
    h3.className = "productName"
    h3.textContent = canape.name
    article.appendChild(h3)
    let p = document.createElement("p")
    p.className = "productDescription"
    p.textContent = canape.description
    article.appendChild(p)
}

// recuperation des produits 
fetch("http://localhost:3000/api/products").then(res => res.json()).then(canapes => {

    for(let canape of canapes) {
        carte(canape)
    }
    
})
