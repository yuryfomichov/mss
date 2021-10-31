import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup', async () => {
  return request(app)
    .post('/signup')
    .send({
      email: 'hello@hello.com',
      password: 'hello',
    })
    .expect(201);
});
