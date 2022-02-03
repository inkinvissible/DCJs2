//Verificando si hay algún precio guardado
let precioLocal = JSON.parse(localStorage.getItem('precioEnJson'));
if (precioLocal != "") {
    $('#textoPrecio').text('Precio total del carrito: $' + precioLocal);
} else if (precioLocal == null) {
    precioLocal = 0;
};
//Eliminar los productos del carrito onclick

$("#svgEliminar").on('click', () => {
    $('#pSumaProductos').remove();
    localStorage.removeItem('CarritoProductos');
    localStorage.removeItem('precioEnJson');
    location.reload();

});

$('#svgConfirm').on('click', () => {
    let arrayLocal = JSON.parse(localStorage.getItem('CarritoProductos'));
    
    if ((arrayLocal== null) ||(arrayLocal == undefined)) {
        alertify
        .alert("Carrito Vacío","Oops! No tienes nada en el carrito, agrega más productos");
    } else {
        alertify
        .alert("Pedido Enviado","Felicidades, su pedido fue enviado").set({
            onshow: null, onclose: function () {
                localStorage.removeItem('CarritoProductos');
                localStorage.removeItem('precioEnJson');
                location.reload();
            }
        });
    }
   
});