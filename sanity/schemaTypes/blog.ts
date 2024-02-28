export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug of your blog article',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'smallDescription',
            type: 'text',
            title: 'Small Description',
          },
        {
            name: 'titleImage',
            type: 'image',
            title: 'Title image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'publishedAt',
            type: 'datetime',
            title: 'Published at'
        },
        {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
                { type: 'block' },
            ]
        }
    ],
}