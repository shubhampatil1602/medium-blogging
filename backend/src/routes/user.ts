import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import {
  signinInput,
  signupInput,
} from '@shubhamspatilnbr/blogging-website-common';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: 'Inputs are incorrect.',
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      c.env.JWT_SECRET
    );
    return c.json(token);
  } catch (error) {
    c.status(403);
    return c.json({ err: 'Error Signing in.', error });
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: 'Inputs are incorrect.',
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: 'user not found.' });
  }

  const token = await sign(
    { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    c.env.JWT_SECRET
  );
  return c.json(token);
});

userRouter.get('/logout', async (c) => {
  return c.json({ message: 'Logout Successfull.' });
});
