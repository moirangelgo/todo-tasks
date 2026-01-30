# 📝 Todo-Tasks App

![Django](https://img.shields.io/badge/Django-6.0.1-092e20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6.2.2-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🛠️ Stack Tecnológico

### Backend
- **Framework:** [Django 6.0](https://www.djangoproject.com/)
- **API:** [Django REST Framework](https://www.django-rest-framework.org/)
- **Base de Datos:** SQLite (desarrollo)
- **Autenticación:** Personalizada basada en Email.

### Frontend
- **Librería:** [React 19](https://react.dev/)
- **Herramienta de Construcción:** [Vite](https://vitejs.dev/)
- **Diseño de Interfaz:** [Ant Design (Antd)](https://ant.design/)
- **Iconos:** Ant Design Icons
- **Cliente HTTP:** Axios

### Despliegue
- **Contenerización:** Docker & Docker Compose

---

## 📦 Módulos del Proyecto

### 🔹 Backend (`/todo`)
El núcleo de la aplicación, encargado de la lógica de negocio, persistencia de datos y seguridad.
- **Modelos:** Usuarios personalizados, Categorías y Tareas.
- **Validaciones:** Restricción de color único para tareas por usuario.
- **API:** Endpoints RESTful para la gestión completa de tareas y categorías.

### 🔹 Frontend (`/front`)
Una interfaz de usuario intuitiva y reactiva.
- **Dashboard:** Visualización y gestión de tareas.
- **Formularios:** Creación y edición con validaciones dinámicas.
- **Componentes:** Basados en los estándares de Ant Design para una experiencia profesional.

---

## 🚀 Instrucciones de Ejecución

La forma más rápida y sencilla de poner en marcha el proyecto es utilizando **Docker Compose**.

### Requisitos Previos
- Tener instalado [Docker](https://www.docker.com/get-started)
- Tener instalado [Docker Compose](https://docs.docker.com/compose/install/)

### Pasos para ejecutar

1.  **Clonar el repositorio** (si no lo has hecho ya):
    ```bash
    git clone <url-del-repositorio>
    cd todo-tasks
    ```

2.  **Levantar los servicios:**
    Ejecuta el siguiente comando en la raíz del proyecto:
    ```bash
    docker-compose up --build
    ```

3.  **Acceder a la aplicación:**
    - **Frontend:** [http://localhost:8080](http://localhost:8080)
    - **Backend API:** [http://localhost:8000/v1/](http://localhost:8000/v1/)

> **Nota:** El contenedor del backend ejecutará automáticamente las migraciones de la base de datos al iniciar.

---

## 📂 Estructura del Proyecto

```text
.
├── front/              # Código fuente del Frontend (React + Vite)
│   ├── src/            # Componentes, páginas y servicios
│   └── Dockerfile      # Configuración de Docker para el frontend
├── todo/               # Código fuente del Backend (Django)
│   ├── api/            # App principal de la API
│   ├── tasks/          # Configuración del proyecto Django
│   └── Dockerfile      # Configuración de Docker para el backend
├── docker-compose.yml  # Orquestación de contenedores
└── README.md           # Documentación del proyecto
```

---

## 👨‍💻 Desarrollo

Si deseas ejecutar los tests del backend de forma local:
```bash
cd todo
pip install -r requirements.txt
pytest
python3 manage.py runserver
```

Para el frontend:
```bash
cd front
npm install
npm run dev
```
