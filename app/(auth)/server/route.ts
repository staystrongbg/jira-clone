import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { loginSchema, signupSchema } from '@/schemas';

//same chaining here for type safety
//const app = ...
//app.get(...) is not valid because we loose type safety
//using middleware zValidator for validation

const app = new Hono()
  .post('/login', zValidator('json', loginSchema), async (c) => {
    // Here you would typically validate the username and password
    const { email, password } = c.req.valid('json');
    console.log(
      `Received login request with email: ${email} and password: ${password}`
    );
    return c.json({ email, password }, 200);
  })
  .post('/signup', zValidator('json', signupSchema), async (c) => {
    // Here you would typically handle user registration
    const { email, password, confirmPassword, username } = c.req.valid('json');
    console.log(
      `Received signup request with email: ${email} and password: ${password}`
    );
    return c.json({ email, password, username, confirmPassword }, 200);
  });

export default app;
