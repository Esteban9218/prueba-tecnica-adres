document.getElementById("documentacion").addEventListener("change", function () {
    let fileNames = Array.from(this.files).map(file => file.name).join(", ");
    document.getElementById("fileNames").textContent = fileNames || "No se ha seleccionado ningún archivo";
});

document.getElementById("cantidad").addEventListener("input", function () {
    document.getElementById("valorTotal").value = Number(document.getElementById("cantidad").value * document.getElementById("valorUnitario").value);
});

document.getElementById("valorUnitario").addEventListener("input", function () {
    document.getElementById("valorTotal").value = Number(document.getElementById("cantidad").value * document.getElementById("valorUnitario").value);
});

function showToast(message, type = "success", duration = 3000) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, duration);
}

// function showToast(message, type = "success", duration = 3000) {
//     const toastEl = document.getElementById("toastRegistro");
//     const toastMessage = document.getElementById("toastMessage");

//     // Cambia el mensaje
//     toastMessage.textContent = message;

//     // Cambia el color según el tipo de mensaje
//     toastEl.className = `toast align-items-center text-white bg-${type} border-0`;

//     // Mostrar el toast con Bootstrap
//     const toast = new bootstrap.Toast(toastEl, { delay: duration });
//     toast.show();
// }

document.getElementById("formRegistro").addEventListener("submit", async function(event) {
    event.preventDefault();

    const adquisicion = {
        presupuesto: Number(document.getElementById("presupuesto").value),
        unidad: document.getElementById("unidad").value,
        tipo: document.getElementById("tipo").value,
        cantidad: Number(document.getElementById("cantidad").value),
        valorUni: Number(document.getElementById("valorUnitario").value),
        valorTot: Number(document.getElementById("valorTotal").value),  
        proveedor: document.getElementById("proveedor").value,
        fechaAdq: document.getElementById("fecha").value,
    };

    console.log("adquisicion to send", adquisicion);

    try {
        await registrarAdquisicion(adquisicion);
        setTimeout(() => {
            document.getElementById("formRegistro").reset();
            document.getElementById("fileNames").textContent = "No se ha seleccionado ningún archivo";    
        }, 1000);
        showToast("Registro exitoso", "success", 3000);
    } catch (error) {
        showToast("Error al registrar", "error", 5000);
    }
});
