# 📌 Prueba Técnica ADRES

Este proyecto es una aplicación web desarrollada con **HTML, CSS y JavaScript puro** en el frontend, y **.NET con SQLite** en el backend.

## 📂 Estructura del Proyecto

```
prueba-tecnica-adres/
│── backend/                 # API desarrollada con .NET
│   ├── Controllers/         # Controladores de la API
│   ├── Models/              # Modelos de datos
│   ├── Data/                # Configuración de la base de datos
│   ├── Program.cs           # Configuración del servidor
│   ├── ...                  # Otros archivos de configuración
│
│── frontend/                # Interfaz de usuario
│   ├── index.html           # Página principal
│   ├── styles.css           # Estilos CSS
│   ├── scripts/
│   │   ├── api.js           # Módulo para consumir la API
│   │   ├── main.js          # Scripts principales
│   ├── ...                  # Otros archivos del frontend
│
└── README.md                # Documentación del proyecto
```

---

## 🚀 Configuración y Ejecución

### 🖥️ Backend (.NET + SQLite)

#### **1️⃣ Clonar el repositorio**
```sh
git clone https://github.com/Esteban9218/prueba-tecnica-adres.git
cd prueba-tecnica-adres/backend
```

#### **2️⃣ Configurar SQLite**
El proyecto usa **SQLite** como base de datos, asegurémonos de ejecutar las migraciones:
```sh
dotnet ef database update
```

#### **3️⃣ Ejecutar la API**
```sh
dotnet run
```
La API se iniciará en `http://localhost:5240` (puede variar según la configuración).

Se puede verificar la documentación de Swagger en `http://localhost:5240/swagger/`.

---

### 🌍 Frontend (HTML, CSS y JavaScript)

#### **1️⃣ Abrir el archivo `index.html`**
Para probar la aplicación, simplemente abre el archivo en el navegador:
```
frontend/index.html
```

Si deseas levantar un servidor local, puedes usar Python:
```sh
cd frontend
python -m http.server 8000
```
Y luego acceder en `http://localhost:8000`

---

## 🔥 Endpoints de la API

| Método | Endpoint                     | Descripción                                |
|--------|------------------------------|--------------------------------------------|
| GET    | `/api/adquisiciones`         | Obtener todas las adquisiciones           |
| GET    | `/api/adquisiciones/{id}`    | Obtener una adquisición por ID            |
| POST   | `/api/adquisiciones`         | Crear una nueva adquisición               |
| PUT    | `/api/adquisiciones/{id}`    | Actualizar una adquisición existente      |
| DELETE | `/api/adquisiciones/{id}`    | Eliminar una adquisición                  |
| GET    | `/api/historial`             | Obtener historial de cambios              |

---

## ✅ Pruebas con Postman

Para probar la API con **Postman**, sigue estos pasos:
1. Abre **Postman** y crea una nueva colección.
2. Agrega los endpoints mencionados en la tabla anterior.
3. Envía solicitudes con los datos en formato JSON.

Ejemplo de **POST** para crear una adquisición:
```json
{
  "presupuesto": 50000,
  "unidad": "Unidad 1",
  "tipo": "Compra",
  "cantidad": 10,
  "valorUni": 5000,
  "proveedor": "Proveedor X",
  "activo": true
}
```

---

## 📜 Licencia
Este proyecto es de uso libre para propósitos educativos y de aprendizaje.

📌 **Autor:** Esteban9218

