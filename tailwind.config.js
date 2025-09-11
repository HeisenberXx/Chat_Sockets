import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}", // Escanea todos los archivos .html y .js en la carpeta src
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["dracula"], // Asegura que el tema que usas esté aquí
  },
}
