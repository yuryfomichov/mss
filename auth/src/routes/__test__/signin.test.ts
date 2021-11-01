import request from 'supertest';
import { app } from '../../app';

it('returns a 400 with not existing email', async () => {
  return request(app)
    .post('/signin')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(400);
});

it('returns 200 and jwt with correct credentials', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(201);

  const response = await request(app)
    .post('/signin')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(201);

  return expect(response.body.jwt).toBeDefined();
});

it('returns 400 with incorrect password', async () => {
  await request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(201);

  return request(app)
    .post('/signin')
    .send({
      email: 'hello@hello.com',
      password: '1111',
    })
    .expect(400);
});
