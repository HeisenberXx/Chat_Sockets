/**
 * Carga un componente HTML desde una URL y lo inserta en un div contenedor.
 * @param {string} idContainer El ID del elemento HTML donde se insertará el componente.
 * @param {string} url La ruta al archivo .html del componente.
 */

export async function loadComponent(idContainer, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const html = await response.text();
        const container = document.getElementById(idContainer);
        if (container) {
            container.innerHTML = html;
        } else {
            console.error(`Error: El contenedor con id '${idContainer}' no fue encontrado.`);
        }
    } catch (error) {
        console.error(`No se pudo cargar el componente desde '${url}':`, error);
    }
}