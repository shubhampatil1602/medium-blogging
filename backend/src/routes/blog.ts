import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {
  createBlogInput,
  updateBlogInput,
} from '@shubhamspatilnbr/blogging-website-common';
import { Hono } from 'hono';
import { decode, sign, verify } from 'hono/jwt';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware
blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('authorization') || '';

  const secret = c.env.JWT_SECRET;
  try {
    const user = await verify(authHeader, secret);
    if (user) {
      c.set('userId', user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: 'Unauthorized' });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: 'You are not logged in.', error });
  }
});

blogRouter.post('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: 'Inputs are incorrect.',
    });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({ id: post.id });
});

blogRouter.put('/', async (c) => {
  const userid = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: 'Inputs are incorrect.',
    });
  }
  await prisma.post.update({
    where: {
      id: body.id,
      authorId: userid,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.text('Update Blog');
});

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.findMany();
  return c.json(post);
});

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return c.json(post);
  } catch (error) {
    c.status(411);
    return c.json({ message: 'Something went wrong.' });
  }
});
