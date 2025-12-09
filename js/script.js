document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. REFERENCIAS Y DATOS INICIALES
    // ==========================================
    const btnCarrito = document.getElementById("btnCarrito");
    const carritoPanel = document.getElementById("carritoPanel");
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarritoSpan = document.getElementById("totalCarrito");
    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");
    const contenedorProductos = document.querySelector('.product'); // Contenedor de las Cards

    // ==========================================
    // 2. CATÁLOGO DE PRODUCTOS (SIMULA JSON)
    // ==========================================// Almacén de productos base (simula la respuesta de la API)
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

    // Cargar carrito desde LocalStorage
    let carrito = JSON.parse(localStorage.getItem('carritoOrelia')) || [];
    let catalogoProductos = []; 

    // ==========================================
    // 2. LÓGICA DE CARGA DE PRODUCTOS (FETCH SIMULADO)
    // ==========================================

    const obtenerProductos = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(productosBase);
            }, 500);
        });
    };

    const renderizarProductos = async () => {
    const idProducto = producto.id; 
    const cardHTML = `
    <a href="detalle-producto.html?id=${idProducto}" class="card-link">
        <div class="card producto-card">
            </div>
`;


        contenedorProductos.innerHTML = '<p style="grid-column: 1 / -1;">Cargando catálogo...</p>';
        
        try {
            catalogoProductos = await obtenerProductos();
            contenedorProductos.innerHTML = ''; 

            catalogoProductos.forEach(producto => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <a href="./pages/descripcion.html?id=${producto.id}"class="card-link">
                        <h4>${producto.nombre}</h4>
                        <img src="${producto.img}" alt="${producto.nombre}" loading="lazy">
                        <p>${producto.desc}</p>
                        <p>Precio: <span>$${producto.precio.toLocaleString()}</span></p>
                    </a>
                    <button class="btn-agregar" data-id="${producto.id}">Comprar</button>
                `;
                contenedorProductos.appendChild(card);
            });

            activarListenersProductos();
            
        } catch (error) {
            console.error("Error al cargar productos:", error);
            contenedorProductos.innerHTML = '<p style="grid-column: 1 / -1; color: red;">Error al cargar el catálogo de productos.</p>';
        }
    };

    const activarListenersProductos = () => {
        document.querySelectorAll('.btn-agregar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productoId = parseInt(e.target.dataset.id);
                const producto = catalogoProductos.find(p => p.id === productoId);
                
                if (producto) {
                    agregarAlCarrito(producto);
                }
            });
        });
    };
    
    // ==========================================
    // 3. LÓGICA DEL CARRITO Y NOTIFICACIONES
    // ==========================================

    function guardarCarrito() {
        localStorage.setItem('carritoOrelia', JSON.stringify(carrito));
    }
    
    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad++;
            mostrarToast(`➕ Añadida una unidad más de ${producto.nombre}`);
        } else {
            carrito.push({ 
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1 
            });
            mostrarToast(`✅ ${producto.nombre} agregado al carrito.`);
        }
        actualizarCarrito();
    };

    /** Muestra una notificación usando Toastify JS. */
    function mostrarToast(mensaje) {
        Toastify({
            text: mensaje,
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #d4af37, #a67c00)", // Colores Dorados
                color: "#000",
                fontSize: "1rem",
                borderRadius: "5px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }


    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;
        let cantidadTotal = 0;
            
            carrito.forEach((item) => {
            const li = document.createElement("li");
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            cantidadTotal += item.cantidad;

            
            li.setAttribute('data-id', item.id);

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

        totalCarritoSpan.textContent = total.toLocaleString('es-ES'); 
        contadorCarrito.textContent = cantidadTotal;
        guardarCarrito(); 
        activarBotonesCarrito(); 
    }

// Función para manejar los botones de cantidad y eliminación
    function activarBotonesCarrito() {
        document.querySelectorAll('.mas').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const producto = carrito.find(item => item.id === id);
                if (producto) {
                producto.cantidad++;
                actualizarCarrito();
                }
            });
        });

        

        document.querySelectorAll('.menos').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const producto = carrito.find(item => item.id === id);
                if (producto && producto.cantidad > 1) {
                    producto.cantidad--;
                    actualizarCarrito();
                } else if (producto && producto.cantidad === 1) {
                    // Si llega a 1 y se presiona, elimina el producto
                    eliminarDelCarrito(id);
                }
            });
        });

        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                eliminarDelCarrito(id);
            });
        });
    }

    // Función auxiliar para eliminar el producto por completo
    function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
        mostrarToast(`❌ Producto eliminado del carrito.`);
        actualizarCarrito();
    }
    
    // ==========================================
    // 4. EVENT LISTENERS GENERALES
    // ==========================================

    btnCarrito.addEventListener('click', () => {
        carritoPanel.classList.toggle('abierto');
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        mostrarToast(`🗑️ Carrito vaciado completamente.`);
        actualizarCarrito();
    });

    // Iniciar
    renderizarProductos();
    actualizarCarrito();

    // ==========================================
    // 5. MANEJO DEL FORMULARIO DE CONTACTO
    // ==========================================

    const formularioContacto = document.getElementById('contact-form');
    const nombreInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('msj');

    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío tradicional
            validarYEnviarFormulario();

            function validarYEnviarFormulario() {
        const nombreValor = nombreInput.value.trim();
        const emailValor = emailInput.value.trim();
        const mensajeValor = mensajeInput.value.trim();

        // Validación simple: verificar que los campos requeridos no estén vacíos
        if (nombreValor === '' || emailValor === '' || mensajeValor === '') {
            mostrarToast("⚠️ Por favor, completa todos los campos del formulario.", 'error');
            return;
        }

        // Validación básica de formato de email (regex simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValor)) {
            mostrarToast("❌ Introduce un formato de correo electrónico válido.", 'error');
            return;
        }

        // Si la validación es exitosa:
        
        // 1. Mostrar mensaje de éxito (simulando el envío)
        mostrarToast("✅ ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.", 'success');
        
        // 2. Opcional: Limpiar los campos del formulario
        nombreInput.value = '';
        emailInput.value = '';
        mensajeInput.value = '';

        
    // ==========================================
    // 6. FLUJO DE COMPRA, REDIRECCIÓN Y CIERRE DE CARRITO
    // ==========================================

    const finalizarCompraBtn = document.getElementById('finalizarCompraBtn');

    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                mostrarToast("⚠️ Tu carrito está vacío. Agrega productos antes de comprar.");
                return;
            }

            // 1. Simulación del procesamiento de pago exitoso

            // 2. **Cerrar la ventana del carrito** inmediatamente
            carritoPanel.classList.remove('abierto'); // Utiliza la referencia 'carritoPanel'

            // 3. Vaciar el carrito después de la "compra" exitosa
            carrito = [];
            guardarCarrito();
            actualizarCarrito(); // Refresca la vista para mostrar el carrito vacío
            
            mostrarToast("🎉 ¡Compra procesada con éxito! Redirigiendo...");

            // 4. Redirigir a la página de confirmación
            setTimeout(() => {
                // Usamos la ruta relativa para asegurar que funcione desde index.html
                
                window.location.href = './pages/pago_exitoso.html';  
            }, 500); 
        });
    }

    }
        });
    }

}); 