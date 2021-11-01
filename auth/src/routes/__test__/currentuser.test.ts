import request from 'supertest';
import { app } from '../../app';
import { signin, TEST_EMAIL } from '../../test/auth';

it('returns null current user when jwt is not porvided', async () => {
  const { body } = await request(app).get('/currentuser').send().expect(200);
  expect(body.currentUser).toBeNull();
});

it('returns current user when correct jwt is provided', async () => {
  const token = await signin();
  const { body } = await request(app)
    .get('/currentuser')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  expect(body.currentUser.email).toEqual(TEST_EMAIL);
});

it('returns null current user when jwt is invalid', async () => {
  const token = await signin();
  const invalid_token = token + 'invalid';

  const { body } = await request(app)
    .get('/currentuser')
    .set('Authorization', `Bearer ${invalid_token}`)
    .send()
    .expect(200);

  expect(body.currentUser).toBeNull();
});
