# Portfolio

## Despliegue en Vercel

Este proyecto está preparado para desplegarse en Vercel como un sitio estático con una función serverless de Python que gestiona el formulario de contacto.

### Archivos clave

- `vercel.json`: configuraciones de build y rutas.
- `api/contact.py`: función serverless de Python para procesar el formulario de contacto.
- `requirements.txt`: dependencias Python necesarias para Vercel.

### Variables de entorno

Configura en Vercel una variable de entorno llamada `PASSWORD` con la contraseña del correo.

### Notas

- El frontend usa `/api/contact` para enviar los mensajes.
- El backend local `main.py` puede seguir usándose para pruebas, pero en Vercel se desplegará `api/contact.py`.
