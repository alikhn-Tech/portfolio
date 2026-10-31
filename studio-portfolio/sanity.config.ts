import {defineConfig} from 'sanity'
import {structureTool, type StructureBuilder} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Ali Khan \u2014 Blog Studio',

  projectId: 'ktndwv6h',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  structure: (S: StructureBuilder) =>
    S.list()
      .title('Content')
      .items([
        S.documentTypeListItem('post').title('Blog Articles'),
        S.divider(),
        S.documentTypeListItem('category').title('Categories'),
        S.documentTypeListItem('tag').title('Tags'),
        S.documentTypeListItem('author').title('Authors'),
      ]),
})
