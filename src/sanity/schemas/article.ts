export default {
  name: 'article',
  title: 'Foundry Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
  ],
};
