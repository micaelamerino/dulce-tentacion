let cart = JSON.parse(localStorage.getItem("cart")) || [];

const getData = async () => {
  try {
    const response = await fetch("data.json");
    const json = await response.json();
    const data = json;
    const results = document.getElementById("resultados");

    function pintarProducts(array) {
      array.forEach((e) => {
        const article = document.createElement("article");
        article.className = "articulo";
        article.innerHTML = `
            <h3>${e.nombre}</h3>
            <div class="contenedor-img">
                <img src=${e.imagen} alt="Imagen de ${e.nombre}"/>
            </div>
            <p>$ ${e.precio}</p>      
            `;

        results.appendChild(article);

        const btnAddCart = document.createElement("button");
        btnAddCart.className = "btn-addCart";
        btnAddCart.innerHTML = `<img src="/assets/images/cart.svg" alt="Icono de carrito"/>`;
        article.appendChild(btnAddCart);

        btnAddCart.addEventListener("click", () => {
          const repeat = cart.some(
            (repeatProduct) => repeatProduct.id === e.id
          );
          if (repeat) {
            cart.map((prod) => {
              if (prod.id === e.id) {
                prod.cantidad++;
              }
            });
          } else {
            cart.push({
              id: e.id,
              nombre: e.nombre,
              precio: e.precio,
              cantidad: e.cantidad,
            });
          }
          saveLocal();
        });
      });
    }

    window.onload = pintarProducts(data);

    const form = document.getElementById("form");
    const notFilter = document.getElementById("notFilter");
    form.addEventListener("submit", searchResults);
    function searchResults(e) {
      e.preventDefault();
      const inputValue = document.getElementById("input").value;
      const search = data.filter((p) => p.nombre.toLowerCase().includes(inputValue.toLowerCase()));
      if (inputValue == "") {
        notFilter.innerHTML = `<p>*Debe ingresar un dato</p>`;
      } else if (search.length > 0) {
        results.innerHTML = "";
        pintarProducts(search);
      } else {
        notFilter.innerHTML = `<p>*Este producto no existe</p>`;
      }
    }

    const btnVerTodo = document.getElementById("btnVerTodo");
    btnVerTodo.addEventListener("click", () => {
      results.innerHTML = "";
      pintarProducts(data);
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};
getData();

const saveLocal = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
