# SmartPulse

SmartPulse es una aplicación de monitoreo de sensores para entornos agrícolas y logísticos. La aplicación permite visualizar en tiempo real los datos de diversos sensores como temperatura, humedad, movimiento, CO2 y luminosidad.

## Características

- **Interfaz moderna y responsiva**: Diseño adaptable a diferentes dispositivos con soporte para modo oscuro y claro.
- **Monitoreo en tiempo real**: Actualización automática de datos cada 3 segundos.
- **Organización por secciones**: Visualización de sensores agrupados por ubicación (invernaderos, almacenes, etc.).
- **Visualización de datos**: Gráficos interactivos para cada sensor que muestran su historial.
- **Sistema de autenticación**: Acceso seguro al dashboard mediante email y contraseña.
- **Indicadores de estado**: Visualización clara del estado de cada sensor (normal, advertencia, crítico).

## Tecnologías utilizadas

- React
- TypeScript
- Tailwind CSS
- Recharts (para gráficos)
- Git y GitHub

## Instalación

1. Clona el repositorio:

   ```
   git clone https://github.com/romeroalan26/smartpulse.git
   ```

2. Instala las dependencias:

   ```
   cd smartpulse
   npm install
   ```

3. Inicia la aplicación:
   ```
   npm start
   ```

## Estructura del proyecto

- `src/App.tsx`: Componente principal que contiene la lógica de la aplicación y la interfaz de usuario.
- `src/Login.tsx`: Componente para la autenticación de usuarios.

## Uso

1. Inicia sesión con cualquier email y contraseña (en esta versión de demostración).
2. Navega entre las secciones "Campo Agrícola" y "Almacén Logístico" usando el panel lateral.
3. Expande o colapsa las diferentes zonas para ver los sensores correspondientes.
4. Cambia entre modo oscuro y claro usando el botón en el panel lateral.
5. Cierra sesión cuando hayas terminado.

## Licencia

Este proyecto está bajo la Licencia MIT.
