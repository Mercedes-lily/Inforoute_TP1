// import { defineConfig } from 'vite'
// import tsconfigPaths from 'vite-tsconfig-paths'
// export default defineConfig({
//     plugins:[
//         tsconfigPaths()
//     ]
// });
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})