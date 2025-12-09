let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const btnCarrito = document.getElementById("btnCarrito");
const panel = document.getElementById("carritoPanel");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const btnVaciar = document.getElementById("vaciarCarrito");

// ABRIR / CERRAR PANEL
btnCarrito.addEventListener("click", () => {
    panel.classList.toggle("abierto");
    mostrarCarrito();
});

// AGREGAR PRODUCTO
function agregarProducto(nombre, precio) {
    const prod = carrito.find(p => p.nombre === nombre);

    if (prod) {
        prod.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    mostrarCarrito();
}

// MOSTRAR CARRITO
function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.nombre}</strong><br>
            $${item.precio} x ${item.cantidad}

            <div>
                <button onclick="sumar(${index})">+</button>
                <button onclick="restar(${index})">-</button>
                <button onclick="eliminar(${index})">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });

    actualizarTotal();
}

// SUMAR
function sumar(i) {
    carrito[i].cantidad++;
    guardarCarrito();
    mostrarCarrito();
}

// RESTAR
function restar(i) {
    carrito[i].cantidad--;
    if (carrito[i].cantidad === 0) carrito.splice(i, 1);
    guardarCarrito();
    mostrarCarrito();
}

// ELIMINAR PRODUCTO
function eliminar(i) {
    carrito.splice(i, 1);
    guardarCarrito();
    mostrarCarrito();
}

// VACIAR CARRITO
btnVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});

// GUARDAR EN LOCALSTORAGE
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// ACTUALIZAR TOTAL Y CONTADOR
function actualizarTotal() {
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalCarrito.textContent = total.toFixed(2);
}

function actualizarContador() {
    const cant = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contadorCarrito.textContent = cant;
}

actualizarContador();
