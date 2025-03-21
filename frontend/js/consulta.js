//document.addEventListener("DOMContentLoaded", function () {
let adquisiciones = [
    { id: 1, presupuesto: 10000000, unidad: "Dirección de Salud", tipo: "Medicamentos", cantidad: 1000, valorUni: 5000, valorTot: 5000000, proveedor: "Laboratorios Bayer", fechaAdq: "2023-07-20", fechaMod: "2025-03-19", activo: true, documentos: "", },
    { id: 2, presupuesto: 5000000, unidad: "Secretaría de Infraestructura", tipo: "Medicamentos", cantidad: 1000, valorUni: 5000, valorTot: 5000000, proveedor: "ConstrucSA", fechaAdq: "2023-08-10", fechaMod: "2025-03-19", activo: true, documentos: "", },
    { id: 3, presupuesto: 12000000, unidad: "Tecnologías y Comunicaciones", tipo: "Medicamentos", cantidad: 1000, valorUni: 5000, valorTot: 5000000, proveedor: "TechCorp", fechaAdq: "2023-09-05", fechaMod: "2025-03-19", activo: true, documentos: "", },
    { id: 4, presupuesto: 12000000, unidad: "Tecnologías y Comunicaciones", tipo: "Medicamentos", cantidad: 1000, valorUni: 5000, valorTot: 5000000, proveedor: "TechCorp", fechaAdq: "2023-09-06", fechaMod: "2025-03-19", activo: false, documentos: "", },
    { id: 5, presupuesto: 12000000, unidad: "Tecnologías y Comunicaciones", tipo: "Medicamentos", cantidad: 1000, valorUni: 5000, valorTot: 5000000, proveedor: "TechCorp", fechaAdq: "2023-09-07", fechaMod: "2025-03-19", activo: true, documentos: "", },
    { id: 6, presupuesto: 12000000, unidad: "Tecnologías y Comunicaciones", tipo: "Medicamentos", cantidad: 1000, valorUni: 5000, valorTot: 5000000, proveedor: "TechCorp", fechaAdq: "2023-09-08", fechaMod: "2025-03-19", activo: true, documentos: "", },
];


async function cargarData() {
    try {
        adquisiciones = await getData();
        console.log("Data desde servicio", adquisiciones);
        adquisiciones.forEach(a => {
            a.fechaAdq = (new Date(a.fechaAdq)).toISOString().split('T')[0];
            a.fechaMod = (new Date(a.fechaMod)).toISOString().split('T')[0];
        });
        mostrarAdquisiciones(adquisiciones);
        cargarOpcionesFiltros(adquisiciones);
    } catch (error) {
        alert("Error al cargar la data!");
    }
}

cargarData();

const tabla = document.getElementById("resultadosTabla");


