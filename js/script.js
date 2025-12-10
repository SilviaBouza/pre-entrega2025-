document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. REFERENCIAS A ELEMENTOS DEL DOM
    // ==========================================
    const btnCarrito = document.getElementById("btnCarrito");
    const carritoPanel = document.getElementById("carritoPanel");
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarritoSpan = document.getElementById("totalCarrito");
    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");
    const contenedorProductos = document.querySelector('.product'); // grid de cards


    // ==========================================
    // 2. PRODUCTOS (JSON LOCAL SIMULADO)
    // ==========================================
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

    let carrito = JSON.parse(localStorage.getItem("carritoOrelia")) || [];
    let catalogoProductos = [];


    // ==========================================
    // 3. SIMULACIÓN DE FETCH
    // ==========================================
    const obtenerProductos = () => {
        return new Promise(resolve => {
            setTimeout(() => resolve(productosBase), 300);
        });
    };


    // ==========================================
    // 4. RENDERIZAR PRODUCTOS (CARDS)
    // ==========================================
    const renderizarProductos = async () => {

        contenedorProductos.innerHTML = "<p>Cargando productos...</p>";

        catalogoProductos = await obtenerProductos();
        contenedorProductos.innerHTML = "";

        catalogoProductos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <a href="./pages/descripcion.html?id=${producto.id}" class="card-link">
                    <h4>${producto.nombre}</h4>
                    <img src="${producto.img}" alt="${producto.nombre}" loading="lazy">
                    <p>${producto.desc}</p>
                    <p>Precio: $${producto.precio.toLocaleString()}</p>
                </a>

                <button class="btn-agregar" data-id="${producto.id}">
                    Comprar
                </button>
            `;

            contenedorProductos.appendChild(card);
        });

        activarBotonesAgregar();
    };


    // ==========================================
    // 5. BOTONES DE "COMPRAR"
    // ==========================================
    const activarBotonesAgregar = () => {
        document.querySelectorAll(".btn-agregar").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = parseInt(e.target.dataset.id);
                const producto = catalogoProductos.find(p => p.id === id);

                agregarAlCarrito(producto);
            });
        });
    };


    // ==========================================
    // 6. CARRITO: AGREGAR / GUARDAR
    // ==========================================
    const agregarAlCarrito = (producto) => {
        const existe = carrito.find(p => p.id === producto.id);

        if (existe) {
            existe.cantidad++;
            mostrarToast(`➕ Otra unidad de ${producto.nombre}`);
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
            mostrarToast(`✔ ${producto.nombre} agregado`);
        }

        actualizarCarrito();
    };

    const guardarCarrito = () => {
        localStorage.setItem("carritoOrelia", JSON.stringify(carrito));
    };


    // ==========================================
    // 7. RENDER DEL CARRITO
    // ==========================================
    const actualizarCarrito = () => {

        listaCarrito.innerHTML = "";
        let total = 0;
        let cantidadTotal = 0;

        carrito.forEach(item => {
            const li = document.createElement("li");
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            cantidadTotal += item.cantidad;

            li.innerHTML = `
                ${item.nombre} - $${item.precio.toLocaleString()} x ${item.cantidad}
                
                <div class="cantidad-control">
                    <button class="menos" data-id="${item.id}">-</button>
                    <button class="mas" data-id="${item.id}">+</button>
                    <button class="eliminar" data-id="${item.id}">🗑️</button>
                </div>
            `;

            listaCarrito.appendChild(li);
        });

        totalCarritoSpan.textContent = total.toLocaleString();
        contadorCarrito.textContent = cantidadTotal;

        guardarCarrito();
        activarBotonesCarrito();
    };


    // ==========================================
    // 8. BOTONES DEL CARRITO
    // ==========================================
    const activarBotonesCarrito = () => {

        document.querySelectorAll(".mas").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = parseInt(e.target.dataset.id);
                const item = carrito.find(p => p.id === id);
                item.cantidad++;
                actualizarCarrito();
            });
        });

        document.querySelectorAll(".menos").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = parseInt(e.target.dataset.id);
                const item = carrito.find(p => p.id === id);

                if (item.cantidad > 1) {
                    item.cantidad--;
                } else {
                    carrito = carrito.filter(p => p.id !== id);
                    mostrarToast("❌ Producto eliminado");
                }

                actualizarCarrito();
            });
        });

        document.querySelectorAll(".eliminar").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = parseInt(e.target.dataset.id);
                carrito = carrito.filter(p => p.id !== id);
                mostrarToast("🗑️ Producto eliminado");
                actualizarCarrito();
            });
        });
    };


    // ==========================================
    // 9. TOASTIFY
    // ==========================================
    function mostrarToast(msg) {
        Toastify({
            text: msg,
            duration: 2500,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #d4af37, #a67c00)",
                color: "#000"
            }
        }).showToast();
    }


    // ==========================================
    // 10. EVENTOS GENERALES
    // ==========================================
    btnCarrito.addEventListener("click", () => {
        carritoPanel.classList.toggle("abierto");
    });

    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        mostrarToast("🗑️ Carrito vaciado");
        actualizarCarrito();
    });


    // ==========================================
    // 11. INICIALIZACIÓN DEL SISTEMA
    // ==========================================
    renderizarProductos();
    actualizarCarrito();

});
