import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

userRouter.post('/signup', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.json({ msg: 'signup' });
});

userRouter.post('/signin', (c) => {
  return c.json({ msg: 'signin' });
});
