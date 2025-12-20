import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
    plugins:[ react() ,tailwindcss(),
        tsconfigPaths()
    ]
});