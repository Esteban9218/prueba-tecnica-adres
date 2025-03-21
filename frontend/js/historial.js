document.addEventListener("DOMContentLoaded", function () {
    let historial = [
        { id: 1, adqId: 1, usuario: "Usuario 1", campo: "Presupuesto", anterior: "$5000", nuevo: "$5500", fecha: "2025-03-20" },
        { id: 2, adqId: 1, usuario: "Usuario 2", campo: "Proveedor", anterior: "ABC Ltda.", nuevo: "XYZ Corp.", fecha: "2025-03-19" },
        { id: 3, adqId: 2, usuario: "Usuario 3", campo: "Fecha", anterior: "2025-03-10", nuevo: "2025-03-12", fecha: "2025-03-18" },
    ];

    const idFiltro = document.getElementById("idFiltro");
    const usuarioFiltro = document.getElementById("usuarioFiltro");
    const fechaDesde = document.getElementById("fechaDesde");
    const fechaHasta = document.getElementById("fechaHasta");
    const aplicarFiltros = document.getElementById("aplicarFiltros");
    const tablaHistorial = document.getElementById("tablaHistorial"); // Tabla donde se muestran los registros


    async function cargarData() {
        try {
            historial = await getHistorial();
            console.log("Data desde servicio", historial);
            historial.forEach(h => {
                h.fecha = (new Date(h.fecha)).toISOString().split('T')[0];
            });
            actualizarTabla(historial);
            cargarUsuarios();
        } catch (error) {
            alert("Error al cargar la data!");
        }
    }

    cargarData();

    function aplicarFiltro() {
        let idVal = idFiltro.value.trim();
        let usuarioVal = usuarioFiltro.value;
        let fechaDesdeVal = fechaDesde.value;
        let fechaHastaVal = fechaHasta.value;

        let filtrados = historial.filter(item => {
            let cumpleID = idVal ? item.adqId == idVal : true;
            let cumpleUsuario = usuarioVal ? item.usuario === usuarioVal : true;
            let cumpleFechaDesde = fechaDesdeVal ? new Date(item.fecha) >= new Date(fechaDesdeVal) : true;
            let cumpleFechaHasta = fechaHastaVal ? new Date(item.fecha) <= new Date(fechaHastaVal) : true;
            return cumpleID && cumpleUsuario && cumpleFechaDesde && cumpleFechaHasta;
        });

        actualizarTabla(filtrados);
    }

    function actualizarTabla(lista) {
        tablaHistorial.innerHTML = ""; // Limpia la tabla antes de agregar nuevos datos

        lista.forEach(item => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.id}</td>
                <td>${item.adqId}</td>
                <td>${item.usuario}</td>
                <td>${item.campo}</td>
                <td>${item.anterior}</td>
                <td>${item.nuevo}</td>
                <td>${new Date(item.fecha).toLocaleDateString()}</td>
            `;
            tablaHistorial.appendChild(fila);
        });
    }

    // Cargar usuarios en el select
    function cargarUsuarios() {
        let usuariosUnicos = [...new Set(historial.map(item => item.usuario))]; // Extrae usuarios únicos
        usuarioFiltro.innerHTML = `<option value="">Todos</option>`; // Opción por defecto

        usuariosUnicos.forEach(usuario => {
            let option = document.createElement("option");
            option.value = usuario;
            option.textContent = usuario;
            usuarioFiltro.appendChild(option);
        });
    }

    cargarUsuarios();

    aplicarFiltros.addEventListener("click", aplicarFiltro);

    actualizarTabla(historial);
});
