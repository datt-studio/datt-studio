export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: { accept: 'video/*' }
    },
    {
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
      description: 'e.g. Design, direction, strategy...'
    }
  ]
}
