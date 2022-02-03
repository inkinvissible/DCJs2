//Se crea el producto (en el objeto) y se le hace push al array
class Producto {
    constructor(id, descripcion, precio) {
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
    }
};
let productos = [];
let carritos = [];
productos.push(new Producto("851342", "Manija", 711));
productos.push(new Producto("851346", "Manija", 4149));
productos.push(new Producto("851700", "Manija", 1850));
productos.push(new Producto("852402", "Manija", 506));
productos.push(new Producto("945402", "Cerradura", 1502));




//Se crean, a partir del array, los productos en el HTML
const createProducts = () => {
    let section = document.querySelector('.tiendaOnline.row.separar.container-fluid');
    for (const producto of productos) {
        let article = document.createElement("article");
        article.className = "col col-12 col-md-6 col-lg-4 carta";
        article.innerHTML = `   <img src="../imagenes/${producto.id}.jpg" class="img-fluid imagen" alt="Imagen de Producto">
                            <div>
                            
                            <h3 class="codigo">${producto.id}</h3>
                            <p class="descripcion">${producto.descripcion}</p>
                            <p class="precio">$${producto.precio}</p>
                            <input value="1" type="number" class="cantidad inputCantidad" placeholder="Cantidad">
    
                            
    
                                <div>
                                    <div class="btnCompra">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-cart" viewBox="0 0 16 16">
                                <path
                                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                                    <a href="" data-id="${producto.id}" class="btn-add">Agregar al Carrito</a>
                                    </div>
                                   
                                </div>
                            </div>`;
        // Agregar a sección y no al documento
        section.appendChild(article);
    }
};
createProducts();

//Se escuchan los clicks, para agregar el producto cuando se toque el boton "Agregar al Carrito"
const addProducts = () => {
    let section = document.querySelector('.tiendaOnline.row.separar.container-fluid');
    let sumaProductos = 0;
    // Escuchar clics en listado de productos
    section.addEventListener('click', e => {
        // Solo si el clic fue en botón para agregar producto
        if (e.target.classList.contains('btn-add')) {
            // Cancelar evento del enlace
            e.preventDefault();
            let sectionCarrito = document.getElementById('carrito');
            // Tomar ID desde atributo de datos
            let productId = e.target.dataset.id;
            // Obtener descripción y precio, buscando primero el padre y luego el elemento por clase
            let descrip = e.target.closest('article').querySelector('.descripcion').textContent;
            let price = e.target.closest('article').querySelector('.precio').textContent;
            let cantidad = e.target.closest('article').querySelector('.cantidad').value;



            // Insertar en arreglo, localStorage o cookie
            //Sumar Carrito
            price = parseFloat(price.slice(1));

            cantidad = parseInt(cantidad);
            typeof productId;
            console.log(productId);


            if (cantidad == "" || cantidad == 0 || cantidad == 1) {
                sumaProductos = sumaProductos + (price * 1);
            } else if (cantidad > 0) {
                sumaProductos = sumaProductos + (price * cantidad);
            };

            $('#textoPrecio').text('Precio total del carrito: $' + sumaProductos);

            //Hacer Push al Local Storage
            carritos.push({ productId, descrip, price, cantidad });
            //Muestra que se ha agregado con éxito
            alertify.success('Producto agregado con éxito');

            //Se pone en LocalStorage los precios y el carrito
            let precioEnJson = JSON.stringify(sumaProductos);
            localStorage.setItem('precioEnJson', precioEnJson);
            let carritoEnJson = JSON.stringify(carritos);
            localStorage.setItem('CarritoProductos', carritoEnJson);

            //HAY QUE MOSTRAR QUE SE AGREGO EL PRODUCTO AL CARRITO
            let article = document.createElement('article');
            article.className = 'col col-sm-12 col-md-12 col-lg-12 col-xl-12'
            article.innerHTML = ` <div class="divCarrito row container-fluid">
                                    <img src="../imagenes/${productId}.jpg" alt="Foto ${productId}" class="col col-md-6 col-lg-6 col-6 col-xl-6">
                                    <div class="col col-md-6 col-lg-6 col-6 col-xl-6">
                                        <h6>${productId} - ${descrip} - $${price}-Cant.${cantidad}</h6>
                                    </div>
                            </div>`
            sectionCarrito.appendChild(article);
        }
    })
};
addProducts();


//Verificando si hay algo en el LocalStorage, si hay, que lo agregue al carrito
const verifyLocal = () => {
    let arrayLocal = JSON.parse(localStorage.getItem('CarritoProductos'));
    if ((arrayLocal != null) || (arrayLocal != undefined)) {
        let sectionCarrito = document.getElementById('carrito');


        for (const producto of arrayLocal) {
            let article = document.createElement('article');
            article.className = 'col col-sm-12 col-md-12 col-lg-12 col-xl-12'
            article.innerHTML = ` <div class="divCarrito row container-fluid">
        <img src="../imagenes/${producto.productId}.jpg" alt="Foto ${producto.productId}" class="col col-md-6 col-lg-6 col-6 col-xl-6">
        <div class="col col-md-6 col-lg-6 col-6 col-xl-6">
        <h6>${producto.productId} - ${producto.descrip} - $${producto.price}-Cant. ${producto.cantidad}</h6>
        </div>
                                    
                            </div>`
            sectionCarrito.appendChild(article);
        };
    }
};
verifyLocal();
//Abrir y Cerrar el carrito cuando se le hace click
svgCart.onclick = () => {
    let section = document.getElementById('carrito');

    if (section.classList.contains('noShow')) {
        svgCart.classList.add('noShow');
        section.classList.remove('noShow');
        section.classList.add('show');

    } else {
        section.classList.remove('show');
        section.classList.add('noShow');
        svgCart.classList.remove('noShow')
    }
}
