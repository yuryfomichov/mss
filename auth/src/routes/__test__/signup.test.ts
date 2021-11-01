import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(201);
});

it('returns a 400 with an invalid email or passowrd', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'hellohello.com',
      password: 'hello',
    })
    .expect(400);

  return request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
      password: 'h',
    })
    .expect(400);
});

it('returns a 400 with missing password or email', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
    })
    .expect(400);

  return request(app)
    .post('/signup')
    .send({
      password: '123123',
    })
    .expect(400);
});

it('disallows duplicated emails', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(201);

  return request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(400);
});

it('returns jwt in response body after singup', async () => {
  const response = await request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(201);

  expect(response.body.jwt).toBeDefined();
});
