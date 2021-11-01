import request from 'supertest';
import { app } from '../../app';

it('returns a 400 on sign out (not implemented)', async () => {
  return request(app).get('/signout').send().expect(400);
});
