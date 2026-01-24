import { defineConfig } from 'sanity'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'dattstudio-studio',
  title: 'Datt Studio Studio',
  projectId: process.env.SANITY_PROJECT_ID || 'xxxxxx',
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [],
  schema: {
    types: schemaTypes,
  },
})
