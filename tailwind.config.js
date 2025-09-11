/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["cupcake", "dark"], // Temas que quieres usar. 'cupcake' se usará por defecto.
    darkTheme: "dark", // Tema que se usará cuando el sistema operativo esté en modo oscuro.
    base: true, // aplica estilos base (recomendado)
    styled: true, // aplica estilos de componentes (recomendado)
    utils: true, // aplica utilidades responsivas y de modificadores (recomendado)
    logs: true, // Muestra logs de daisyUI en la consola (opcional)
  },
}
