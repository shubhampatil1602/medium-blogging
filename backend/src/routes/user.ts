import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from 'ssp-blogging-common';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
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
    const checkUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (checkUser) {
      c.status(403);
      return c.json({ msg: 'User already exists.' });
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign(
      { id: user.id, name: user.name },
      c.env.JWT_SECRET
    );

    return c.json(token);
  } catch (e) {
    c.status(403);
    return c.json({ msg: 'Something went wrong.' });
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: 'Inputs are incorrect.',
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user?.email !== body.email || user?.password !== body.password) {
      c.status(403);
      return c.json({ error: 'Wrong credentials.' });
    }

    const token = await sign(
      { id: user?.id, name: user?.name },
      c.env.JWT_SECRET
    );
    return c.json(token);
  } catch (error) {
    c.status(403);
    return c.json({ msg: 'Something went wrong.' });
  }
});
