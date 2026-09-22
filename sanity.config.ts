import { defineConfig } from 'sanity'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'dattstudio-studio',
  title: 'Datt Studio Studio',
  // Change process.env to import.meta.env
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'd9mob5o5',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [],
  schema: {
    types: schemaTypes,
  },
})
