// =======================================================
// script-detalle.js
// Lógica para cargar y mostrar el detalle de un solo producto
// =======================================================


const productosBase = [
        { id: 1, nombre: "Pendientes Florales", precio: 12000, img: "./assets/img/Pendientes colgantes florales con baño de cobre dorado.webp", desc: "Baño de cobre dorado" },
        { id: 2, nombre: "Aros Amarillos Dorados", precio: 8500, img: "./assets/img/aros amarillos dorados.jpg", desc: "Brillo intenso" },
        { id: 3, nombre: "Mini Aros Gruesos", precio: 9200, img: "./assets/img/Mini aros gruesos.webp", desc: "Estilo minimalista" },
        { id: 4, nombre: "Twin Metal Hoops", precio: 10500, img: "./assets/img/Twin Metal Hoops.jpg", desc: "Diseño doble" },
        { id: 5, nombre: "Cadena Dije 3 Perlas", precio: 15000, img: "./assets/img/cadena dije 3 perlas.jpg", desc: "Elegancia clásica" },
        { id: 6, nombre: "Cadena Corazón", precio: 13500, img: "./assets/img/cadena dije corazon.jpg", desc: "Romántico y sutil" },
        { id: 7, nombre: "Cadena Mariposa", precio: 14000, img: "./assets/img/cadena dije mariposa.jpg", desc: "Inspiración natural" },
        { id: 8, nombre: "Cadena Media Luna", precio: 13800, img: "./assets/img/cadena dije media luna.jpg", desc: "Estilo místico" },
        { id: 9, nombre: "Collar Cadena Dorada", precio: 18000, img: "./assets/img/collar cadena dorada.jpg", desc: "Statement piece" },
        { id: 10, nombre: "Brazalete Dorado", precio: 11000, img: "./assets/img/brazalete dorado.jpg", desc: "Ajustable" },
        { id: 11, nombre: "Pulsera Esclava", precio: 10000, img: "./assets/img/pulcera esclava dorada.jpg", desc: "Rígida y brillante" },
        { id: 12, nombre: "Pulsera Geométrica", precio: 9500, img: "./assets/img/pulsera con linea geometrica.jpg", desc: "Diseño moderno" },
        { id: 13, nombre: "Pulsera Cordón", precio: 7500, img: "./assets/img/pulsera cordon.jpg", desc: "Casual chic" },
        { id: 14, nombre: "Anillo Cinto Strass 2", precio: 8900, img: "./assets/img/anillo cinto con strass 2.jpg", desc: "Con detalles brillantes" },
        { id: 15, nombre: "Anillo Cinto Strass", precio: 8900, img: "./assets/img/anillo cinto con strass.jpg", desc: "Clásico renovado" },
        { id: 16, nombre: "Anillo Estrella", precio: 9100, img: "./assets/img/anillo estrella strass.jpg", desc: "Luz propia" }
    ];

document.addEventListener("DOMContentLoaded", cargarDetalleProducto);



function cargarDetalleProducto() {
    const contenedor = document.getElementById('producto-detalle-contenedor');
    
    // 1. Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get('id')); // Obtenemos el ID y lo convertimos a número
    
    
    // Si no hay ID o no es un número válido, mostramos un error
    if (!idProducto || !contenedor) {
        // Manejar caso donde no hay ID o contenedor
        if (contenedor) {
            contenedor.innerHTML = "<h1>❌ Producto no especificado o error de carga.</h1>";
        }
        return;
    }

    // 2. Buscar el producto en la lista base
    const producto = productosBase.find(p => p.id === idProducto);
    
    // Si el producto no existe en la lista
    if (!producto) {
        contenedor.innerHTML = `<h1>🤷‍♀️ Producto con ID ${idProducto} no encontrado.</h1>`;
        return;
    }

    // 3. Inyectar el detalle del producto en el HTML
    document.getElementById('detalle-titulo').textContent = producto.nombre;
    
    contenedor.innerHTML = `
        <div class="detalle-card">
            <div class="detalle-imagen-contenedor">
                <img src="${producto.img}" alt="${producto.nombre}" class="detalle-img">
            </div>
            
            <div class="detalle-info">
                <h1 class="detalle-nombre">${producto.nombre}</h1>
                
                <p class="detalle-precio">
                    Precio: <strong>$${producto.precio.toLocaleString('es-CL')}</strong>
                </p>
                
                <hr>
                
                <h2>Descripción:</h2>
                <p class="detalle-descripcion">${producto.desc}</p>
                
                <button class="btn-agregar-carrito" data-id="${producto.id}">
                    🛒 Añadir al Carrito
                </button>
            </div>
        </div>
    `;
}
    // 4. (Opcional) Implementar la lógica de "Añadir al Carrito" desde aquí
    // Esto requeriría que la función 'agregarAlCarrito' y la lógica de carrito 
    // también se incluyan o importen en este archivo.

