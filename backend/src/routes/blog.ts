import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { authMiddleware } from '../authMiddleware';
import { createBlogInput, updateBlogInput } from 'ssp-blogging-common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Create a blog post.
blogRouter.post('/', authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: 'Inputs are incorrect.' });
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get('userId'),
        published: true,
      },
    });
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Failed to create blog.' });
  }
});

// update a blog post.
blogRouter.put('/:id', authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param('id');
  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: 'Inputs are incorrect.' });
  }
  try {
    const blog = await prisma.blog.update({
      where: {
        id: blogId,
        authorId: c.get('userId'),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id, msg: 'Blog updated successfully!' });
  } catch (error) {
    c.status(403);
    return c.json({ msg: 'Unauthorized or blog not found.' });
  }
});

// Get all the blog posts created by you.
blogRouter.get('/my-blogs', authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: c.get('userId'),
      },
    });

    if (blogs.length === 0) {
      return c.json({ msg: 'No blogs found. Start writing your first blog!' });
    }
    return c.json(blogs);
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Failed to retrieve blogs.' });
  }
});

// Get all the blog posts.
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany();
    return c.json(blogs);
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Failed to retrieve blogs.' });
  }
});

// Get a blog post by Id.
blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param('id');
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({ msg: 'Blog not found.' });
    }
    return c.json(blog);
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Failed to retrieve blog.' });
  }
});