function mostrarAdquisiciones(lista) {
    console.log("mostrarAdquisiciones", lista);

    tabla.innerHTML = "";
    lista.forEach(adq => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${adq.id}</td>
                <td>$${adq.presupuesto.toLocaleString()}</td>
                <td>${adq.unidad}</td>
                <td>${adq.tipo}</td>
                <td>$${adq.valorTot.toLocaleString()}</td>
                <td>${adq.proveedor}</td>
                <td>${adq.fechaAdq}</td>
                <td>${adq.fechaMod}</td>
                <td>
                    <button class="btn btn-sm btn-icon btn-info" onclick="verAdquisicion(${adq.id}, false)" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver Detalles">
                        <i class="bi bi-eye"></i>
                    </button>
                    ${adq.activo ?
                `<button class="btn btn-sm btn-icon btn-warning" onclick="verAdquisicion(${adq.id}, true)" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-icon btn-danger" onclick="desactivarAdquisicion(this, ${adq.id})" data-bs-toggle="tooltip" data-bs-placement="top" title="Desactivar">
                        <i class="bi bi-x-circle"></i>
                    </button>` : ``
            }
                </td>
            `;
        tabla.appendChild(fila);
    });
}

mostrarAdquisiciones(adquisiciones);


// Inicialización del slider de presupuesto
const sliderPresupuesto = document.getElementById('sliderPresupuesto');
const presupuestoMin = document.getElementById('presupuestoMin');
const presupuestoMax = document.getElementById('presupuestoMax');
noUiSlider.create(sliderPresupuesto, {
    start: [100000, 10000000], // Valores iniciales
    step: 1,
    connect: true,
    range: {
        'min': 0,
        'max': 10000000
    },
    tooltips: false,
    format: {
        // to: (value) => `$${value.toLocaleString()}`,
        to: (value) => parseInt(value),
        from: (value) => Number(value.replace(/[$,]/g, ''))
    }
});

// Evento para actualizar valores
sliderPresupuesto.noUiSlider.on('update', function (values) {
    presupuestoMin.value = values[0];
    presupuestoMax.value = values[1];
});
presupuestoMin.addEventListener('change', actualizarSliderPresupuesto);
presupuestoMax.addEventListener('change', actualizarSliderPresupuesto);

function actualizarSliderPresupuesto() {
    let min = parseInt(presupuestoMin.value) || 0;
    let max = parseInt(presupuestoMax.value) || 10000000;
    if (min > max) {
        min = max;
    }
    sliderPresupuesto.noUiSlider.set([min, max]);
}


// Inicialización del slider de valor total
const sliderValortotal = document.getElementById('sliderValortotal');
const valortotalMin = document.getElementById('valortotalMin');
const valortotalMax = document.getElementById('valortotalMax');
noUiSlider.create(sliderValortotal, {
    start: [0, 10000000], // Valores iniciales
    step: 1,
    connect: true,
    range: {
        'min': 0,
        'max': 10000000
    },
    tooltips: false,
    format: {
        // to: (value) => `$${value.toLocaleString()}`,
        to: (value) => parseInt(value),
        from: (value) => Number(value.replace(/[$,]/g, ''))
    }
});

// Evento para actualizar valores
sliderValortotal.noUiSlider.on('update', function (values) {
    valortotalMin.value = values[0];
    valortotalMax.value = values[1];
});
valortotalMin.addEventListener('change', actualizarSliderValortotal);
valortotalMax.addEventListener('change', actualizarSliderValortotal);

function actualizarSliderValortotal() {
    let min = parseInt(valortotalMin.value) || 0;
    let max = parseInt(valortotalMax.value) || 10000000;
    if (min > max) {
        min = max;
    }
    sliderValortotal.noUiSlider.set([min, max]);
}


function cargarOpcionesFiltros(lista, inicio = true) {
    const valores = lista.reduce((acc, item) => {
        acc.presupuesto.min = Math.min(acc.presupuesto.min, item.presupuesto);
        acc.presupuesto.max = Math.max(acc.presupuesto.max, item.presupuesto);

        acc.cantidad.min = Math.min(acc.cantidad.min, item.cantidad);
        acc.cantidad.max = Math.max(acc.cantidad.max, item.cantidad);

        acc.valorUni.min = Math.min(acc.valorUni.min, item.valorUni);
        acc.valorUni.max = Math.max(acc.valorUni.max, item.valorUni);

        acc.valorTot.min = Math.min(acc.valorTot.min, item.valorTot);
        acc.valorTot.max = Math.max(acc.valorTot.max, item.valorTot);

        // Agregar valores únicos a conjuntos (Set)
        acc.unidad.add(item.unidad);
        acc.tipo.add(item.tipo);
        acc.proveedor.add(item.proveedor);

        return acc;
    }, {
        presupuesto: { min: Infinity, max: -Infinity },
        cantidad: { min: Infinity, max: -Infinity },
        valorUni: { min: Infinity, max: -Infinity },
        valorTot: { min: Infinity, max: -Infinity },
        unidad: new Set(),
        tipo: new Set(),
        proveedor: new Set(),
    });

    // Convertir Sets a arrays
    let resultado = {
        presupuesto: valores.presupuesto,
        cantidad: valores.cantidad,
        valorUni: valores.valorUni,
        valorTot: valores.valorTot,
        unidad: [...valores.unidad],
        tipo: [...valores.tipo],
        proveedor: [...valores.proveedor]
    };

    // Actualizar slider presupuesto
    sliderPresupuesto.noUiSlider.updateOptions({
        start: [resultado.presupuesto.min, resultado.presupuesto.max],
        range: {
            'min': resultado.presupuesto.min,
            'max': resultado.presupuesto.max
        }
    });

    // Actualizar slider valor total 
    sliderValortotal.noUiSlider.updateOptions({
        start: [resultado.valorTot.min, resultado.valorTot.max],
        range: {
            'min': resultado.valorTot.min,
            'max': resultado.valorTot.max
        }
    });

    function obtenerSeleccionadosTiempoReal() {
        const checkboxes = document.querySelectorAll("#checkboxContainer input[type='checkbox']");
        checkboxes.forEach(cb => {
            cb.addEventListener("change", () => {
                const seleccionados = Array.from(document.querySelectorAll("#checkboxContainer input[type='checkbox']:checked"))
                    .map(cb => cb.value);
                console.log("Seleccionados:", seleccionados);
            });
        });
    }

    function generarCheckboxes(opciones, containerId) {
        const lista = document.getElementById(containerId);
        lista.innerHTML = "";
        opciones.forEach(opcion => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.value = opcion;
            checkbox.name = "opciones";
            // if (inicio) checkbox.checked = true;
            checkbox.style.marginRight = "8px";

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(opcion));
            lista.appendChild(label);
            lista.appendChild(document.createElement("br"));
        });
    }

    // Actualizar lista unidad
    generarCheckboxes(resultado.unidad, "listaUnidad");

    // Actualizar lista tipo
    generarCheckboxes(resultado.tipo, "listaTipo");

    // Actualizar lista proveedor
    generarCheckboxes(resultado.proveedor, "listaProveedor");
}

cargarOpcionesFiltros(adquisiciones);

// Función para aplicar los filtros
function aplicarFiltros() {
    let minPresupuesto = parseInt(document.getElementById("presupuestoMin").value) || 0;
    let maxPresupuesto = parseInt(document.getElementById("presupuestoMax").value) || Infinity;
    let minValorTotal = parseInt(document.getElementById("valortotalMin").value) || 0;
    let maxValorTotal = parseInt(document.getElementById("valortotalMax").value) || Infinity;
    let fechaInicioAdq = document.getElementById("fechaAdqInicio").value || "0000-00-00";
    let fechaFinAdq = document.getElementById("fechaAdqFin").value || "9999-12-31";
    let fechaInicioMod = document.getElementById("fechaModInicio").value || "0000-00-00";
    let fechaFinMod = document.getElementById("fechaModFin").value || "9999-12-31";

    let unidadesSeleccionadas = Array.from(document.querySelectorAll("#listaUnidad input:checked")).map(cb => cb.value);
    let tiposSeleccionados = Array.from(document.querySelectorAll("#listaTipo input:checked")).map(cb => cb.value);
    let proveedoresSeleccionados = Array.from(document.querySelectorAll("#listaProveedor input:checked")).map(cb => cb.value);

    let adquisicionesFiltradas = adquisiciones.filter(adq => {
        return (
            adq.presupuesto >= minPresupuesto && adq.presupuesto <= maxPresupuesto &&
            adq.valorTot >= minValorTotal && adq.valorTot <= maxValorTotal &&
            (unidadesSeleccionadas.length === 0 || unidadesSeleccionadas.includes(adq.unidad)) &&
            (tiposSeleccionados.length === 0 || tiposSeleccionados.includes(adq.tipo)) &&
            (proveedoresSeleccionados.length === 0 || proveedoresSeleccionados.includes(adq.proveedor)) &&
            (adq.fechaAdq >= fechaInicioAdq && adq.fechaAdq <= fechaFinAdq) &&
            (adq.fechaMod >= fechaInicioMod && adq.fechaMod <= fechaFinMod)
        );
    });

    mostrarAdquisiciones(adquisicionesFiltradas);
}

document.getElementById("btnAplicarFiltros").addEventListener("click", aplicarFiltros);

// Inicializar tooltips después de agregar los elementos dinámicamente
let tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));



function verAdquisicion(id, editar = false) {
    // Buscar el registro en la lista
    const adquisicion = adquisiciones.find(adq => adq.id === id);
    if (!adquisicion) return;

    // Llenar el modal con los datos del registro
    document.getElementById("editPresupuesto").value = adquisicion.presupuesto;
    document.getElementById("editUnidad").value = adquisicion.unidad;
    document.getElementById("editTipo").value = adquisicion.tipo;
    document.getElementById("editCantidad").value = adquisicion.cantidad;
    document.getElementById("editValorUnitario").value = adquisicion.valorUni;
    document.getElementById("editValorTotal").value = adquisicion.valorTot;
    document.getElementById("editProveedor").value = adquisicion.proveedor;
    document.getElementById("editFecha").value = adquisicion.fechaAdq;
    document.getElementById("editPresupuesto").disabled = editar ? false : true;
    document.getElementById("editUnidad").disabled = editar ? false : true;
    document.getElementById("editTipo").disabled = editar ? false : true;
    document.getElementById("editCantidad").disabled = editar ? false : true;
    document.getElementById("editValorUnitario").disabled = editar ? false : true;
    document.getElementById("editValorTotal").disabled = editar ? false : true;
    document.getElementById("editProveedor").disabled = editar ? false : true;
    document.getElementById("editFecha").disabled = editar ? false : true;

    // Guardar el ID en un atributo para usarlo después
    document.getElementById("guardarCambios").setAttribute("data-id", id);
    if (!editar) {
        document.getElementById("guardarCambios").style.display = "none";
        document.getElementById("cancelarModal").innerText = "Aceptar";
    } else {
        document.getElementById("guardarCambios").style.display = "flex";
        document.getElementById("cancelarModal").innerText = "Cancelar";
    }

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById("modalAdquisicion"));
    modal.show();
}

async function desactivarAdquisicion(button, id) {
    console.log("desactivarAdquisicion", id, button);

    // Buscar el registro en la lista
    const adquisicionInd = adquisiciones.findIndex(adq => adq.id === id);
    if (adquisicionInd < 0) return;

    await cambiarEstadoActivo(adquisiciones[adquisicionInd].id, false);
    adquisiciones[adquisicionInd].activo = false;

    // Obtener la instancia del tooltip
    let tooltip = bootstrap.Tooltip.getInstance(button);
    if (tooltip) {
        tooltip.dispose();
    }

    mostrarAdquisiciones(adquisiciones);
}

document.getElementById("guardarCambios").addEventListener("click", async function () {
    const id = this.getAttribute("data-id");
    const index = adquisiciones.findIndex(adq => adq.id == id);
    if (index === -1) return;

    // Actualizar los valores
    adquisiciones[index].presupuesto = Number(document.getElementById("editPresupuesto").value);
    adquisiciones[index].unidad = document.getElementById("editUnidad").value;
    adquisiciones[index].tipo = document.getElementById("editTipo").value;
    adquisiciones[index].cantidad = Number(document.getElementById("editCantidad").value);
    adquisiciones[index].valorUni = Number(document.getElementById("editValorUnitario").value);
    adquisiciones[index].valorTot = Number(document.getElementById("editValorTotal").value);
    adquisiciones[index].proveedor = document.getElementById("editProveedor").value;
    adquisiciones[index].fechaAdq = document.getElementById("editFecha").value;
    const today = new Date();
    adquisiciones[index].fechaMod = today.toISOString().split('T')[0];


    try {
        await actualizarAdquisicion(id, adquisiciones[index]);
        alert("Adquisición con ID="+id+", se actualizó correctamente");
    } catch (error) {
        alert("No se pudo actualizar la adquisición con ID=" + id);
    }


    // Recargar la tabla
    mostrarAdquisiciones(adquisiciones);

    cargarOpcionesFiltros(adquisiciones, false);

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalAdquisicion"));
    modal.hide();
});

document.getElementById("editCantidad").addEventListener("input", function () {
    document.getElementById("editValorTotal").value = Number(document.getElementById("editCantidad").value * document.getElementById("editValorUnitario").value);
});

document.getElementById("editValorUnitario").addEventListener("input", function () {
    document.getElementById("editValorTotal").value = Number(document.getElementById("editCantidad").value * document.getElementById("editValorUnitario").value);
});

//});
