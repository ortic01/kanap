const params = new URLSearchParams(location.search);
const orderId = params.get("orderId");

let numeroCommande = document.getElementById("orderId")
numeroCommande.textContent = orderId