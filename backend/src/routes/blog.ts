import { Hono } from 'hono';

export const blogRouter = new Hono();

blogRouter.post('/', (c) => {
  return c.json({ msg: 'blog post' });
});

blogRouter.put('/', (c) => {
  return c.json({ msg: 'edit blog' });
});

blogRouter.get('/:id', (c) => {
  return c.json({ msg: 'get single blog' });
});

blogRouter.get('/bulk', (c) => {
  return c.json({ msg: 'signin' });
});
