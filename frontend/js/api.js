const BASE_API_URL = "http://localhost:5240/api/"; // URL base del backend

// Función para registrar una nueva adquisición
async function registrarAdquisicion(adquisicion) {
    try {
        const response = await fetch(BASE_API_URL + "adquisiciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adquisicion)
        });

        if (!response.ok) {
            throw new Error("Error al registrar la adquisición");
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Función para consultar las adquisiciones
async function getData() {
    try {
        const response = await fetch(BASE_API_URL + "adquisiciones", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getData:", error);
        throw error;
    }
}

// Función para cambiar el estado activo de un registro
async function cambiarEstadoActivo(id, nuevoEstado) {
    try {
        const response = await fetch(BASE_API_URL + `adquisiciones/${id}/activo`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoEstado),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar: ${response.statusText}`);
        }

        return { success: true, message: "Estado actualizado correctamente" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Función para modificar un registro de adquisiciones
async function actualizarAdquisicion(id, adquisicionActualizada) {
    try {
        const response = await fetch(BASE_API_URL + `adquisiciones/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adquisicionActualizada),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la adquisición");
        }

        return { success: true, message: "Adquisición actualizada con éxito" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Función para consultar el historial de cambios
async function getHistorial() {
    try {
        const response = await fetch(BASE_API_URL + "historialcambios", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getHistorial:", error);
        throw error;
    }
}