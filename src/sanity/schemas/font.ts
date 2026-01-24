export default {
  name: 'font',
  title: 'Font Family',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'price', type: 'string', title: 'Price' },
    { name: 'image', type: 'image', title: 'Image' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
  ],
};
