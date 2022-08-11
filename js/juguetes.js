const API = fetch("https://apipetshop.herokuapp.com/api/articulos")
const datosApi = async() => {
    try{
        res = await API
        arrayApi = await res.json()
        juguetes = arrayApi.response.filter(e => e.tipo == "Juguete")
        console.log(juguetes)
        cardGenerator(juguetes)
        let botonComprar = document.querySelectorAll("button");
        botonComprar.forEach((boton) => boton.addEventListener("click", pushCarrito))
    }catch(err){
        console.log(err)
    }
}
datosApi()

//CARDS
let cardsCont = document.getElementById("cont_juguetes")
function cardGenerator(array){
   cardsCont.innerHTML = ''
    array.forEach(art=>{
        let card = document.createElement ('div')
        card.className = 'card'
        card.innerHTML = `
        <img class="card-img" id="foto" src="${art.imagen}" alt="Imagen de ${art.nombre}">
        <div class="card-info">
            <p class="text-title">${art.nombre}</p>
            <div class="w3-container">
            <button onclick="document.getElementById('${art._id}').style.display='block'" class="w3-button w3-2021-mint mt-1 mb-2">Ver más</button>

            <div id="${art._id}" class="w3-modal">
              <div class="w3-modal-content w3-animate-zoom w3-card-4">
                <div class="w3-container w3-teal w3-2021-marigold">
                  <span onclick="document.getElementById('${art._id}').style.display='none'" 
                  class="w3-button w3-display-topright">&times;</span>
                  <h2>${art.nombre}</h2>
                </div>
                <div class="w3-container">
                  <p class="w3-sans-serif ps-2">${art.descripcion}</p>
                </div>
                <div class="w3-container w3-teal w3-2021-marigold">
                  <p class="d-flex g-5">Stock: ${art.stock}</p>
                </div>
              </div>
            </div>
            </div>
            
        </div>
        <div class="card-footer">
            <span class="text-title">Stock: ${art.stock}</span>
            <span class="text-title">$${art.precio}</span>
            <button class="card-button" id="${art._id}">
                <img src="./asset/img/pngwing.com.png" style="width: 1.5rem; alt="boton comprar" id="${art._id}">
            </button>
        </div>`
        cardsCont.appendChild(card)
    });
}

function pushCarrito(boton) {
    let arrayCarrito = []
    let clicked = boton.target.id
    let item = juguetes.find((e) => e._id == clicked)
    console.log(item)
    if(item.stock > 0){
        item.stock = -- item.stock
        console.log("Si")
        arrayCarrito.push(item)
    }else {
        console.log("No")
        alert("Agotado el producto")
    }
    console.log(arrayCarrito)
}
//<p class="text-body">${art.descripcion}</p>