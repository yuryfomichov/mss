import request from 'supertest';
import { app } from '../app';

const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = 'test';

const signin = async () => {
  const response = await request(app)
    .post('/signup')
    .send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    })
    .expect(201);

  const token = response.body.jwt;

  return token;
};

export { signin, TEST_EMAIL, TEST_PASSWORD };
