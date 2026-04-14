import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared/events': path.resolve(__dirname, '../packages/events/src'),
      '@shared/domain': path.resolve(__dirname, '../packages/domain/src'),
      '@shared/api': path.resolve(__dirname, '../packages/api/src'),
      '@shared/services': path.resolve(__dirname, '../packages/services/src'),
    },
  },
})