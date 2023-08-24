const contentCart = document.getElementById("contentCart");
const btnCart = document.getElementById("btnCart");
const results = document.getElementById("resultados")

const paintCart = () => {
  contentCart.innerHTML = "";
  contentCart.style.display = "block";
  const headerCart = document.createElement("div");
  headerCart.className = "header-cart";
  headerCart.innerHTML = "<h2>Carrito de compra</h2>";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerText = "X";
  headerCart.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => {
    contentCart.style.display = "none";
    results.style.opacity = ""
  });

  contentCart.appendChild(headerCart);

  if (cart.length <= 0) {
    const emptyCart = document.createElement("div");
    emptyCart.className = "empty-cart";
    emptyCart.innerHTML = `<p>Aún no hay productos ☹</p>`;
    contentCart.appendChild(emptyCart);
  } else {
    cart.forEach((product) => {
      const contentProducts = document.createElement("section");
      const articleProduct = document.createElement("article");
      articleProduct.className = "article-product";
      articleProduct.innerHTML = `
                <h3>${product.nombre}</h3>
                <span>${product.cantidad} x </span>
                <p>$ ${product.precio * product.cantidad}</p>      
                `;
      contentProducts.appendChild(articleProduct);
      contentCart.appendChild(contentProducts);
    });

    const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const footerCart = document.createElement("div");
    footerCart.className = "footer-cart";
    footerCart.innerHTML = `<p>Monto total <b>$ ${total}</b></p>`;
    contentCart.appendChild(footerCart);

    const btnFinishBuy = document.createElement("button");
    btnFinishBuy.className = "btn-finish";
    btnFinishBuy.innerText = "Finalizar compra";

    footerCart.appendChild(btnFinishBuy);
    btnFinishBuy.addEventListener("click", () => {
      localStorage.removeItem("cart");
      window.location.reload();
    });
  }
};

btnCart.addEventListener("click", () => {
  paintCart();
  results.style.opacity = "0.5"
});
