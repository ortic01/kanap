function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    }else {
        return JSON.parse(basket);
    }
}

function addBasket(products) {
    let basket = getBasket();
    let foudProduct = basket.find(p => p.id == product.id);
    if (foudProduct != undefined) {
        foudProduct.quantity++;
    } else {
        product.quantity = 1;
        basket.push(product);
    }
    saveBasket(basket);
}

function removeFromBasket(product) {
    let product = getBasket();
    basket = basket.filter(p => p.id != product.id)
    saveBasket(basket);
}

function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foudProduct = basket.find(p => p.id == product.id);
    if (foudProduct != undefined) {
        foudProduct.quantity += quantity;
        if (foudProduct.quantity <=0) {
            removeFromBasket(foudProduct);
        } else {
            saveBasket(basket);
        }
    }
}

function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}